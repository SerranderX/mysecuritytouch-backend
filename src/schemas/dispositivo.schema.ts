import { Schema } from 'mongoose';

export const DispositivoSchema = new Schema({
    idDispositivo: Number,
    idGrupoFamiliar: String,
    nombre: String,
    fechaCreacion: { type: Date, default: Date.now},
    status: {type: Boolean, default: false},
    ipDispositivo: String
});
