import SMTPTransport from "nodemailer/lib/smtp-transport";

const nodemailer = require('nodemailer');

export const sendMail = async (subject: string, text: string) => {
    const transporterString = process.env.EMAIL_TRANSPORTER
    const mailOptionsString = process.env.EMAIL_OPTIONS

    if (!transporterString || !mailOptionsString) {
        console.log('Email not sent: transporter or mail options not found');
        return;
    }

    const transporterObject = JSON.parse(transporterString);
    const mailOptionsObject = JSON.parse(mailOptionsString);

    if (transporterObject?.host === undefined || transporterObject?.port === undefined || transporterObject?.secure === undefined || transporterObject?.auth?.user === undefined || transporterObject?.auth?.pass === undefined) {
        console.log('Email not sent: bad transporter object');
        return;
    }

    if (mailOptionsObject?.from === undefined || mailOptionsObject?.to === undefined) {
        console.log('Email not sent: bad mail options object');
        return;
    }

    let transporter = nodemailer.createTransport(transporterObject);

    let mailOptions = {
        from: mailOptionsObject.from,
        to: mailOptionsObject.to,
        subject: subject,
        text: text,
        html: "<p>" + text + "</p>"
    };

    transporter.sendMail(mailOptions)
        .then((info:SMTPTransport.SentMessageInfo) => {
            console.log('Email sent: ' + info.response);
        })
        .catch((err: any) => {
            console.log(err);
        })
};
