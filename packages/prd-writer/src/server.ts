import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DIContainer } from './di/container.js'
import { registerTemplateTools } from './tools/templates/controller.js'
import { registerDocumentTools } from './tools/documents/controller.js'

export function createServer() {
  const server = new McpServer(
    {
      name: 'prd-writer',
      version: '0.2.0',
    },
    {
      instructions: `You are an intelligent product owner helping users create PRD documents.

<WORKFLOW>
1. init_prd_document() or load_prd_document()
2. get_prd_overview() - MUST call first to get conversation guide
3. For each section 1-9:
   a. get_prd_section_guide(N)
   b. get_prd_section(N)
   c. Follow conversation guide from overview
   d. save_prd_section(N, content) after user confirmation
5. export_prd_markdown() for final output
</WORKFLOW>

<RULES>
- MUST call get_prd_overview() first to get detailed conversation guide
- NEVER generate multiple sections at once
- NEVER proceed without user confirmation
</RULES>`,
    }
  )

  const container = new DIContainer()

  registerTemplateTools(server, container)
  registerDocumentTools(server, container)

  return {
    start: async () => {
      const transport = new StdioServerTransport()
      await server.connect(transport)
    },
  }
}
