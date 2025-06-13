import { Exclude, Expose, Type } from "class-transformer";
import { ProductDto } from "./product.dto";

@Exclude()
export class OrderDto{
    @Expose()
    id: number;
    @Expose()
    orderNumber: string;
    @Expose()
    totalPrice: number;
    @Type(() => ProductDto)
    @Expose()
    products: ProductDto[];
}