import { Controller, Get, Res, Param, Body, Put, HttpStatus } from '@nestjs/common';
import { GrupoFamiliarDTO } from '../../dto/grupoFamiliar.dto';
import { GrupoFamiliarService } from './grupo-familiar.service';

@Controller('grupo-familiar')
export class GrupoFamiliarController {

    constructor(private grupoFamiliarService: GrupoFamiliarService){}

    
    @Get('/:idGrupoFamiliar')
    async getGrupoFamiliar(@Res() res, @Param('idGrupoFamiliar') idGrupoFamiliar: string){
        let resultData: any;
        try{
            resultData = this.grupoFamiliarService.getGrupoFamiliarById(idGrupoFamiliar);
            
            return res.status(HttpStatus.OK).json({
                message: 'Grupo familiar creado correctamente',
                code: HttpStatus.OK,
                data: resultData
            });
        }catch(error){
            console.error('Ocurrio un error', error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }

    @Put('/update/:idGrupoFamiliar')
    async updateGrupoFamiliar(@Res() res,  @Param('idGrupoFamiliar') idGrupoFamiliar: string,@Body() grupoFamiliarDTO : GrupoFamiliarDTO){
        let resultData: any;
        try{
            resultData = this.grupoFamiliarService.updateGrupoFamiliar(grupoFamiliarDTO, idGrupoFamiliar);
            
            return res.status(HttpStatus.OK).json({
                message: 'Grupo familiar actualizado correctamente',
                code: HttpStatus.OK,
                data: resultData
            });
        }catch(error){
            console.error('Ocurrio un error', error.message);
            return res.status(error).json({
                message: error.message,
                code: error
            });
        }
    }


}
