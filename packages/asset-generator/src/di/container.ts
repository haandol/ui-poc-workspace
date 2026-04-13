import { ImageGenerationService } from '../tools/image-generation/service.js'
import { ImageGenerationRepository } from '../tools/image-generation/repository.js'

export class DIContainer {
  private _imageGenerationRepository?: ImageGenerationRepository
  private _imageGenerationService?: ImageGenerationService

  get imageGenerationRepository(): ImageGenerationRepository {
    if (!this._imageGenerationRepository) {
      this._imageGenerationRepository = new ImageGenerationRepository()
    }
    return this._imageGenerationRepository
  }

  get imageGenerationService(): ImageGenerationService {
    if (!this._imageGenerationService) {
      this._imageGenerationService = new ImageGenerationService(this.imageGenerationRepository)
    }
    return this._imageGenerationService
  }
}
