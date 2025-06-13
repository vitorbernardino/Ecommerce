import { Exclude, Expose, Type } from "class-transformer";
import { OrderDto } from "./order.dto";

@Exclude()
export class UserDto{
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    email: string;
    @Type(() => OrderDto)
    @Expose()
    orders: OrderDto[];
}