import { Injectable } from '@nestjs/common';
import { User } from '../../interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types} from 'mongoose';
import { UserDTO } from '../../dto/user.dto';
import { UserSchema } from '../../schemas/user.schema';
import { SignUpDTO } from '../../dto/signup.dto';
import { genSalt, hash } from 'bcryptjs';
import { EmailValidateUserDTO } from 'src/dto/emailValidateUser.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUser( username?: string, email?: string, userId?: string, reqFromRegister?: boolean): Promise<User> {
        try{
            let user:User[];
            if(reqFromRegister){
                user = await this.userModel.find({username: username});
                if(!user){
                    user = await this.userModel.find({email: email});
                }    
            }else{
                if(userId && userId.length > 0){
                    const user = await this.userModel.findById(userId); 
                    return user;
                }else if(username && username.length > 0){
                    user = await this.userModel.find({username: username}); 
                }else if(email && email.length > 0){
                    user = await this.userModel.find({email: email}); 
                }else{
                    throw new Error('Las variables enviadas como argumento se encuentran vacias')
                }
            }
            return user.find(user => user.username.length > 0);
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }

    async registrarUser(signUpDTO: SignUpDTO): Promise<User> {
        try{
            console.log("Entre");
            const userDTO: UserDTO = new UserDTO();
            userDTO.nombres = signUpDTO.nombres;
            userDTO.apellidoPaterno = signUpDTO.apellidoPaterno;
            userDTO.apellidoMaterno = signUpDTO.apellidoMaterno;
            userDTO.fechaNacimiento = signUpDTO.fechaNacimiento;
            userDTO.username = signUpDTO.username;
            userDTO.password = signUpDTO.password;
            userDTO.email = signUpDTO.email;
            userDTO.tipoUsuario = (signUpDTO.tipoUsuario) ? signUpDTO.tipoUsuario: 0 ; 
            userDTO.hashEmail = await this.generateHashEmail(signUpDTO.username);
            userDTO.status = true;
            userDTO.idGrupoFamiliar = signUpDTO.idGrupoFamiliar;
            const newUser = new this.userModel(userDTO);
            newUser.password = await UserSchema.methods.encryptPassword(newUser.password);
            return await newUser.save();
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message); 
        }
    }

    async createUser(userDTO: UserDTO, fromRegistroUsuarioInGroup?: boolean): Promise<User>{
        try{
            let userSaved: User;
            const newUser:User = new this.userModel(userDTO);
            console.log(newUser);
            console.log(newUser.idGrupoFamiliar);
            if((fromRegistroUsuarioInGroup && (fromRegistroUsuarioInGroup != null && fromRegistroUsuarioInGroup != undefined)) 
            && (userDTO.idGrupoFamiliar != null && userDTO.idGrupoFamiliar != undefined && userDTO.idGrupoFamiliar.length > 4)){
                userSaved = await newUser.save();
            }else{
                userSaved = await newUser.save();
            }
            return userSaved;
        }catch(error){
            console.log('Ocurrio un error en service: '+error.message);
        }
    }

    async getUsers(): Promise<User[]> {
        const usersList = await this.userModel.find();
        return usersList;
    }

    async updateUser(userID: String, userDTO: UserDTO, usuarioFromRegistroUsrGroupFamiliar?: boolean): Promise<User> {
        const newUser:User = new this.userModel(userDTO); 
        if(usuarioFromRegistroUsrGroupFamiliar != null && usuarioFromRegistroUsrGroupFamiliar){
            newUser.password = await UserSchema.methods.encryptPassword(newUser.password);
        }
        const act = {
            nombres: userDTO.nombres,
            apellidoPaterno: userDTO.apellidoPaterno,
            apellidoMaterno: userDTO.apellidoMaterno,
            fechaNacimiento: userDTO.fechaNacimiento,
            username: userDTO.username,
            password: newUser.password,
            status: true,
        }

        const usuario = await this.userModel.findById(userID);
        let idObj = Types.ObjectId(usuario.id);
        const updatedUser = await this.userModel.updateOne({_id:idObj},act);
        console.log(updatedUser);
        return updatedUser;
    }

    async cambiarStatusUser(idUsuario: String, status: Boolean): Promise<Boolean>{
        let result = false;
        try{
            if(idUsuario){
                var usuario = await this.userModel.findById(idUsuario);
                
                if(usuario){
                    usuario.status = status;
                    usuario.save()
                    if(usuario.status == status){
                        result = true;
                    }else{
                        console.log("no cambio el estatus");
                    }
                }else{
                    console.log("no encontro el usuario")
                }
            }
        }catch(ex){
            throw new Error("Error en UserService al llamar al metodo: cambiarStatusUser");
        }
        return result;
    }

    async generateHashEmail(username: string){
        try{
            const salt = await genSalt(10);
            const encryptHashEmail = await hash(username, salt);
            return encryptHashEmail;
        }catch(ex){
            throw new Error("Error en UserService al llamar al metodo: generateHashEmail");
        }
    }

    async findByEmail(username?: string, email?: string): Promise<User> {
        try{
            let userByEmail:User;
            let userByUsername:User;
            if(username && email){
                userByEmail = await this.userModel.findOne({email: email});
                userByUsername = await this.userModel.findOne({username: username});
                if(!userByEmail){
                    return null;
                }else if(userByUsername){
                    return null;
                }
            }else if(email){
                userByEmail = await this.userModel.findOne({email: email});
            }else{
                throw new ErrorEvent("parametros vacios o incorrectos");
            }
            return userByEmail;
        }catch(ex){
            throw new Error("Error en UserService al llaamar al metodo: findByEmail");
        }
    }

    
    async validateAccount(emailValidateUserDTO :EmailValidateUserDTO): Promise<User> {
        try{
            const { hashEmailValidate, idUser } = emailValidateUserDTO;
            const user = await this.userModel.findById(idUser); 

            if(!user){
                return;
            }

            if(user.hashEmail == hashEmailValidate && !user.status){
                user.status = true;
                await user.save();
                return user;
            }else{
                return;
            }
        }catch(ex){
            throw new Error("Error en UserService al llamar al metodo: validateAccount");
        }
    }
}
