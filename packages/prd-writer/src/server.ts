import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DIContainer } from './di/container.js'
import { registerTemplateTools } from './tools/templates/controller.js'
import { registerDocumentTools } from './tools/documents/controller.js'

export function createServer() {
  const server = new McpServer({
    name: 'prd-writer',
    version: '0.1.0',
  })

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
