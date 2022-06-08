import { Schema } from 'mongoose';

export const GrupoFamiliarSchema = new Schema({
    idGrupoFamiliar: { type: Number, default: 0},
    nombre: { type: String, default: "default"},
    email: String,
    fechaCreacion: { type: Date, default: Date.now},
    hashToSync: { type: Number, default: 0},
    status: {type: Boolean, default: true},
});