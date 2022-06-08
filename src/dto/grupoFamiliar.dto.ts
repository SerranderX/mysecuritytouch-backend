import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { isBoolean, isNumber } from 'util';
import { Type } from 'class-transformer';

export class GrupoFamiliarDTO {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    idGrupoFamiliar: Number;
    @ApiProperty()
    @IsString()
    nombre: String;
    @ApiProperty()
    @IsString()
    email: String;
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    fechaCreacion: Date;
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    hashToSync: Number;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    status: Boolean;
}