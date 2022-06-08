import { Schema } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

export const UserSchema = new Schema({
    idUsuario: Number,
    nombres: String,
    apellidoPaterno: String,
    apellidoMaterno: String,
    fechaNacimiento: Date,
    fechaCreacion: { type: Date, default: Date.now},
    username: String,
    email: String,
    password: String,
    tipoUsuario: Number,
    estado: {type: Boolean, default: true},
    status: {type: Boolean, default: false},
    hashEmail: String,
    idGrupoFamiliar:String
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await genSalt(10);
    const encryptPass = await hash(password, salt);
    return encryptPass;
}

