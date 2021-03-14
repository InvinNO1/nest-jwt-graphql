import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export type User = {
  userId: number
  username: string
  password: string
  email: string
}

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      email: 'a@a.aa',
    } as User,
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      email: 'na@a.aa',
    } as User,
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  createToken(user: User) {
    return this.jwtService.sign({ id: user.userId, email: user.email })
  }
}
