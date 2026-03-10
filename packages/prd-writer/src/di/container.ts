import { TemplateService } from '../tools/templates/service.js'
import { TemplateRepository } from '../tools/templates/repository.js'
import { DocumentService } from '../tools/documents/service.js'
import { DocumentRepository } from '../tools/documents/repository.js'

export class DIContainer {
  private _templateRepository?: TemplateRepository
  private _templateService?: TemplateService
  private _documentRepository?: DocumentRepository
  private _documentService?: DocumentService

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

  get documentRepository(): DocumentRepository {
    if (!this._documentRepository) {
      this._documentRepository = new DocumentRepository()
    }
    return this._documentRepository
  }

  get documentService(): DocumentService {
    if (!this._documentService) {
      this._documentService = new DocumentService(this.documentRepository)
    }
    return this._documentService
  }
}
