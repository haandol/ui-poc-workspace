import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DIContainer } from './di/container.js'
import { registerTemplateTools } from './tools/templates/controller.js'

export function createServer() {
  const server = new McpServer({
    name: 'asset-generator',
    version: '0.1.0',
  })

  const container = new DIContainer()

  registerTemplateTools(server, container)

  return {
    start: async () => {
      const transport = new StdioServerTransport()
      await server.connect(transport)
    },
  }
}
