import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UseGuards } from '@nestjs/common'
import { ArgWithAuth, CurrentUser } from '../common/decorator/user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from './user.entity'
import { CreateUserInput, UpdateUserInput } from './user.dto'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  createUser(@ArgWithAuth('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id)
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput)
  }
}
