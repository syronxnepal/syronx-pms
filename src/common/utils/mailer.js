"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, subject, html) => {
    subject = `${subject}`;
    let data = {
        from: process.env.MAIL_FROM,
        to,
        subject,
        html
    };
    const transport = nodemailer_1.default.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
        debug: true,
        logger: true
    });
    transport.sendMail(data, function (error, info) {
        if (error) {
            console.log("ERROR", error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.default = sendEmail;
//# sourceMappingURL=mailer.js.map