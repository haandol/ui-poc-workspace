import { fal } from '@fal-ai/client'

const TEXT_TO_IMAGE_MODEL = 'openai/gpt-image-2' as const

const SIZE_MAP: Record<string, { width: number; height: number }> = {
  square_hd: { width: 2048, height: 2048 },
  square: { width: 1024, height: 1024 },
  portrait_4_3: { width: 1536, height: 2048 },
  portrait_16_9: { width: 1152, height: 2048 },
  landscape_4_3: { width: 2048, height: 1536 },
  landscape_16_9: { width: 2048, height: 1152 },
}

export interface GptImage2Input {
  prompt: string
  image_size?: string
  quality?: 'low' | 'medium' | 'high'
  num_images?: number
  output_format?: 'jpeg' | 'png' | 'webp'
}

export interface GptImage2Output {
  images: Array<{
    url: string
    width: number
    height: number
    content_type: string
    file_name: string
  }>
}

export class ImageGenerationRepository {
  async generateImage(input: GptImage2Input): Promise<GptImage2Output> {
    const { image_size, ...rest } = input
    const resolvedSize = SIZE_MAP[image_size ?? 'square'] ?? SIZE_MAP['square']
    const result = await fal.subscribe(TEXT_TO_IMAGE_MODEL, {
      input: { ...rest, image_size: resolvedSize },
    })
    return result.data as GptImage2Output
  }
}
