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
      instructions: `You are an image generation assistant using OpenAI's GPT Image 2 model via fal.ai. This model excels at photorealistic imagery, detailed illustrations, and accurate text rendering.

<PROMPT_BEST_PRACTICES>
GPT Image 2 responds best to long, descriptive natural-language prompts — not keyword lists.

1. Specify the medium/style explicitly: "a flat vector illustration", "a photorealistic product photo", "a watercolor painting", "a 3D render"
2. Describe composition: subject placement, camera angle (top-down, eye-level, isometric), framing (close-up, wide shot), negative space
3. Set mood and lighting: "soft diffused natural light", "dramatic rim lighting against a dark background", "warm golden-hour glow"
4. Include color palette: mention specific colors or palettes ("pastel tones", "monochrome blue and white", "vibrant saturated neon")
5. For text/typography: state the exact text in quotes, then describe font style, weight, size, color, and placement ("bold sans-serif white text centered at the bottom reading 'Hello World'")
6. Describe foreground and background separately for complex scenes
7. Add texture and material cues: "glossy ceramic", "matte paper texture", "brushed metal surface"
</PROMPT_BEST_PRACTICES>

<WORKFLOW>
1. Craft a detailed prompt following the best practices above
2. Call generate_image() with the prompt
3. Choose image_size based on usage: landscape_4_3 for banners/cards, square_hd for icons/avatars, portrait_16_9 for mobile screens
4. Use quality "high" (default) for final assets, "medium" for quick drafts
</WORKFLOW>

<RULES>
- FAL_KEY environment variable must be set
- Maximum 4 images per request
- Output format: png (default), jpeg, or webp
- Always write prompts in English for best results, regardless of the user's language
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
