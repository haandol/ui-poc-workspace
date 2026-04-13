import { fal } from '@fal-ai/client'
import type {
  QwenImageInput,
  QwenImageOutput,
  QwenImageImageToImageInput,
  QwenImageImageToImageOutput,
} from '@fal-ai/client/endpoints'

const TEXT_TO_IMAGE_MODEL = 'fal-ai/qwen-image' as const
const IMAGE_TO_IMAGE_MODEL = 'fal-ai/qwen-image/image-to-image' as const

export type { QwenImageInput, QwenImageOutput, QwenImageImageToImageInput, QwenImageImageToImageOutput }

export class ImageGenerationRepository {
  async generateImage(input: QwenImageInput): Promise<QwenImageOutput> {
    const result = await fal.subscribe(TEXT_TO_IMAGE_MODEL, { input })
    return result.data
  }

  async generateImageFromImage(input: QwenImageImageToImageInput): Promise<QwenImageImageToImageOutput> {
    const result = await fal.subscribe(IMAGE_TO_IMAGE_MODEL, { input })
    return result.data
  }
}
