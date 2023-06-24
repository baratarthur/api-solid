import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { type UserRepository } from '@/repositories/users-repository'

let usersRepository: UserRepository
let sut: AuthenticateUseCase

describe('Authentication use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'test',
      email: 'a@b.c',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'a@b.c',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'a@b.c',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'test',
      email: 'a@b.c',
      password_hash: await hash('123456', 6)
    })

    await expect(
      sut.execute({
        email: 'a@b.c',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
