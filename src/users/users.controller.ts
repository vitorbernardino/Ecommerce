import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { GetUserQuery } from './queries/get-user/get-user.query';
import { CreateUserCommand } from './commands/create-user/create-user.command';

@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const command = plainToClass(CreateUserCommand, createUserDto);
    const id = await this.commandBus.execute(command);
    const query = plainToClass(GetUserQuery, {id});
    return this.queryBus.execute(query);
  }

  @Get()
  findAll() {
    return null;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetUserQuery, {id: +id});
    const result = await this.queryBus.execute(query);
    if(!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return null;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return null;
  }
}
