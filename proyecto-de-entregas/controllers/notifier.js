import nodemailer from 'nodemailer';
import twilio from 'twilio';

import {
    EMAIL_SERVER_LOG_USERNAME,
    EMAIL_SERVER_LOG_PASSWORD,
    EMAIL_SERVER_INFO_TYPE,
    EMAIL_SERVER_INFO_USERNAME,
    EMAIL_SERVER_INFO_PASSWORD,
    EMAIL_ADMIN_USERNAME,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_SMS_NUMBER,
    SMS_ADMIN_NUMBER,
} from '../settings.js';

class NotifierController {

    constructor() {
        this.emailLog = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: EMAIL_SERVER_LOG_USERNAME,
                pass: EMAIL_SERVER_LOG_PASSWORD
            }
        });
        this.emailInfo = nodemailer.createTransport({
            service: EMAIL_SERVER_INFO_TYPE,
            auth: {
                user: EMAIL_SERVER_INFO_USERNAME,
                pass: EMAIL_SERVER_INFO_PASSWORD
            }
        });
        this.smsInfo = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    }

    // Methods

    async loginNotify(user) {
        this.emailLog.sendMail({
            from: 'Servidor Node JS',
            to: EMAIL_ADMIN_USERNAME,
            subject: 'login',
            html: `usuario: '${user.displayName}' hora: ${new Date()}`
        })

        if (user.emails && user.emails.length > 0) {
            const email = user.emails[0].value;
            const photo = user.photos.length > 0 ? user.photos[0].value : '';

            this.emailInfo.sendMail({
                from: 'Servidor Node JS',
                to: email,
                subject: 'login en bla bla bla',
                html: `<img src="${photo}" />`
            })
        }
    }

    async logoutNotify(user) {
        this.emailLog.sendMail({
            from: 'Servidor Node JS',
            to: EMAIL_ADMIN_USERNAME,
            subject: 'logout',
            html: `usuario: '${user.displayName}' hora: ${new Date()}`
        })

        if (user.emails && user.emails.length > 0) {
            const email = user.emails[0].value;
            const photo = user.photos.length > 0 ? user.photos[0].value : '';

            this.emailInfo.sendMail({
                from: 'Servidor Node JS',
                to: email,
                subject: 'logout en bla bla bla',
                html: `<img src="${photo}" />`
            })
        }
    }

    async adminMessageNotify(message) {
        this.smsInfo.messages.create({
            to: SMS_ADMIN_NUMBER,
            from: TWILIO_SMS_NUMBER,
            body: JSON.stringify({ txt: message.text, by: message.author.nick || 'undefined' })
        })
    }
}

export default NotifierController;