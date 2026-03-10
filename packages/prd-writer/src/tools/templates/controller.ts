import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import type { DIContainer } from '../../di/container.js'

export function registerTemplateTools(server: McpServer, container: DIContainer): void {
  const service = container.templateService

  server.tool(
    'get_alps_overview',
    'Get the ALPS template overview with all section descriptions. IMPORTANT: After calling this, you MUST call get_alps_section_guide(1) to start the interactive Q&A process.',
    () => {
      const content = service.getOverview()
      const result =
        content +
        `

---
## Next Step

**REQUIRED**: Call \`get_alps_section_guide(1)\` to begin interactive writing.
Do NOT write any section without going through the guide's Q&A process first.`
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool('list_alps_sections', 'List all available ALPS template sections.', () => {
    const sections = service.listSections()
    return { content: [{ type: 'text' as const, text: JSON.stringify(sections, null, 2) }] }
  })

  server.tool(
    'get_alps_section',
    'Get a specific ALPS template section by number.',
    { section: z.number().int().min(1).max(9).describe('Section number (1-9)') },
    (args) => {
      const result = service.getSection(args.section, false)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool(
    'get_alps_full_template',
    'Get the complete ALPS template with all sections combined.',
    () => {
      const result = service.getFullTemplate(false)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool(
    'get_alps_section_guide',
    'Get conversation guide for writing a specific ALPS section. Use this before starting each section.',
    { section: z.number().int().min(1).max(9).describe('Section number (1-9)') },
    (args) => {
      const result = service.getSectionGuide(args.section)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )
}
