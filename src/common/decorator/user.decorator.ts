import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Args, GqlExecutionContext } from '@nestjs/graphql'
import { AuthUser } from '../../util/model'

const createGraphqlParamDecorator = (factory, enhancers?: []) => {
  return (property: string, ...pipes) => {
    const graphqlArgs = Args(property, ...pipes)
    const nestParamDecorator = createParamDecorator(factory, enhancers)(
      property,
      ...pipes,
    )
    return (target, key, index) => {
      graphqlArgs(target, key, index)
      nestParamDecorator(target, key, index)
    }
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  },
)

export const ArgWithAuth = createGraphqlParamDecorator(
  (property: string, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext().req.user
    const param = ctx.getArgs()[property]
    param.authUser = user
    return param
  },
)
