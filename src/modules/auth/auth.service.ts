import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@withEntity/user/user.entity';
import { ObjectId, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getToken(_id: ObjectId) {
    const SECRET_KEY = this.configService.get<string>('SECRET_KEY');
    const EXPIRES_IN = this.configService.get<string>('EXPIRES_IN');

    return this.jwtService.sign(
      { _id },
      {
        secret: SECRET_KEY,
        expiresIn: EXPIRES_IN,
      },
    );
  }
}
