import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: {[key: string]: string};

    constructor(){
        //Se comprueba si estamos en un ambiente de desarrollo
        const isDevelopmentEnviroment =  process.env.NODE_ENV !== "production";

        if(isDevelopmentEnviroment) {
            const envFilePath = __dirname + '/../../../.env';
            const existsPath = fs.existsSync(envFilePath);

            if(!existsPath){
                console.log('.env file no existe');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        }else {
            PORT: process.env.PORT
        }

    }

    get(key: string): string {
        //Mediante un bracket notation, encontrara el parametro mediante su key
        return this.envConfig[key];
    }
}
