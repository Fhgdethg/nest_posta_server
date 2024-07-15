import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { routes } from '@constants/routes';
import { apiTags } from '@constants/swaggerData';

@Controller(routes.root)
export class RootController {
  constructor() {}

  @ApiTags(apiTags.root)
  @ApiOkResponse({
    description: 'The server works testing',
    type: String,
  })
  @Get()
  findAll() {
    return 'Server works!';
  }
}
