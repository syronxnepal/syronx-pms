"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordHTML = exports.invitationEmailHtml = exports.registrationEmailHtml = void 0;
const defaultMail = (name, message, subMessage, action, btn, type) => {
    return `
    <div style='text-align:center'>
        <h3>${type}</h3>
        <div style="border:1px solid #c4c4c4; text-align:center;padding:20px;margin:10px;margin-top:30px;border-radius:5px">
            <span>Welcome,</span>
            <h1 style="color: #000000;margin:0px;margin-bottom:20px;">${name}</h1>
            <form method="post" target="_blank" action="${action}">
                <p style="font-size: 16px;font-weight:bold;">
                ${message}
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
                font-weight:bold;">
                ${btn}
                </button>
            </form>
            ${subMessage && (`<p>${subMessage} </p>`)}
            <hr />
            <p style = "color: #000000;text-align:center" > <em><a href="https://team-zone-pms.herokuapp.com"> Project Management System</a></em> </p>
        </div>
    </div>
    `;
};
const registrationEmailHtml = (name, hash) => {
    const action = `${process.env.SERVER_HOST}/api/externalAccess/verify/${hash}`;
    const type = 'Registration Email';
    const message = "We're excited to have yo get started.Please verify your account.Just press the button to confirm";
    const subMessage = "If that doesn't work,you need to resend the email form the application.";
    const btn = 'Click to Access';
    return defaultMail(name, message, subMessage, action, btn, type);
};
exports.registrationEmailHtml = registrationEmailHtml;
const invitationEmailHtml = (name, hash) => {
    const action = `${process.env.SERVER_HOST}/api/externalAccess/verify/${hash}`;
    const type = "Invitation Email";
    const message = "We're excited to have yo get started.Please verify your account.Just press the button to confirm";
    const subMessage = "If that doesn't work,you need to resend the email form the application.";
    const btn = 'Click to Access';
    return defaultMail(name, message, subMessage, action, btn, type);
};
exports.invitationEmailHtml = invitationEmailHtml;
const forgetPasswordHTML = (name, hash) => {
    const action = `${process.env.SERVER_HOST}/api/externalAccess/verify/${hash}`;
    const type = "Forget Password";
    const message = "No Worries about forgetting password.You can change to new.Just need to press this verification button";
    const subMessage = "If that doesn't work,you need to resend the email form the application.";
    const btn = 'Click to Access';
    return defaultMail(name, message, subMessage, action, btn, type);
};
exports.forgetPasswordHTML = forgetPasswordHTML;
//# sourceMappingURL=mailHTML.js.map