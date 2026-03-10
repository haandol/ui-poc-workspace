import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const TEMPLATES_DIR = resolve(__dirname, '..', 'templates')
export const CHAPTERS_DIR = resolve(TEMPLATES_DIR, 'chapters')
export const GUIDES_DIR = resolve(__dirname, '..', 'guides')

export const SECTION_TITLES: Record<number, string> = {
  1: 'Overview',
  2: 'MVP Goals and Key Metrics',
  3: 'Demo Scenario',
  4: 'High-Level Architecture',
  5: 'Design Specification',
  6: 'Requirements Summary',
  7: 'Feature-Level Specification',
  8: 'MVP Metrics',
  9: 'Out of Scope',
}

export const SECTION_REFERENCES: Record<number, number[]> = {
  3: [2],
  5: [6],
  7: [6],
  8: [2, 6],
}
