import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { TEMPLATES_DIR, CHAPTERS_DIR, GUIDES_DIR } from '../../interfaces/constants.js'

export class TemplateRepository {
  readOverview(): string {
    return readFileSync(resolve(TEMPLATES_DIR, 'overview.md'), 'utf-8')
  }

  listChapterFiles(): { section: number; filename: string }[] {
    return readdirSync(CHAPTERS_DIR)
      .filter((f) => f.endsWith('.xml'))
      .sort()
      .map((f) => ({
        section: parseInt(f.split('-')[0], 10),
        filename: f,
      }))
  }

  readChapter(section: number): string | null {
    const prefix = String(section).padStart(2, '0')
    const files = readdirSync(CHAPTERS_DIR).filter((f) => f.startsWith(prefix) && f.endsWith('.xml'))
    if (files.length === 0) return null
    return readFileSync(resolve(CHAPTERS_DIR, files[0]), 'utf-8')
  }

  readGuide(section: number): string | null {
    const filename = `${String(section).padStart(2, '0')}.md`
    try {
      return readFileSync(resolve(GUIDES_DIR, filename), 'utf-8')
    } catch {
      return null
    }
  }
}
