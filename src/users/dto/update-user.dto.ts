import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../commands/create-user/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
