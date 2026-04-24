import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import type { DIContainer } from '../../di/container.js'

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
  image_size: IMAGE_SIZE_ENUM.optional().describe('Image size preset (default: landscape_4_3)'),
  quality: z
    .enum(['low', 'medium', 'high'])
    .optional()
    .describe('Image quality level — higher quality costs more tokens (default: high)'),
  num_images: z.number().int().min(1).max(4).optional().describe('Number of images to generate (default: 1, max: 4)'),
  output_format: z.enum(['png', 'jpeg', 'webp']).optional().describe('Output image format (default: png)'),
}

function formatImageResult(result: {
  images: Array<{ url: string; width?: number; height?: number; content_type?: string }>
}): string {
  const imageList = result.images
    .map(
      (img, i) =>
        `Image ${i + 1}: ${img.url} (${img.width ?? 0}x${img.height ?? 0}, ${img.content_type ?? 'image/png'})`
    )
    .join('\n')

  return [`Generated ${result.images.length} image(s)`, '', imageList].join('\n')
}

export function registerImageGenerationTools(server: McpServer, container: DIContainer): void {
  server.tool(
    'generate_image',
    'Generate an image from a text prompt using GPT Image 2 model via fal.ai. Capable of creating extremely detailed images with fine typography. Returns image URLs. Requires FAL_KEY environment variable.',
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
