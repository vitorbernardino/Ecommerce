import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, number> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}
    
    async execute(command: CreateUserCommand): Promise<number> {
      return await this.dataSource.transaction(async (db) => {
        const user = db.create(User, command);

        await db.save(user);

        return user.id;
      });
    }

    
}