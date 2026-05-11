import { writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { ImageGenerationRepository } from './repository.js'

const DEFAULT_OUTPUT_DIR = 'packages/web/public'

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
  output_dir?: string
}

export interface SavedImage {
  path: string
  width: number
  height: number
  content_type: string
}

export interface GenerateImageResult {
  images: SavedImage[]
}

export class ImageGenerationService {
  constructor(private readonly repository: ImageGenerationRepository) {}

  async generateImage(params: GenerateImageParams): Promise<GenerateImageResult> {
    const result = await this.repository.generateImage({
      prompt: params.prompt,
      image_size: params.image_size ?? 'square',
      quality: params.quality ?? 'medium',
      num_images: params.num_images ?? 1,
      output_format: params.output_format ?? 'png',
    })

    const outputDir = params.output_dir ?? DEFAULT_OUTPUT_DIR
    await mkdir(outputDir, { recursive: true })

    const format = params.output_format ?? 'png'
    const saved: SavedImage[] = []

    for (const img of result.images) {
      const fileName = `${randomUUID()}.${format}`
      const filePath = join(outputDir, fileName)
      const response = await fetch(img.url)
      const buffer = Buffer.from(await response.arrayBuffer())
      await writeFile(filePath, buffer)
      saved.push({
        path: filePath,
        width: img.width,
        height: img.height,
        content_type: img.content_type,
      })
    }

    return { images: saved }
  }
}
