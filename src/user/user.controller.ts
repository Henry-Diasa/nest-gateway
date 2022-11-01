import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { AddUserDto } from './user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('用户')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  @ApiOperation({
    summary: '新增用户',
  })
  @Post('/add')
  create(@Body() user: AddUserDto) {
    return this.userService.createOrSave(user);
  }
  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name;
  }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  @Version('2')
  findAll2() {
    return 'another one';
  }
}
