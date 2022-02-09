import { Injectable } from '@nestjs/common'
import { Like } from 'typeorm'
import { hashSync } from 'bcrypt'
import { UserRepository } from './user.repository'
import { ObjectNotFound } from '../util/exception'
import { CreateUserInput, UpdateUserInput } from './user.dto'
import { User } from './user.entity'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async create(input: CreateUserInput) {
    input.username = await this.genUsername(input.fullName)
    const password = UserService.genPassword(16)
    input.password = hashSync(password, 10)
    const user = await this.userRepo.save(input)
    user.password = password
    return user
  }

  async findAll() {
    const users = await this.userRepo.find({ enabled: true })
    users.forEach((user) => (user.password = null))
    return users
  }

  findOne(id: number) {
    return this.userRepo.findOne({ id, enabled: true })
  }

  findByUsername(username: string, enabled = true, deleted = false) {
    return this.userRepo.findOne({ username, enabled, deleted })
  }

  async update(updateUserInput: UpdateUserInput) {
    const user = await this.userRepo.findOne({
      id: updateUserInput.id,
      enabled: true,
      deleted: false,
    })
    if (!user) throw new ObjectNotFound()
    Object.assign(user, updateUserInput)
    return await this.userRepo.save(user)
  }

  private async genUsername(fullName: string) {
    const names = fullName.split(' ')
    let username = names.pop()
    while (names.length > 0) {
      username += names.shift()[0]
    }
    username = username.toLowerCase()
    const count =
      (await this.userRepo.count({ username: Like(`${username}%`) })) || 0
    return `${username}${count + 1}`
  }

  private static genPassword(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
