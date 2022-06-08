import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';
import { User } from 'src/interface/user.interface';
var nodemailer = require('nodemailer');

@Injectable()
export class EmailService {

    private transporter:any;

    constructor(private readonly configService:ConfigService){
        this.transporter = nodemailer.createTransport({
            service: configService.get(Configuration.SERVICE),
            port:25,
            secure:false,
            auth: {
              user: configService.get(Configuration.GMAIL_ACCOUNT),
              pass: configService.get(Configuration.GMAIL_PASSWORD)
            }
        });
    }

    async sendMailValidateAccount(to: String, subject: String, content: String, hashValidateEmail: String, userId:String){
        if(!hashValidateEmail){
            return false;
        }

        const url = this.configService.get(Configuration.URL_FRONTEND) + 'auth/registro/correo-confirmacion/' + hashValidateEmail + '/' + userId;

        var mailOptions = {
            from: Configuration.GMAIL_ACCOUNT,
            to: to,
            subject: subject,
            text: content
        };
          
        let result: Boolean = true;
        let aux: Number = 0;
        //while(!result || aux < 3){
            const info = await this.transporter.sendMail({
                from: Configuration.GMAIL_ACCOUNT,
                to: to,
                subject: subject,
                text: content
            });

            console.log(info);
        //}
        return result;
    }
}
