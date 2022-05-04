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
const sendEmailOnOrderCreation = async (userEmail,userName,productName,selectedSize,quantity,price,totalAmount,deliveryAddress,orderId,onlinePayment_Id) => {
      const listHtml = productName.map((item, index) => {
                        return (`<li>${productName[index]} - size - ${selectedSize[index]} - quantity - ${quantity[index]} - per piece price - ${price[index]} ₹</li>`)
                    }).join('');
    const paymentStatus= onlinePayment_Id ? "Your payment is done online" : "You have to pay the cash, on delivery";
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
        subject: `HI ${userName} YOUR AMRUTTAM TATTVA ORDER`,
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
                <h2 style="text-align: center; text-transform: uppercase;color: #10BA23;">AMRUTTAM TATTVA</h2>
                <h3>Hello ${userName}</h3>
                <p>Your order has been placed and would soon reach to you.</p>
                <h4>Following are your orders</h4>
                <ul id="listcontent">
                ${listHtml}
                </ul>
                <h4>Total Amount: ${totalAmount} ₹</h4>
                <h4>${paymentStatus}</h4>
                <h4>The item will be deilvered to :</h4>
                <p>${deliveryAddress.addressLine1}</p>
                <p>${deliveryAddress.addressLine2}</p>
                <p>${deliveryAddress.pinCode}</p>
                <h4>Your order id is : ${orderId}</h4>
                <p>Thanks a lot for ordering from amruttam tattva</p>
                </div>
        </body>
        </html>
        `
    }

   await smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) {
            return err;
            }
            
        return infor
    })
}

export default sendEmailOnOrderCreation;