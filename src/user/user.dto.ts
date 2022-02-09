import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNumberString, MaxLength } from 'class-validator'
import { AuthUser } from '../util/model'

@InputType()
export class CreateUserInput extends AuthUser {
  @Field()
  @MaxLength(100)
  fullName: string

  @Field()
  @MaxLength(10)
  @IsNumberString()
  phone: string

  username: string

  password: string
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number

  @Field()
  fullName: string

  @Field()
  phone: string
}
