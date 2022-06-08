import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { isBoolean, isNumber } from 'util';
import { Type } from 'class-transformer';
import { DispositivoDTO } from './dispositivo.dto';

export class UserLoginDataDTO{

    @ApiProperty()
    @Type(() => Number)
    idUsuario?: Number;
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
    fechaCreacion?: Date;
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

    dispositivosGrupo?: DispositivoDTO[];

    constructor(){
        this.dispositivosGrupo = [];
    }
}