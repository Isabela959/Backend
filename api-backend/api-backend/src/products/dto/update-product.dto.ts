import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductDto{
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0) // Preço não pode ser negativo
    @IsOptional()
    price?: number;
}