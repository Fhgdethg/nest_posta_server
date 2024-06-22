import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { hash } from 'bcrypt';

import { User } from '@entities/user/user.entity';
// import { UpdateUserDto } from '@entities/user/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: any) {
    // const hashedPassword = await hash(userData.password, 7);
    // const newUser = this.userRepository.create({
    //   ...userData,
    //   password: hashedPassword,
    // });
    // await this.userRepository.save(newUser);
    //
    // return newUser;
  }

  async getUsers() {
    return await this.userRepository.find({
      select: ['userId', 'email', 'role'],
    });
  }

  async getUserById(userId: number) {
    return await this.userRepository.findOne({
      select: ['userId', 'email', 'role'],
      where: { userId },
    });
  }

  async updateUserById(userId: number) {
    // const { email, role } = userData;
    // return await this.userRepository.update(
    //   { userId },
    //   {
    //     email,
    //     role,
    //   },
    // );
  }

  async deleteUserById(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
