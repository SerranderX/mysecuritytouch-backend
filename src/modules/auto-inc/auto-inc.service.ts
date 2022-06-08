import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ai } from 'src/interface/ai.interface';
import { Model } from 'mongoose';

@Injectable()
export class AutoIncService {

    constructor(@InjectModel('Ai') private readonly aiModel: Model<Ai>) {}

    async getAutoIncrement(): Promise<Ai> {
        try{
            const autoIncrementable = await this.aiModel.find();
            if(autoIncrementable.length == 0){
                const Ai = { count: 1 };
                const newAi = new this.aiModel(Ai);
                return await newAi.save();
            }else{
                let AiObj = autoIncrementable[0];
                let countSum:number = 1;
                AiObj.count = AiObj.count.valueOf() + countSum;
                return await AiObj.save();
            }
        }catch(error){
            throw new Error('Ocurrio un error en service: '+error.message); 
        }
    }
}
