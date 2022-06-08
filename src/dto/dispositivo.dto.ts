import { IsNotEmpty, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DispositivoDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: String;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    idDispositivo: Number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    idGrupoFamiliar: String;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fechaCreacion: Date;
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Boolean)
    @IsBoolean()
    status: Boolean;
    @ApiProperty()
    @IsString()
    ipDispositivo?: String;
}