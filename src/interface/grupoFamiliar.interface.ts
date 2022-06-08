import { Document } from 'mongoose';

export interface GrupoFamiliar extends Document{
    idGrupoFamiliar: Number;
    nombre: String;
    email: String;
    fechaCreacion: Date;
    hashToSync: Number;
    status: Boolean;
}