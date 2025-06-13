import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateUserCommand } from "./update-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, number> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}
    
    async execute(command: UpdateUserCommand): Promise<number> {
      return await this.dataSource.transaction(async (db) => {
        const user = await db.findOne(User, {where: {id: command.id}, relations: ['orders']});
        if(!user) {
            throw new NotFoundException('User not found');
        }
        db.merge(User, user, command);
        await db.save(User, user);
        return 1;
      });
    }

}