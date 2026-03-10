import { TemplateService } from '../tools/templates/service.js'
import { TemplateRepository } from '../tools/templates/repository.js'

export class DIContainer {
  private _templateRepository?: TemplateRepository
  private _templateService?: TemplateService

  get templateRepository(): TemplateRepository {
    if (!this._templateRepository) {
      this._templateRepository = new TemplateRepository()
    }
    return this._templateRepository
  }

  get templateService(): TemplateService {
    if (!this._templateService) {
      this._templateService = new TemplateService(this.templateRepository)
    }
    return this._templateService
  }
}
