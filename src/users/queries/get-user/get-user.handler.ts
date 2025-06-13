import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./get-user.query";
import { UserDto } from "./user.dto";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { plainToClass } from "class-transformer";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, UserDto | null> {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {}

    async execute(query: GetUserQuery): Promise<UserDto | null> {
        const data = await this.dataSource.manager.find(User, {
            where: {id: query.id},
            relations: ['orders', 'orders.products']
        });

        if(!data.length) {
            return null;
        }

        return plainToClass(UserDto, data[0]);
    }
    
}