"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./auth.middleware");
const controller = __importStar(require("./auth.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/checkToken').get(controller.checkToken);
router.route('/register').post(controller.register);
router.route('/login').post(controller.login);
router.route('/hashLogin').post(controller.hashLogin);
router.route('/hashInvitedLogin').post(controller.hashInvitedLogin);
router.route('/invite').post(auth_middleware_1.authenticateToken, controller.inviteTeam);
router
    .route('/changePassword')
    .post(auth_middleware_1.authenticateToken, controller.changePassword);
router
    .route('/forget/changePassword')
    .post(controller.forgetChangePassword);
router.route('/forgetPassword').post(controller.forgetPassword);
router.route('/resendLink').post(controller.resendLink);
router.route('/:id/choosen').get(auth_middleware_1.authenticateToken, controller.choosen);
module.exports = router;
//# sourceMappingURL=auth.router.js.map