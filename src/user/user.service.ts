import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Like, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { hashSync } from 'bcrypt'
import { remove } from 'remove-accents'

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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

  findByUsername(username: string) {
    return this.userRepo.findOne({ username, enabled: true })
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  private async genUsername(fullName: string) {
    const names = fullName.split(' ')
    let username = names.pop()
    while (names.length > 0) {
      username += names.shift()[0]
    }
    username = remove(username.toLowerCase())
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
