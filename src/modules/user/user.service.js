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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistingEmailOrUsername = exports.activate = exports.remove = exports.updateByUserName = exports.update = exports.findByUsername = exports.findByEmail = exports.findById = exports.list = exports.inviteTeam = exports.create = void 0;
const functions_1 = require("./../../common/utils/functions");
const auth_service_1 = require("./../auth/auth.service");
const user_model_1 = __importDefault(require("./user.model"));
const uuid_1 = require("uuid");
const ExternalAccessService = __importStar(require("../externalAccess/externalAccess.service"));
const mailer_1 = __importDefault(require("../../common/utils/mailer"));
const mailHTML_1 = require("./../../common/constants/mailHTML");
// @ts-ignore
const random_hex_color_1 = __importDefault(require("random-hex-color"));
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.color = (0, random_hex_color_1.default)();
    if (user.gender) {
        if (user.gender === 'female') {
            user.avatar = `https://avatars.dicebear.com/api/female/${user.username.slice(0, 2) + (0, functions_1.RandomWords)()}.svg`;
        }
        else {
            user.avatar = `https://avatars.dicebear.com/api/male/${user.username.slice(0, 2) + (0, functions_1.RandomWords)()}.svg`;
        }
    }
    user.name = (0, functions_1.Capitalize)(user.name);
    user.password = (0, auth_service_1.hashPassword)(user.password);
    return yield user_model_1.default.create(user);
});
exports.create = create;
const inviteTeam = (data, projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < data.length; i++) {
        const hash = (0, uuid_1.v4)();
        yield ExternalAccessService.createInvitedAccess(data[i].email, hash, 'INVITATION', projectId);
        (0, mailer_1.default)(data[i].email, 'EMAIL REGISTRATION', (0, mailHTML_1.invitationEmailHtml)(data[i].email, hash));
    }
});
exports.inviteTeam = inviteTeam;
const list = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.find(); });
exports.list = list;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findById(id); });
exports.findById = findById;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findOne({ email: email }); });
exports.findByEmail = findByEmail;
const findByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield user_model_1.default.findOne({ username: username });
    if (project) {
        const populatedProject = yield project.populate({
            path: 'projects',
            select: '_id name creator shortName image',
            populate: {
                path: 'creator',
                select: '_id username name'
            }
        }).execPopulate();
        return populatedProject;
    }
});
exports.findByUsername = findByUsername;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.name)
        data.name = (0, functions_1.Capitalize)(data.name);
    if (data.gender) {
        if (data.gender === 'female') {
            data.avatar = `https://avatars.dicebear.com/api/female/${(0, functions_1.RandomWords)()}.svg`;
        }
        else {
            data.avatar = `https://avatars.dicebear.com/api/male/${(0, functions_1.RandomWords)()}.svg`;
        }
    }
    return yield user_model_1.default.findByIdAndUpdate(id, data);
});
exports.update = update;
const updateByUserName = (username, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password)
        data.password = (0, auth_service_1.hashPassword)(data.password);
    if (data.name)
        data.name = (0, functions_1.Capitalize)(data.name);
    if (data.gender) {
        if (data.gender === 'female') {
            data.avatar = `https://avatars.dicebear.com/api/female/${(0, functions_1.RandomWords)()}.svg`;
        }
        else {
            data.avatar = `https://avatars.dicebear.com/api/male/${(0, functions_1.RandomWords)()}.svg`;
        }
    }
    return yield user_model_1.default.findOneAndUpdate({ username: username }, data, {
        new: true,
    });
});
exports.updateByUserName = updateByUserName;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findByIdAndDelete(id); });
exports.remove = remove;
const activate = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.updateOne({ _id: userId }, { $set: { active: true } });
});
exports.activate = activate;
const checkExistingEmailOrUsername = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({
        $or: [{ username: username }, { email: email }],
    });
});
exports.checkExistingEmailOrUsername = checkExistingEmailOrUsername;
//# sourceMappingURL=user.service.js.map