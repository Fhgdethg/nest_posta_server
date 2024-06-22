import {
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Req,
  Res,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from '@entities/user/user.servise';

// import { UpdateUserDto } from '@entities/user/dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() body: any, @Res() res: Response) {
    const newUser = await this.userService.createUser(body);
    return res.status(201).send(newUser);
  }

  @Get('/')
  async getUsers(@Res() res: Response) {
    try {
      const allUsers = await this.userService.getUsers();

      return res.send(allUsers);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  @Get('/:id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserById(id);
    return res.send(user);
  }

  @Put('/:id')
  async updateUserById(
    // @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      // const updatedUser = await this.userService.updateUserById(id, body);
      //
      // return {
      //   ...updatedUser,
      //   userId: id,
      // };
    } catch (err) {
      return { message: err.message };
    }
  }

  @Delete('/:id')
  async deleteUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUserById(id);
    return res.send({ status: 'ok', userId: id });
  }
}
