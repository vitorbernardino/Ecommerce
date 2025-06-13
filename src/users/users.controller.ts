import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { GetUserQuery } from './queries/get-user/get-user.query';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { UpdateUserCommand } from './commands/update-user/update-user.command';
import { UpdateUserDto } from './commands/update-user/update-user.dto';

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
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    const command = plainToClass(UpdateUserCommand, {id: +id, ...updateUserDto});
    const affectedRows = await this.commandBus.execute(command);
    if(!affectedRows) {
      throw new NotFoundException('User not found');
    }
    const query = plainToClass(GetUserQuery, {id: +id});
    return this.queryBus.execute(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return null;
  }
}
