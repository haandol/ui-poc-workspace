import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import type { DIContainer } from '../../di/container.js'

export function registerDocumentTools(server: McpServer, container: DIContainer): void {
  const service = container.documentService

  server.tool(
    'init_prd_document',
    'Initialize a new PRD document file. Creates an XML-based document for reliable section parsing.',
    {
      project_name: z.string().describe('Name of the project'),
      output_path: z.string().describe('File path for the document (e.g., ~/Documents/my-project.prd.xml)'),
    },
    (args) => {
      const result = service.initDocument(args.project_name, args.output_path)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool(
    'load_prd_document',
    `Load an existing PRD document to resume editing.

CRITICAL: After loading, you MUST follow the conversation guide:
1. Call get_prd_section_guide(N) for the section you want to work on
2. Ask 1-2 focused questions at a time - DO NOT auto-generate content
3. Wait for user response before proceeding
4. Get explicit confirmation before saving each section

NEVER auto-fill sections based on existing content without user Q&A.`,
    {
      doc_path: z.string().describe('Path to the .prd.xml file'),
    },
    (args) => {
      const result = service.loadDocument(args.doc_path)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool(
    'save_prd_section',
    `Save content to a subsection in the PRD document.

BEFORE CALLING THIS TOOL:
1. Show completed content to the user first
2. Ask "Do you have any changes?" for confirmation
3. Only call this tool after user confirms`,
    {
      section: z.number().int().min(1).max(9).describe('Section number (1-9)'),
      subsection_id: z.string().describe('Subsection ID within the section (e.g., "1" for X.1, "1.2" for X.1.2)'),
      title: z.string().describe('Title of the subsection'),
      content: z.string().describe('Content for the subsection (markdown)'),
    },
    (args) => {
      const result = service.saveSection(args.section, args.subsection_id, args.title, args.content)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool(
    'read_prd_section',
    'Read the current content of a section or subsection.',
    {
      section: z.number().int().min(1).max(9).describe('Section number (1-9)'),
      subsection_id: z
        .string()
        .optional()
        .describe('Subsection ID (e.g., "1" for X.1). If omitted, returns entire section.'),
    },
    (args) => {
      const result = service.readSection(args.section, args.subsection_id)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )

  server.tool('get_prd_document_status', 'Get the status of all sections in the current document.', () => {
    const result = service.getStatus()
    return { content: [{ type: 'text' as const, text: result }] }
  })

  server.tool(
    'export_prd_markdown',
    'Export the PRD document as clean markdown (without XML tags).',
    {
      output_path: z.string().optional().describe('Optional output file path. If not provided, returns the content.'),
    },
    (args) => {
      const result = service.exportMarkdown(args.output_path)
      return { content: [{ type: 'text' as const, text: result }] }
    }
  )
}
