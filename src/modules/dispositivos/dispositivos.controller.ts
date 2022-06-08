import { Controller, Get, UsePipes, Res, Param, UseGuards, Post, Delete, Put, Body, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DispositivosService } from './dispositivos.service';
import { DispositivoDTO } from './../../dto/dispositivo.dto';
import { throwError } from 'rxjs';

@ApiTags("DispositivosModule")
@Controller('dispositivos')
export class DispositivosController {

    private readonly TIPE_UPDATE_NORMAL:number = 1;
    private readonly TIPE_UPDATE_IP_UPDATE:number = 2;

    constructor(private dispositivosService: DispositivosService){}

    @UseGuards(AuthGuard())
    @Post('/createDispositivo')
    async createDispositivo(@Res() res,@Body() dispositivoDTO: DispositivoDTO){
        let error = HttpStatus.CONFLICT;
        try{
            const newDispositivo = await this.dispositivosService.createDispositivo(dispositivoDTO);
            if(!newDispositivo){
                throw new Error("Error al crear el dispositivo");
            }

            return res.status(HttpStatus.OK).json({
                messaje: 'Dispositivo creado correctamente',
                statusCode: HttpStatus.OK,
                data: newDispositivo
            });
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @UseGuards(AuthGuard())
    @Get('/traertDispositivoByIdNumber/:idDispositivo')
    async getDispositivos(@Res() res, @Param('idDispositivo') idDispositivo:string){
        let error = HttpStatus.CONFLICT;
        try{
            const dispocitivo = await this.dispositivosService.getDispositivo(idDispositivo);
            return res.status(HttpStatus.OK).json({
                messaje: 'Dispositivo encontrado',
                statusCode: HttpStatus.OK,
                data: dispocitivo
            });
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @UseGuards(AuthGuard())
    @Get('/')
    async getDispositivo(@Res() res){
        let error = HttpStatus.CONFLICT;
        try{
            const dispocitivos = await this.dispositivosService.getDispositivos();
            return res.status(HttpStatus.OK).json({
                messaje: 'Dispositivos list',
                statusCode: HttpStatus.OK,
                data: dispocitivos
            });
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    } 

    @Put('/updateDispositivo/:idDispositivo/:tipeUpdate')
    async updateDispositivo(@Res() res,@Param('idDispositivo') idDispositivo:String, @Param('tipeUpdate') tipeUpdate:string, @Body() dispositivoDTO: DispositivoDTO ){
        console.log("asdasdasd")
        console.log(dispositivoDTO)
        let error = HttpStatus.CONFLICT;
        try{
            let dispositivo = null;
            let tipeUpdateNum:Number = parseInt(tipeUpdate);

            if(typeof tipeUpdateNum != "number"){
                throw new Error("Datos request invalidos: tipeUpdate");
            }

            if(tipeUpdateNum == this.TIPE_UPDATE_NORMAL){
                dispositivo = await this.dispositivosService.updateDispositivo(idDispositivo, dispositivoDTO);
                return res.status(HttpStatus.OK).json({
                    message: 'Dispositivo modificado correctamente',
                    code: HttpStatus.OK,
                    data: dispositivo
                });    
            }else if(tipeUpdateNum == this.TIPE_UPDATE_IP_UPDATE){
                dispositivo = await this.dispositivosService.updateIpDispositivo(idDispositivo, dispositivoDTO.ipDispositivo);
                return res.status(HttpStatus.OK).json({
                    message: 'Dispositivo modificado correctamente',
                    code: HttpStatus.OK,
                    data: dispositivo
                });
            }else{
                throw new Error("Datos request invalidos: tipeUpdate");
            }
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @UseGuards(AuthGuard())
    @Put('/disableDispositivo/:idDispositivo')
    async disableDispositivo(@Res() res, @Param('idDispositivo') idDispositivo: string){
        let error = HttpStatus.CONFLICT;
        try{
            let dispocitivoF = await this.dispositivosService.getDispositivo(idDispositivo);
            if(!dispocitivoF){
                throw new Error("Dispositivo no encontrado");
            }
            dispocitivoF.status = false;
            const dispositivoU = await this.dispositivosService.updateDispositivo(idDispositivo, dispocitivoF);
            if(!dispositivoU){
                throw new Error("Error al actualizar el dispositivo");
            }
            return res.status(HttpStatus.OK).json({
                messaje: 'Dispositivo actualizado',
                statusCode: HttpStatus.OK,
                data: dispositivoU
            });
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @UseGuards(AuthGuard())
    @Post('/sincronizarDispositivo/:grupoFamiliar/:idDispositivo')
    async agregarDispositivoAGrupoFamiliar(@Res() res, @Param('grupoFamiliar') grupoFamiliar: String, @Param('idDispositivo') idDispositivo:String ){
        let error = HttpStatus.CONFLICT;
        try{
            if(!grupoFamiliar || !idDispositivo){
                throw new Error("Los parametros enviados se encuentran vacios.");
            }

            const dispositivo = await this.dispositivosService.getDispositivo(idDispositivo);

            if(dispositivo){
                const dispositivoDTO: DispositivoDTO = new DispositivoDTO();
                dispositivoDTO.idDispositivo = dispositivo.idDispositivo;
                dispositivoDTO.fechaCreacion = dispositivo.fechaCreacion;
                dispositivoDTO.idGrupoFamiliar = grupoFamiliar;
                dispositivoDTO.nombre = dispositivo.nombre ;
                dispositivoDTO.ipDispositivo = dispositivo.ipDispositivo;
                dispositivoDTO.status = dispositivo.status;

                const dispositivoU = await this.dispositivosService.updateDispositivo(idDispositivo, dispositivoDTO);    

                return res.status(HttpStatus.OK).json({
                    messaje: 'Dispositivo actualizado',
                    statusCode: HttpStatus.OK,
                    data: dispositivoU
                });
            }else{
                throw new Error("Error al sincronizar el dispositivo");
            }
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @UseGuards(AuthGuard())
    @Delete('/deleteDispositivo/:idDispositivo')
    async deleteDispositivo(@Res() res, @Param('idDispositivo') idDispositivo: string){
        let error = HttpStatus.CONFLICT;
        try{
            let dispocitivoD = await this.dispositivosService.deleteDispositivo(idDispositivo);
            if(!dispocitivoD){
                throw new Error("Dispositivo no encontrado");
            }
            return res.status(HttpStatus.OK).json({
                messaje: 'Dispositivo eliminado',
                statusCode: HttpStatus.OK,
                data: dispocitivoD
            });
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }
}
