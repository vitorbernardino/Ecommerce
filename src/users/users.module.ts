import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Product]),
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [...QueryHandlers, ...CommandHandlers],
})
export class UsersModule {}
