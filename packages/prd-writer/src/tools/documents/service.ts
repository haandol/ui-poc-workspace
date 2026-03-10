import { SECTION_TITLES } from '../../interfaces/constants.js'
import type { DocumentRepository } from './repository.js'

interface SubsectionData {
  title: string
  content: string
}

export class DocumentService {
  private workingDoc: string | null = null

  constructor(private readonly repository: DocumentRepository) {}

  private parseSections(content: string): Map<number, string> {
    const sections = new Map<number, string>()
    const pattern = /<section id="(\d+)" title="[^"]*">\s*([\s\S]*?)<\/section>/g
    let match: RegExpExecArray | null
    while ((match = pattern.exec(content)) !== null) {
      sections.set(parseInt(match[1], 10), match[2].trim())
    }
    if (sections.size === 0) {
      const oldPattern = /<section id="(\d+)">\s*## Section \d+\.[^\n]*\n+([\s\S]*?)<\/section>/g
      while ((match = oldPattern.exec(content)) !== null) {
        sections.set(parseInt(match[1], 10), match[2].trim())
      }
    }
    return sections
  }

  private parseSubsections(sectionContent: string, sectionId: number): Map<string, SubsectionData> {
    const subsections = new Map<string, SubsectionData>()
    const pattern = new RegExp(
      `<subsection id="${sectionId}\\.([^"]+)" title="([^"]*)">[\\s\\S]*?([\\s\\S]*?)<\\/subsection>`,
      'g'
    )
    let match: RegExpExecArray | null
    while ((match = pattern.exec(sectionContent)) !== null) {
      const subId = `${sectionId}.${match[1]}`
      subsections.set(subId, { title: match[2], content: match[3].trim() })
    }
    return subsections
  }

  private buildSubsection(subId: string, title: string, content: string): string {
    return `<subsection id="${subId}" title="${title}">\n${content}\n</subsection>`
  }

  private buildSection(sectionId: number, content: string): string {
    return `<section id="${sectionId}" title="${SECTION_TITLES[sectionId]}">\n${content}\n</section>`
  }

  private buildDocument(projectName: string, sections: Map<number, string>): string {
    const lines = [`<alps-document project="${projectName}">`]
    for (let num = 1; num <= 9; num++) {
      const content = sections.get(num) ?? '<!-- Not started -->'
      lines.push(this.buildSection(num, content))
    }
    lines.push('</alps-document>')
    return lines.join('\n\n')
  }

  private extractProjectName(content: string): string {
    const match = content.match(/<alps-document project="([^"]+)">/)
    if (match) return match[1]
    const oldMatch = content.match(/^# (.+?) ALPS/)
    return oldMatch ? oldMatch[1] : 'Untitled'
  }

  initDocument(projectName: string, outputPath: string): string {
    let filepath = this.repository.expandPath(outputPath)
    if (!filepath.includes('.')) {
      filepath += '.alps.xml'
    }

    if (this.repository.fileExists(filepath)) {
      this.workingDoc = filepath
      return `Document already exists at ${filepath}. Use load_alps_document() to resume.`
    }

    this.repository.writeFile(filepath, this.buildDocument(projectName, new Map()))
    this.workingDoc = filepath
    return `Created ALPS document at ${filepath}`
  }

  loadDocument(docPath: string): string {
    const filepath = this.repository.expandPath(docPath)
    if (!this.repository.fileExists(filepath)) {
      return `Document not found at ${filepath}`
    }
    this.workingDoc = filepath
    const status = this.getStatus()
    return `${status}

---
\u26a0\ufe0f CONVERSATION MODE REQUIRED:
1. Call get_alps_section_guide(N) before working on any section
2. Ask 1-2 focused questions at a time - DO NOT auto-generate content
3. Wait for user response before proceeding
4. Get explicit "yes" confirmation before calling save_alps_section()
NEVER auto-fill sections without user Q&A, even if content already exists.`
  }

  saveSection(section: number, subsectionId: string, title: string, content: string): string {
    if (!this.workingDoc) {
      return 'No document loaded. Call init_alps_document() or load_alps_document() first.'
    }
    if (!(section in SECTION_TITLES)) {
      return `Invalid section number: ${section}. Must be 1-9.`
    }

    const docContent = this.repository.readFile(this.workingDoc)
    const projectName = this.extractProjectName(docContent)
    const sections = this.parseSections(docContent)

    const subId = `${section}.${subsectionId}`
    const existing = this.parseSubsections(sections.get(section) ?? '', section)
    existing.set(subId, { title, content })

    const parts = [...existing.entries()]
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
      .map(([k, v]) => this.buildSubsection(k, v.title, v.content))
    sections.set(section, parts.join('\n'))

    this.repository.writeFile(this.workingDoc, this.buildDocument(projectName, sections))
    return `\u2705 Saved ${subId}. ${title}

---
### ${subId}. ${title}

${content}
---`
  }

  readSection(section: number, subsectionId?: string): string {
    if (!this.workingDoc) {
      return 'No document loaded. Call init_alps_document() or load_alps_document() first.'
    }
    if (!(section in SECTION_TITLES)) {
      return `Section ${section} not found.`
    }

    const docContent = this.repository.readFile(this.workingDoc)
    const sections = this.parseSections(docContent)
    const content = sections.get(section) ?? ''

    if (subsectionId != null) {
      const subId = `${section}.${subsectionId}`
      const subs = this.parseSubsections(content, section)
      if (subs.has(subId)) {
        const sub = subs.get(subId)!
        return `## ${subId}. ${sub.title}\n\n${sub.content}`
      }
      return `Subsection ${subId} not found.`
    }

    if (!content || content.includes('<!-- Not started -->')) {
      return `## Section ${section}. ${SECTION_TITLES[section]}\n\n*Not yet written*`
    }
    return `## Section ${section}. ${SECTION_TITLES[section]}\n\n${content}`
  }

  getStatus(): string {
    if (!this.workingDoc) {
      return 'No document loaded. Call init_alps_document() or load_alps_document() first.'
    }

    const docContent = this.repository.readFile(this.workingDoc)
    const projectName = this.extractProjectName(docContent)
    const sections = this.parseSections(docContent)

    const lines = [`ALPS Document: ${projectName}`, `Location: ${this.workingDoc}`, '']
    for (const [num, title] of Object.entries(SECTION_TITLES)) {
      const content = sections.get(parseInt(num, 10)) ?? ''
      let status: string
      if (!content || content.includes('<!-- Not started -->')) {
        status = '\u2b1c Not started'
      } else if (content.trim().length > 50) {
        status = '\u2705 Written'
      } else {
        status = '\ud83d\udfe1 In progress'
      }
      lines.push(`Section ${num} (${title}): ${status}`)
    }
    return lines.join('\n')
  }

  private contentToMarkdown(content: string, section: number): string {
    const subs = this.parseSubsections(content, section)
    if (subs.size === 0) return content
    const lines: string[] = []
    for (const [subId, data] of [...subs.entries()].sort(([a], [b]) =>
      a.localeCompare(b, undefined, { numeric: true })
    )) {
      lines.push(`### ${subId}. ${data.title}\n\n${data.content}`)
    }
    return lines.join('\n\n')
  }

  exportMarkdown(outputPath?: string): string {
    if (!this.workingDoc) {
      return 'No document loaded. Call init_alps_document() or load_alps_document() first.'
    }

    const docContent = this.repository.readFile(this.workingDoc)
    const projectName = this.extractProjectName(docContent)
    const sections = this.parseSections(docContent)

    const lines = [`# ${projectName} ALPS\n`]
    for (let num = 1; num <= 9; num++) {
      const content = sections.get(num) ?? ''
      let mdContent: string
      if (!content || content.includes('<!-- Not started -->')) {
        mdContent = '*Not yet written*'
      } else {
        mdContent = this.contentToMarkdown(content, num)
      }
      lines.push(`## Section ${num}. ${SECTION_TITLES[num]}\n\n${mdContent}\n\n---\n`)
    }

    const result = lines.join('\n')
    if (outputPath) {
      const out = this.repository.expandPath(outputPath)
      this.repository.writeFile(out, result)
      return `Exported to ${out}`
    }
    return result
  }
}
