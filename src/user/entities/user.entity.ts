import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from '../../common/common.entity'

@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  username: string

  @Field({ nullable: true })
  @Column()
  password: string

  @Field()
  @Column()
  fullName: string

  @Field()
  @Column()
  phone: string
}
