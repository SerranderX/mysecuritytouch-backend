import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmailValidateUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    hashEmailValidate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idUser: string;
}