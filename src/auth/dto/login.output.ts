import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../user/user.entity'

@ObjectType()
export class LoginOutput {
  @Field()
  token: string

  @Field({ nullable: true })
  refreshToken?: string

  @Field(() => User)
  user: User
}
