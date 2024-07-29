import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@withEntity/user/user.entity';
import { cookieKeys } from '@constants/cookieData';

describe('AuthService', () => {
  let controller: AuthController;

  const testUser = {
    _id: 'test-user-id',
    email: 'test@email.test',
    role: 'user',
  };

  const testLoginRes = {
    token: 'test-token',
    user: testUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getToken: jest.fn().mockReturnValue('test-token'),
            getTokenData: jest.fn().mockReturnValue('test-user-id'),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              ...testUser,
              password: 'test-password',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
  });

  describe('Login', () => {
    it('should return login data', async () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as any;

      expect(
        await controller.login(
          {
            email: 'test@email.test',
            password: 'test-password',
          },
          mockResponse,
        ),
      ).toEqual(testLoginRes);
    });
  });

  describe('Auth', () => {
    it('should return user data', async () => {
      const mockRequest = {
        cookies: {
          [cookieKeys.authToken]: 'test-token',
        },
      } as any;

      expect(await controller.auth(mockRequest)).toEqual(testUser);
    });
  });
});
