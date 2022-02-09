import { BaseRepository } from 'typeorm-transactional-cls-hooked'
import { CommonEntity } from '../common/common.entity'
import { DeepPartial } from 'typeorm/common/DeepPartial'
import { SaveOptions } from 'typeorm/repository/SaveOptions'

export class RepositoryWithAuth<
  Entity extends CommonEntity
> extends BaseRepository<Entity> {
  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>
  save<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>
  save<T extends DeepPartial<Entity>>(entity: T[], options?: SaveOptions)
  save<T extends DeepPartial<Entity>>(
    entities: T | T[],
    options?: SaveOptions,
  ): Promise<(T & Entity) | (T & Entity)[]> {
    if (Array.isArray(entities)) {
      entities.forEach((entity) => this.updateEditUser(entity))
      return super.save(entities, options)
    } else {
      this.updateEditUser(entities)
      return super.save(entities, options)
    }
  }

  updateEditUser(entity) {
    const editedUsername = entity.authUser ? entity.authUser.username : 'system'
    if (!entity.createdBy) {
      entity.createdBy = editedUsername
    }
    entity.updatedBy = editedUsername
  }
}
