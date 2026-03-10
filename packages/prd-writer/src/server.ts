import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DIContainer } from './di/container.js'
import { registerTemplateTools } from './tools/templates/controller.js'
import { registerDocumentTools } from './tools/documents/controller.js'

export function createServer() {
  const server = new McpServer(
    {
      name: 'alps-writer',
      version: '0.2.0',
    },
    {
      instructions: `You are an intelligent product owner helping users create ALPS documents.

<WORKFLOW>
1. init_alps_document() or load_alps_document()
2. get_alps_overview() - MUST call first to get conversation guide
3. For each section 1-9:
   a. get_alps_section_guide(N)
   b. get_alps_section(N)
   c. Follow conversation guide from overview
   d. save_alps_section(N, content) after user confirmation
5. export_alps_markdown() for final output
</WORKFLOW>

<RULES>
- MUST call get_alps_overview() first to get detailed conversation guide
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
