import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { DIContainer } from './di/container.js'
import { registerImageGenerationTools } from './tools/image-generation/controller.js'

export function createServer() {
  const server = new McpServer(
    {
      name: 'asset-generator',
      version: '0.1.0',
    },
    {
      instructions: `You are an image generation assistant using OpenAI's GPT Image 2 model via fal.ai. This model is capable of creating extremely detailed images with fine typography.

<WORKFLOW>
1. Call generate_image() with a descriptive prompt to create images
2. Use image_size presets: square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9
3. Adjust quality (low, medium, high) to control detail and cost — default is high
</WORKFLOW>

<RULES>
- FAL_KEY environment variable must be set
- Maximum 4 images per request
- Output format: png (default), jpeg, or webp
</RULES>`,
    }
  )

  const container = new DIContainer()
  registerImageGenerationTools(server, container)

  return {
    start: async () => {
      const transport = new StdioServerTransport()
      await server.connect(transport)
    },
  }
}
