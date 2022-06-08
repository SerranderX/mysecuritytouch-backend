import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GrupoFamiliar } from 'src/interface/grupoFamiliar.interface';
import { Model } from 'mongoose';
import { GrupoFamiliarDTO } from 'src/dto/grupoFamiliar.dto';

@Injectable()
export class GrupoFamiliarService {

    constructor(@InjectModel('GrupoFamiliar') private readonly grupoFamiliarModel: Model<GrupoFamiliar>) {}
    
    async getGruposFamiliares(): Promise<GrupoFamiliar[]> {
        try{
            const grupoFamiliarList = await this.grupoFamiliarModel.find();
            return grupoFamiliarList
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }
    
    async getGrupoFamiliarById( grupoFamiliarId?: String ): Promise<GrupoFamiliar> {
        try{
            return await this.grupoFamiliarModel.findById(grupoFamiliarId);
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }

    async createGrupoFamiliar(grupoFamiliarDTO: GrupoFamiliarDTO): Promise<GrupoFamiliar> {
        try{
            const newGrupoFamiliar = new this.grupoFamiliarModel(grupoFamiliarDTO);
            const grupoFamiliar: GrupoFamiliar = await newGrupoFamiliar.save();
            return grupoFamiliar;
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }

    async updateGrupoFamiliar(grupoFamiliarDTO: GrupoFamiliarDTO, grupoFamiliarId: String): Promise<GrupoFamiliar> {
        try{
            const updatedUser = await this.grupoFamiliarModel.findByIdAndUpdate(grupoFamiliarId, grupoFamiliarDTO,  {new: true});
            return updatedUser;
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }

}
