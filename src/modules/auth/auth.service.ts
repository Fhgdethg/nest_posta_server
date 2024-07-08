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

  private SECRET_KEY = this.configService.get<string>('SECRET_KEY');

  getToken(_id: ObjectId) {
    const EXPIRES_IN = this.configService.get<string>('EXPIRES_IN');

    return this.jwtService.sign(
      { _id },
      {
        secret: this.SECRET_KEY,
        expiresIn: EXPIRES_IN,
      },
    );
  }

  getTokenData(t: string) {
    return this.jwtService.verify(t, {
      secret: this.SECRET_KEY,
    })._id;
  }
}
