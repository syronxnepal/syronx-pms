"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordHTML = exports.invitationEmailHtml = exports.registrationEmailHtml = void 0;
const { SERVER_HOST, SERVER_PORT } = process.env;
const registrationEmailHtml = (name, hash) => {
    return `
            <b>Hi ${name}</b>,
                </br>
                <p>
                    Thank you for registering .
                </p>
            <form method="post" target="_blank" action="${SERVER_HOST}:${SERVER_PORT}/api/externalAccess/verify/${hash}">
                <p style="font-size: 16px;font-weight:bold;">
                    Please verify your email
                </p>
                <button
                    type="submit"
                    style="
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight:bold;
                ">
                    Click to Access
                </button>
            </form>
    `;
};
exports.registrationEmailHtml = registrationEmailHtml;
const invitationEmailHtml = (name, hash) => {
    return `
            <b>Hi ${name}</b>,
                </br>
                <p>
                   You are invited in the Project.
                </p>
            <form method="post" target="_blank" action="${SERVER_HOST}:${SERVER_PORT}/api/externalAccess/verify/${hash}">
                <p style="font-size: 16px;font-weight:bold;">
                    Please verify your email
                </p>
                <button
                    type="submit"
                    style="
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight:bold;
                ">
                    Click to Access
                </button>
            </form>
    `;
};
exports.invitationEmailHtml = invitationEmailHtml;
const forgetPasswordHTML = (name, hash) => {
    return `
            <b>Hi ${name}</b>,
                </br>
                <p>
                    Click Here to Reset Your Password
                </p>
            <form method="post" target="_blank" action="${SERVER_HOST}:${SERVER_PORT}/api/externalAccess/${hash}/changePassword">
                <p style="font-size: 16px;font-weight:bold;">
                    Please verify your email
                </p>
                <button
                    type="submit"
                    style="
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        cursor: pointer;
                        font-size: 16px;
                        font-weight:bold;
                ">
                    Click to Access
                </button>
            </form>
    `;
};
exports.forgetPasswordHTML = forgetPasswordHTML;
//# sourceMappingURL=mailHTML%20copy.js.map