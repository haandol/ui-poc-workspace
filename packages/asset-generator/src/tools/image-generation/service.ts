import type { ImageGenerationRepository, QwenImageOutput, QwenImageImageToImageOutput } from './repository.js'

export type ImageSizePreset =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9'

export interface GenerateImageParams {
  prompt: string
  negative_prompt?: string
  image_size?: ImageSizePreset
  num_inference_steps?: number
  guidance_scale?: number
  seed?: number
  num_images?: number
  output_format?: 'png' | 'jpeg'
}

export interface GenerateImageFromImageParams extends GenerateImageParams {
  image_url: string
  strength?: number
}

export class ImageGenerationService {
  constructor(private readonly repository: ImageGenerationRepository) {}

  async generateImage(params: GenerateImageParams): Promise<QwenImageOutput> {
    return this.repository.generateImage({
      prompt: params.prompt,
      negative_prompt: params.negative_prompt,
      image_size: params.image_size ?? 'landscape_4_3',
      num_inference_steps: params.num_inference_steps ?? 30,
      guidance_scale: params.guidance_scale ?? 2.5,
      seed: params.seed,
      num_images: params.num_images ?? 1,
      output_format: params.output_format ?? 'png',
      enable_safety_checker: true,
    })
  }

  async generateImageFromImage(params: GenerateImageFromImageParams): Promise<QwenImageImageToImageOutput> {
    return this.repository.generateImageFromImage({
      prompt: params.prompt,
      image_url: params.image_url,
      strength: params.strength ?? 0.6,
      negative_prompt: params.negative_prompt,
      image_size: params.image_size,
      num_inference_steps: params.num_inference_steps ?? 30,
      guidance_scale: params.guidance_scale ?? 2.5,
      seed: params.seed,
      num_images: params.num_images ?? 1,
      output_format: params.output_format ?? 'png',
      enable_safety_checker: true,
    })
  }
}
