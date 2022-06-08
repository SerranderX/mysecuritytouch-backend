import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Dispositivo } from 'src/interface/dispositivo.interface';
import { DispositivoDTO } from '../../dto/dispositivo.dto';
import { AutoIncService } from '../auto-inc/auto-inc.service';

@Injectable()
export class DispositivosService {

    constructor(@InjectModel('Dispositivo') private readonly dispositivoModel: Model<Dispositivo>, private readonly autoIncService:AutoIncService ) {}
    
    async getDispositivo(idDispositivo:String): Promise<Dispositivo> {
        try{
            if(!idDispositivo){
                throw new Error();
            }else{
                const dispositivo = await this.dispositivoModel.findById(idDispositivo);
                if(dispositivo){
                    return dispositivo;
                }
            }
            return null;
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }

    async getDispositivos(): Promise<Dispositivo[]> {
        try{
            const dispositivo = await this.dispositivoModel.find();
            if(dispositivo){
                return dispositivo;
            }    
            return null;
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }

    async getDispositivosByGrupoFamiliar( grupoFamiliarId?: String ): Promise<Dispositivo[]> {
        try{
            if(!grupoFamiliarId){
                throw new Error();
            }else{
                console.log(grupoFamiliarId);
                const dispositivo = await this.dispositivoModel.find({idGrupoFamiliar: grupoFamiliarId});
                console.log(dispositivo)
                if(dispositivo){
                    return dispositivo;
                }
            }
            return null;        
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message);
        }
    }

    async createDispositivo(dispositivoDTO: DispositivoDTO): Promise<Dispositivo> {
        try{
            if(dispositivoDTO){
                const autoIncrement = await this.autoIncService.getAutoIncrement();
                dispositivoDTO.idDispositivo = autoIncrement.count;
                const newDispositivo = new this.dispositivoModel(dispositivoDTO);
                if(newDispositivo){
                    return await newDispositivo.save();
                }else{
                    return null;
                }
            }
            return null;
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }

    async updateDispositivo(idDispositivo: String, dispositivoDTO?: DispositivoDTO): Promise<Dispositivo> {
        try{
            if(idDispositivo && dispositivoDTO){
                let dispositivo = await this.dispositivoModel.findById(idDispositivo);
                let UpdateDispositivoDTO:DispositivoDTO = new DispositivoDTO();
                UpdateDispositivoDTO.idGrupoFamiliar = dispositivoDTO.idGrupoFamiliar;

                let idObj = Types.ObjectId(dispositivo.id);
                const updatedDispotivio = await this.dispositivoModel.updateOne({_id:idObj},UpdateDispositivoDTO);
                return updatedDispotivio;
            }    
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }

    async updateIpDispositivo(idDispositivo: String, ipDispositivo: String): Promise<Dispositivo> {
        try{
            if(idDispositivo && ipDispositivo){
                let dispositivo = await this.dispositivoModel.findById(idDispositivo);
                let idObj = Types.ObjectId(dispositivo.id);
                const updatedDispotivio = await this.dispositivoModel.updateOne({_id:idObj},{'$set': {'ipDispositivo': ipDispositivo}});
                return updatedDispotivio;
            }    
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }

    async deleteDispositivo(idDispositivo: String): Promise<Dispositivo> {
        try{
            if(idDispositivo){
                return await this.dispositivoModel.findByIdAndDelete(idDispositivo);
            }    
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }
}
