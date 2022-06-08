import { IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SignUpDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly nombres: String;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly apellidoPaterno: String;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly apellidoMaterno: String;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly fechaNacimiento: Date;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly tipoUsuario: Number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    estado:Boolean;
    @ApiProperty()
    @IsString()
    @Type(() => String)
    idGrupoFamiliar?: String;
}