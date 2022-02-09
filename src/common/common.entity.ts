import { Field, ObjectType } from '@nestjs/graphql'
import { Column, UpdateDateColumn, VersionColumn } from 'typeorm'
import { AuthUser } from '../util/model'

@ObjectType()
export class CommonEntity extends AuthUser {
  @Field()
  @Column({ default: true })
  deleted: boolean

  @Field(() => Date)
  @UpdateDateColumn()
  createdAt: Date

  @Field()
  @Column()
  createdBy: string

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column()
  updatedBy: string

  @Field()
  @VersionColumn()
  version: number
}
