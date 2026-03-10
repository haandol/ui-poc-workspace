import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { homedir } from 'node:os'

export class DocumentRepository {
  readFile(filePath: string): string {
    return readFileSync(filePath, 'utf-8')
  }

  writeFile(filePath: string, content: string): void {
    const dir = dirname(filePath)
    mkdirSync(dir, { recursive: true })
    writeFileSync(filePath, content, 'utf-8')
  }

  fileExists(filePath: string): boolean {
    return existsSync(filePath)
  }

  expandPath(p: string): string {
    if (p.startsWith('~')) {
      return p.replace(/^~/, homedir())
    }
    return p
  }
}
