import type { ImageGenerationRepository, GptImage2Output } from './repository.js'

export type ImageSizePreset =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9'

export interface GenerateImageParams {
  prompt: string
  image_size?: ImageSizePreset
  quality?: 'low' | 'medium' | 'high'
  num_images?: number
  output_format?: 'jpeg' | 'png' | 'webp'
}

export class ImageGenerationService {
  constructor(private readonly repository: ImageGenerationRepository) {}

  async generateImage(params: GenerateImageParams): Promise<GptImage2Output> {
    return this.repository.generateImage({
      prompt: params.prompt,
      image_size: params.image_size ?? 'landscape_4_3',
      quality: params.quality ?? 'high',
      num_images: params.num_images ?? 1,
      output_format: params.output_format ?? 'png',
    })
  }
}
