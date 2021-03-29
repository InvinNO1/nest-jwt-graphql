import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class LoginOutput {
  @Field()
  token: string

  @Field(() => User)
  user: User
}
