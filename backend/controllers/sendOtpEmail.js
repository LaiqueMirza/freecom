import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import dotenv from "dotenv";

dotenv.config({ path: 'config.env' });
const  {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
)
// send mail
const sendOtpEmail = async (userEmail,otpCode) => {
  oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: userEmail,
        subject: `AMRUTTAM TATTVA, RESET PASSWORD`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h3 style="text-align: center; text-transform: uppercase;color: #10BA23;">AMRUTTAM TATTVA</h3>
                <h4>This email is regarding the request of reset password.</h4>
                <h4>Below is the otp code you need to fill.</h4>
                <h2>${otpCode}</h2>
                <p>Thanks for using amruttam tattva</p>
                </div>
        </body>
        </html>
        `
    }

   await smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) {
            console.log(err,"int he if error");
            return err;
            }
            console.log(infor,"in the if infor");
            
        return infor
    })
}

export default sendOtpEmail;