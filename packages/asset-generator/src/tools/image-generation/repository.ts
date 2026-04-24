import { fal } from '@fal-ai/client'

const TEXT_TO_IMAGE_MODEL = 'openai/gpt-image-2' as const

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
    const result = await fal.subscribe(TEXT_TO_IMAGE_MODEL, { input })
    return result.data as GptImage2Output
  }
}
