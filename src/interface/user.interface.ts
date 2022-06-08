import { Document } from 'mongoose';

export interface User extends Document{
    idUsuario: Number;
    nombres: String;
    apellidoPaterno: String;
    apellidoMaterno: String;
    fechaNacimiento: Date;
    fechaCreacion: Date;
    username: String; 
    password: String;
    email:String;
    tipoUsuario: Number;
    estado:Boolean;
    status:Boolean;
    hashEmail?: String;
    idGrupoFamiliar?: String;
}