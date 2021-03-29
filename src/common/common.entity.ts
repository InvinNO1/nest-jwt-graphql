import { Field, ObjectType } from '@nestjs/graphql'
import { Column, UpdateDateColumn, VersionColumn } from 'typeorm'

@ObjectType()
export class CommonEntity {
  @Field()
  @Column({ default: true })
  enabled: boolean

  @Field(() => Date)
  @UpdateDateColumn()
  createdAt: Date

  @Field()
  createdBy: string

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  updatedBy: string

  @Field()
  @VersionColumn()
  version: number
}
