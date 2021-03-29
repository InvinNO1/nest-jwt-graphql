import { Field, InputType } from '@nestjs/graphql'
import { IsNumberString, MaxLength } from 'class-validator'

@InputType()
export class CreateUserInput {
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
