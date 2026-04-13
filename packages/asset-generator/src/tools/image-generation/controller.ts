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

const COMMON_PARAMS = {
  prompt: z.string().describe('Text prompt describing the image to generate'),
  negative_prompt: z.string().optional().describe('What to avoid in the generated image'),
  image_size: IMAGE_SIZE_ENUM.optional().describe('Image size preset (default: landscape_4_3)'),
  num_inference_steps: z.number().int().min(1).max(50).optional().describe('Number of inference steps (default: 30)'),
  guidance_scale: z
    .number()
    .min(0)
    .max(20)
    .optional()
    .describe('How closely the model follows the prompt (default: 2.5)'),
  seed: z.number().int().optional().describe('Seed for reproducible results'),
  num_images: z.number().int().min(1).max(4).optional().describe('Number of images to generate (default: 1, max: 4)'),
  output_format: z.enum(['png', 'jpeg']).optional().describe('Output image format (default: png)'),
}

function formatImageResult(result: {
  images: Array<{ url: string; width?: number; height?: number; content_type?: string }>
  prompt: string
  seed: number
}): string {
  const imageList = result.images
    .map(
      (img, i) =>
        `Image ${i + 1}: ${img.url} (${img.width ?? 0}x${img.height ?? 0}, ${img.content_type ?? 'image/png'})`
    )
    .join('\n')

  return [
    `Generated ${result.images.length} image(s)`,
    `Prompt: ${result.prompt}`,
    `Seed: ${result.seed}`,
    '',
    imageList,
  ].join('\n')
}

export function registerImageGenerationTools(server: McpServer, container: DIContainer): void {
  server.tool(
    'generate_image',
    'Generate an image from a text prompt using Qwen Image model via fal.ai. Returns image URLs. Requires FAL_KEY environment variable.',
    COMMON_PARAMS,
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

  server.tool(
    'generate_image_from_image',
    'Generate a new image based on a reference image and text prompt using Qwen Image model via fal.ai (image-to-image). Returns image URLs. Requires FAL_KEY environment variable.',
    {
      ...COMMON_PARAMS,
      image_url: z.string().describe('URL of the reference image to guide the generation'),
      strength: z
        .number()
        .min(0)
        .max(1)
        .optional()
        .describe('Denoising strength. 1.0 = fully remake the image, 0.0 = preserve original (default: 0.6)'),
    },
    async (args) => {
      try {
        const result = await container.imageGenerationService.generateImageFromImage(args)
        return { content: [{ type: 'text' as const, text: formatImageResult(result) }] }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return {
          content: [{ type: 'text' as const, text: `Image-to-image generation failed: ${message}` }],
          isError: true,
        }
      }
    }
  )
}
