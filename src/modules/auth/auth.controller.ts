import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Res,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@withEntity/user/user.entity';

import { AuthService } from './auth.service';

import { LoginReqDto, LoginResponseDto } from './dto/login.dto';
import { UserResDto } from '@withEntity/user/dto/userRes.dto';

import { routes } from '@constants/routes';
import { apiTags } from '@constants/swaggerData';

import { IModifyAuthRequest } from '@globalTypes/basic.types';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @ApiTags(apiTags.auth)
  @ApiOkResponse({
    description: 'Successful login',
    type: LoginResponseDto,
  })
  @Post(routes.login)
  async login(@Body() loginDto: LoginReqDto, @Res() res: Response) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      throw new BadRequestException('Email or password is not correct');

    const token = this.authService.getToken(user._id);

    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    delete user.password;

    return res.send({ token, user });
  }

  @ApiTags(apiTags.auth)
  @ApiOkResponse({
    description: 'Token is valid',
    type: UserResDto,
  })
  @Get(routes.auth)
  async auth(@Req() req: IModifyAuthRequest) {
    const { userID } = req;

    if (!userID) throw new BadRequestException('Session was ended');

    const user = await this.userRepository.findOne({
      where: { _id: userID },
    });

    if (!user) throw new NotFoundException('User was not founded');
    delete user.password;

    return user;
  }
}
