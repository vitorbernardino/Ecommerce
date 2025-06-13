import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProductDto{
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    price: number;
    @Expose()
    description: string;
}