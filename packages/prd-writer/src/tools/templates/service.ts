import { SECTION_TITLES, SECTION_REFERENCES } from '../../interfaces/constants.js'
import type { TemplateRepository } from './repository.js'

interface XmlElement {
  tag: string
  attrs: Record<string, string>
  text: string
  children: XmlElement[]
}

export class TemplateService {
  constructor(private readonly repository: TemplateRepository) {}

  getOverview(): string {
    return this.repository.readOverview()
  }

  listSections(): { section: number; filename: string }[] {
    return this.repository.listChapterFiles()
  }

  getSection(section: number, includeExamples = true): string {
    const xml = this.repository.readChapter(section)
    if (!xml) return `Section ${section} not found.`
    return this.xmlToMarkdown(xml, includeExamples)
  }

  getFullTemplate(includeExamples = true): string {
    const parts = [this.getOverview(), '\n---\n']
    for (const { section } of this.listSections()) {
      parts.push(this.getSection(section, includeExamples))
      parts.push('\n---\n')
    }
    return parts.join('\n')
  }

  getSectionGuide(section: number): string {
    const guide = this.repository.readGuide(section)
    if (!guide) return `Section ${section} not found.`

    const refs = SECTION_REFERENCES[section]
    if (refs) {
      const refNames = refs.map((r) => `Section ${r} (${SECTION_TITLES[r]})`)
      const warning = `\u26a0\ufe0f REQUIRED: This section depends on ${refNames.join(', ')}.
Before proceeding, you MUST:
1. Call read_alps_section(${refs[0]}) to review referenced content
2. Summarize key points from referenced section(s) in your response
3. If referenced sections are incomplete, warn the user first

`
      return warning + guide
    }
    return guide
  }

  private xmlToMarkdown(content: string, includeExamples: boolean): string {
    const root = this.parseXml(content)
    const lines: string[] = []
    this.renderElement(root, lines, 2, includeExamples)
    return lines.join('\n').trim()
  }

  private renderElement(el: XmlElement, lines: string[], level: number, includeExamples: boolean): void {
    if (el.tag === 'example') {
      if (includeExamples) {
        lines.push(`\n**Example:**\n${el.text.trim()}\n`)
      }
      return
    }
    if (el.tag === 'description') {
      lines.push(`\n${el.text.trim()}\n`)
      return
    }
    if (el.tag === 'header') {
      lines.push(`\n> ${el.text.trim()}\n`)
      return
    }

    if (el.tag === 'section' || el.tag === 'subsection' || el.tag === 'template') {
      const title = el.attrs['title'] ?? ''
      const id = el.attrs['id'] ?? ''
      if (title) {
        lines.push(id ? `${'#'.repeat(level)} ${id} ${title}\n` : `${'#'.repeat(level)} ${title}\n`)
      }
      for (const child of el.children) {
        this.renderElement(child, lines, level + 1, includeExamples)
      }
    }
  }

  private parseXml(xmlString: string): XmlElement {
    const root: XmlElement = { tag: '__root__', attrs: {}, text: '', children: [] }
    const stack: XmlElement[] = [root]

    const tagRegex = /<(\/?)(\w+)([^>]*)>/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = tagRegex.exec(xmlString)) !== null) {
      const textBefore = xmlString.slice(lastIndex, match.index)
      const current = stack[stack.length - 1]

      if (textBefore.trim()) {
        if (current.children.length === 0) {
          current.text += textBefore
        } else {
          current.text += textBefore
        }
      }

      const [, isClosing, tagName, attrString] = match
      lastIndex = match.index + match[0].length

      if (isClosing) {
        if (stack.length > 1) {
          stack.pop()
        }
      } else {
        const attrs: Record<string, string> = {}
        const attrRegex = /(\w+)="([^"]*)"/g
        let attrMatch: RegExpExecArray | null
        while ((attrMatch = attrRegex.exec(attrString)) !== null) {
          attrs[attrMatch[1]] = attrMatch[2]
        }

        const el: XmlElement = { tag: tagName, attrs, text: '', children: [] }
        current.children.push(el)

        if (!attrString.trimEnd().endsWith('/')) {
          stack.push(el)
        }
      }
    }

    return root.children.length === 1 ? root.children[0] : root
  }
}
