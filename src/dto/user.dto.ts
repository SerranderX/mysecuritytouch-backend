import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { isBoolean, isNumber } from 'util';
import { Type } from 'class-transformer';

export class UserDTO{
    @ApiProperty()
    @Type(() => Number)
    readonly idUsuario?: Number;
    @ApiProperty()
    @IsString()
    nombres?: String;
    @ApiProperty()
    @IsString()
    apellidoPaterno?: String;
    @ApiProperty()
    @IsString()
    apellidoMaterno?: String;
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    fechaNacimiento?: Date;
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    readonly fechaCreacion?: Date;
    @ApiProperty()
    @IsString()
    username?: String; 
    @ApiProperty()
    @IsString()
    password?: String;
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    tipoUsuario?: Number;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    estado?:Boolean;
    @ApiProperty()
    @IsString()
    email?: string;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    status?:Boolean;
    @ApiProperty()
    @IsString()
    hashEmail?: String;
    @ApiProperty()
    @IsString()
    idGrupoFamiliar?: String;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    usuarioParaGrupoFamiliar?: Boolean;
}