import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@withEntity/user/user.entity';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'SECRET_KEY':
                  return 'test-secret-key';
                case 'EXPIRES_IN':
                  return '1h';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should generate a jwt token', () => {
      const _id = 'test-id' as any;
      const token = 'test-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = service.getToken(_id);

      expect(jwtService.sign).toHaveBeenCalledWith(
        { _id },
        {
          secret: 'test-secret-key',
          expiresIn: '1h',
        },
      );
      expect(result).toBe(token);
    });
  });

  describe('getTokenData', () => {
    it('should verify a jwt token and return the payload', () => {
      const token = 'test-token';
      const payload = { _id: 'test-id' };
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);

      const result = service.getTokenData(token);

      expect(jwtService.verify).toHaveBeenCalledWith(token, {
        secret: 'test-secret-key',
      });
      expect(result).toBe(payload._id);
    });
  });
});
