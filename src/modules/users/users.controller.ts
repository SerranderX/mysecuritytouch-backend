import { Controller, Get, Res, Param, HttpStatus, Body, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { GrupoFamiliarDTO } from '../../dto/grupoFamiliar.dto';
import { GrupoFamiliarService } from '../grupo-familiar/grupo-familiar.service';
import { GrupoFamiliar } from 'src/interface/grupoFamiliar.interface';

@ApiTags("UsersModule")
@UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService, private grupoFamiliarService: GrupoFamiliarService){}

    
    @Get('/:idUsuario')
    async getUsuario(@Res() res, @Param('idUsuario') idUsuario: string){
        try{
            const usuario = await this.userService.getUser(idUsuario);
            return res.status(HttpStatus.OK).json({
                messaje: 'Usuario encontrado',
                data: usuario
            });
        }catch(error){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: error.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }

    @Get('/')
    async getUsuarios(@Res() res){
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            messaje: 'Usuarios encontrados',
            data: users
        });
    }

    @Post('/createUser')
    async createUser(@Res() res, @Body() userDTO: UserDTO) {
        try{
            let grupoFamiliarDTO: GrupoFamiliarDTO = new GrupoFamiliarDTO;
            grupoFamiliarDTO.email = userDTO.email;
            const grupoFamiliar:GrupoFamiliar = await this.grupoFamiliarService.createGrupoFamiliar(grupoFamiliarDTO);
            userDTO.idGrupoFamiliar = grupoFamiliar.id; 
            const user = await this.userService.createUser(userDTO);
            if(!user){
                res.HttpStatus.error(400);    
            }
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado correctamente',
                code: HttpStatus.OK,
                data: user
            });
        }catch(error){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: error.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }

    @Post('/createUserEnGrupoFamiliar')
    async createUserEnGrupoFamiliar(@Res() res, @Body() userDTO: UserDTO) {
        try{
            let grupoFamiliarDTO: GrupoFamiliarDTO = new GrupoFamiliarDTO;
            grupoFamiliarDTO.email = userDTO.email;
            const grupoFamiliar: GrupoFamiliar = await this.grupoFamiliarService.getGrupoFamiliarById(userDTO.idGrupoFamiliar);
            if(!grupoFamiliar){
                throw new Error("Error, ya existe un usuario con ese correo en sistema.");
            }
            userDTO.idGrupoFamiliar = grupoFamiliar.id; 
            const user = await this.userService.createUser(userDTO);
            if(!user){
                throw new Error("Error al crear usuario en la base de datos.");  
            }
            return res.status(HttpStatus.OK).json({
                message: 'Usuario creado correctamente',
                code: HttpStatus.OK,
                data: user
            });
        }catch(error){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: error.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }

    @Put('/update/:idUsuario')
    updateUser(@Res() res, @Body() userDTO: UserDTO, @Param('idUsuario') idUsuario){
        try{
            const user = this.userService.updateUser(idUsuario ,userDTO);
            return res.status(HttpStatus.OK).json({
                message: 'Usuario modificado correctamente',
                code: HttpStatus.OK,
                data: user
            });
        }catch(error){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: error.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }
}