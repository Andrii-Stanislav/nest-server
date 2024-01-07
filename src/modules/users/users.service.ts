import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './users.model';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    return user;
  }

  async updateUserById(id: number, dto: UpdateUserDto) {
    return await this.userRepository.update({ id }, dto);
  }

  async updateUserByEmail(email: string, dto: UpdateUserDto) {
    return await this.userRepository.update({ email }, dto);
  }
}
