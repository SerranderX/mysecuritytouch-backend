import { Document } from 'mongoose';

export interface Dispositivo extends Document{
    nombre: String;
    idDispositivo: Number;
    idGrupoFamiliar: String;
    fechaCreacion: Date;
    status: Boolean;
    ipDispositivo: String;
}