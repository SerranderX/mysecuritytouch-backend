import { Controller, Post, Req, Res, HttpStatus, Body, ConflictException, UnauthorizedException, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { UserDTO } from '../../dto/user.dto';
import { throwError } from 'rxjs';
import { UsersService } from '../users/users.service';
import { SignInDTO } from '../../dto/signin.dto';
import { SignUpDTO } from '../../dto/signup.dto';
import { User } from '../../interface/user.interface';
import { AuthService } from './auth.service';
import { compare } from 'bcryptjs';
import { IJwtPayload } from '../../interface/jwt-payload.interface';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from '../email/email.service';
import { CONST_MYSECURITYTOUCH } from "../config/const.mst";
import { EmailValidateUserDTO } from '../../dto/emailValidateUser.dto';
import { GrupoFamiliarDTO } from '../../dto/grupoFamiliar.dto';
import { UserLoginDataDTO } from '../../dto/userLoginData.dto';
import { GrupoFamiliarService } from '../grupo-familiar/grupo-familiar.service';
import { DispositivosService } from '../dispositivos/dispositivos.service';
import { GrupoFamiliar } from 'src/interface/grupoFamiliar.interface';
import { Dispositivo } from 'src/interface/dispositivo.interface';
import { DispositivoDTO } from 'src/dto/dispositivo.dto';

@ApiTags("AuthenticationModule")
@Controller('auth')
export class AuthController {

    constructor(private dispositivosService:DispositivosService,private userService :UsersService, private readonly authService: AuthService, private emailService: EmailService, private grupoFamiliarService: GrupoFamiliarService){}

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Res() res, @Body() userLoginData: SignInDTO){
        let authValidate: Boolean = false;
        try{
            const {username, password} = userLoginData;
            let usuario = await this.userService.getUser(userLoginData.username);
            const isMatch = (usuario) ? await compare(password, usuario.password.toString()) : false ;
            if(usuario && isMatch && usuario.status == true){
                usuario.password = undefined;

                const payload: IJwtPayload = {
                    id: usuario.id,
                    email: usuario.email.toString(),
                    username: usuario.username.toString()
                }

                const token = await this.authService.generateToken(payload);
                
                authValidate = true;
                
                const cambioStatus = await this.userService.cambiarStatusUser(usuario.id, authValidate);

                let responseUserData:UserLoginDataDTO = new UserLoginDataDTO();
                responseUserData.apellidoMaterno = usuario.apellidoMaterno;
                responseUserData.apellidoPaterno = usuario.apellidoPaterno;
                responseUserData.email = usuario.email.trim();
                responseUserData.estado = usuario.estado;
                responseUserData.fechaCreacion = usuario.fechaCreacion;
                responseUserData.fechaNacimiento = usuario.fechaNacimiento;
                responseUserData.hashEmail = usuario.hashEmail;
                responseUserData.idGrupoFamiliar = usuario.idGrupoFamiliar;
                responseUserData.idUsuario = usuario.idUsuario;
                responseUserData.nombres = usuario.nombres;
                responseUserData.password = usuario.password;
                responseUserData.status = usuario.status;
                responseUserData.tipoUsuario = usuario.tipoUsuario;
                responseUserData.username = usuario.username;

                const dispositivosGrupoUsuario = await this.dispositivosService.getDispositivosByGrupoFamiliar(responseUserData.idGrupoFamiliar);

                console.log(dispositivosGrupoUsuario);
                if(dispositivosGrupoUsuario){
                    dispositivosGrupoUsuario.forEach(element => {
                        responseUserData.dispositivosGrupo.push(element);
                    });
                }

                return res.status(HttpStatus.OK).json({
                    messaje: 'Usuario encontrado',
                    statusCode: HttpStatus.OK,
                    auth: authValidate,
                    token: token,
                    data: responseUserData
                });
            }else{
                throw new UnauthorizedException('Credenciales invalidas');
            }
        }catch(ex){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: ex.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE,
                auth: authValidate,
                data: null
            });
        }
    }

    @Post('/registro')
    @UsePipes(ValidationPipe)
    async registro(@Res() res, @Body() userRegistroData: SignUpDTO){
        try{
            const userExists = await this.userService.getUser(userRegistroData.username, userRegistroData.email,'',true);
            
            let contentEmail:string;

            if(userExists){
                throw new ConflictException("El username o el email ya existen.");
            }

            let grupoFamiliarDTO: GrupoFamiliarDTO = new GrupoFamiliarDTO();
            grupoFamiliarDTO.email = userRegistroData.email;
            const grupoFamiliar: GrupoFamiliar = await this.grupoFamiliarService.createGrupoFamiliar(grupoFamiliarDTO);
            userRegistroData.idGrupoFamiliar = grupoFamiliar.id; 

            const user:User = await this.userService.registrarUser(userRegistroData);
            contentEmail = CONST_MYSECURITYTOUCH.MAIL_VALIATE_CONTENT_1 + user.nombres + ' ' + user.apellidoPaterno + ' ' + user.apellidoMaterno +
            CONST_MYSECURITYTOUCH.MAIL_VALIATE_CONTENT_2 + CONST_MYSECURITYTOUCH.MAIL_VALIATE_CONTENT_3

            
            //await this.emailService.sendMailValidateAccount(user.email, CONST_MYSECURITYTOUCH.SUBJECT_VALIDATE_ACCOUNT, contentEmail, user.hashEmail, user.id);

            if(user && user.hashEmail){
                return res.status(HttpStatus.OK).json({
                    message: 'Usuario creado correctamente',
                    user: user,
                    hashEmail: user.hashEmail,
                    code: HttpStatus.OK
                });
            }else{
                throw new Error("Error al crear usuario en la base de datos.");
            }
        }catch(ex){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: ex.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }

    @Post('/registroUsuarioGrupoFamiliar')
    @UsePipes(ValidationPipe)
    async registroUsuarioGrupoFamiliar(@Res() res, @Body() userRegistroData: SignUpDTO){
        try{
            const userExists1:User = await this.userService.findByEmail(userRegistroData.username, userRegistroData.email);

            if(!userExists1){
                throw new ConflictException("El username o el email no son validos");
            }

            const grupoFamiliar: GrupoFamiliar = await this.grupoFamiliarService.getGrupoFamiliarById(userExists1.idGrupoFamiliar);
            if(!grupoFamiliar){
                throw new ConflictException("El grupo familiar para este usuario no existe.");
            }
            let userDto: UserDTO = new UserDTO();
            userDto.nombres = userRegistroData.nombres;
            userDto.apellidoPaterno = userRegistroData.apellidoPaterno;
            userDto.apellidoMaterno = userRegistroData.apellidoMaterno;
            userDto.fechaNacimiento = userRegistroData.fechaNacimiento;
            userDto.username = userRegistroData.username;
            userDto.password = userRegistroData.password;
            userDto.tipoUsuario = userRegistroData.tipoUsuario;
            userDto.email = userRegistroData.email;
            userDto.idGrupoFamiliar = grupoFamiliar.id;

            const user:User = await this.userService.updateUser(userExists1.id, userDto, true);

            if(user){
                return res.status(HttpStatus.OK).json({
                    message: 'Usuario creado correctamente',
                    user: user,
                    hashEmail: user.hashEmail,
                    code: HttpStatus.OK
                });
            }else{
                throw new Error("Error al crear usuario en la base de datos.");
            }
        }catch(ex){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: ex.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }
    
    @Post('/adminGroup/createUserInGroup')
    @UsePipes(ValidationPipe)
    async createUserInGroup(@Res() res, @Body() userRegistroData: UserDTO){
        try{
            const userEmail:User = await this.userService.findByEmail(undefined, userRegistroData.email);

            if(userEmail){
                throw new ConflictException("El username o el email ya existen en sistema");
            }

            const user = await this.userService.createUser(userRegistroData, false);
            console.log(user);
            if(user){
                return res.status(HttpStatus.OK).json({
                    message: 'Usuario creado exitosamente en el grupo familiar. Favor de continuar el registro en "Registrar usuario en grupo familair".',
                    user: user,
                    code: HttpStatus.OK
                });
            }
        }catch(ex){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: ex.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }

    @Post('/validateEmailUser')
    @UsePipes(ValidationPipe)
    async validateEmailUser(@Res() res, @Body('hash') emailValidateUser: EmailValidateUserDTO){
        try{
            let user:User = await this.userService.validateAccount(emailValidateUser);
            
            user.password = undefined;

            if(user){
                return res.status(HttpStatus.OK).json({
                    message: 'Autenticacion exitosa',
                    user: user,
                    code: HttpStatus.OK
                });
            }
        }catch(ex){
            return res.status(HttpStatus.NOT_ACCEPTABLE).json({
                message: ex.message,
                statusCode: HttpStatus.NOT_ACCEPTABLE
            });
        }
    }   
}
