import { EntityRepository } from 'typeorm'
import { User } from './user.entity'
import { RepositoryWithAuth } from '../util/with-auth-orm'

@EntityRepository(User)
export class UserRepository extends RepositoryWithAuth<User> {}
