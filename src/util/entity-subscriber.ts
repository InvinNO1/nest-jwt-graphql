import { Inject, Injectable, Scope } from '@nestjs/common'
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm'
import { InjectConnection } from '@nestjs/typeorm'
import { CONTEXT } from '@nestjs/graphql'

@EventSubscriber()
export class CustomEntitySubscriber implements EntitySubscriberInterface {
  constructor(
    @Inject(CONTEXT) private readonly request: any,
    @InjectConnection() readonly connection: Connection,
  ) {
    connection.subscribers.push(this)
  }

  beforeInsert(event: InsertEvent<any>) {
    if (event.entity.firstname) {
      event.entity.firstname = `*****${event.entity.firstname}`
    }
    const req = this.request
    console.log('BBBBB', req)
  }
}
