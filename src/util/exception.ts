import { ApolloError } from 'apollo-server-core'

export class ObjectNotFound extends ApolloError {
  constructor(message = 'Object not found') {
    super(message, 'OBJECT_NOT_FOUND')
  }
}
