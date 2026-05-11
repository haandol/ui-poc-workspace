import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import type { DIContainer } from '../../di/container.js'
import type { GenerateImageResult } from './service.js'

const IMAGE_SIZE_ENUM = z.enum([
  'square_hd',
  'square',
  'portrait_4_3',
  'portrait_16_9',
  'landscape_4_3',
  'landscape_16_9',
])

const GENERATE_IMAGE_PARAMS = {
  prompt: z.string().describe('Text prompt describing the image to generate'),
  image_size: IMAGE_SIZE_ENUM.optional().describe('Image size preset (default: square, 1024x1024)'),
  quality: z
    .enum(['low', 'medium', 'high'])
    .optional()
    .describe('Image quality level — higher quality costs more tokens (default: high)'),
  num_images: z.number().int().min(1).max(4).optional().describe('Number of images to generate (default: 1, max: 4)'),
  output_format: z.enum(['png', 'jpeg', 'webp']).optional().describe('Output image format (default: png)'),
  output_dir: z.string().optional().describe('Directory to save generated images (default: packages/web/public)'),
}

function formatImageResult(result: GenerateImageResult): string {
  const imageList = result.images
    .map((img, i) => `Image ${i + 1}: ${img.path} (${img.width}x${img.height}, ${img.content_type})`)
    .join('\n')

  return [`Generated and saved ${result.images.length} image(s)`, '', imageList].join('\n')
}

export function registerImageGenerationTools(server: McpServer, container: DIContainer): void {
  server.tool(
    'generate_image',
    'Generate an image using GPT Image 2 via fal.ai. Write prompts as detailed natural-language descriptions (style, composition, lighting, colors, typography). Always write prompts in English. Images are saved locally and the file paths are returned.',
    GENERATE_IMAGE_PARAMS,
    async (args) => {
      try {
        const result = await container.imageGenerationService.generateImage(args)
        return { content: [{ type: 'text' as const, text: formatImageResult(result) }] }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text' as const, text: `Image generation failed: ${message}` }],
          isError: true,
        }
      }
    }
  )
}
