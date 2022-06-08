import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmailValidation {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly username: String;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
}