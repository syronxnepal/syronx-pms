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
exports.choosen = exports.inviteTeam = exports.forgetPassword = exports.forgetChangePassword = exports.changePassword = exports.hashInvitedLogin = exports.hashLogin = exports.login = exports.create = exports.hashPassword = exports.createToken = void 0;
const mailHTML_1 = require("./../../common/constants/mailHTML");
const functions_1 = require("./../../common/utils/functions");
const user_model_1 = __importDefault(require("../user/user.model"));
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const ExternalAccess = __importStar(require("../externalAccess/externalAccess.service"));
const ProjectService = __importStar(require("../project/project.service"));
// @ts-ignore
const random_hex_color_1 = __importDefault(require("random-hex-color"));
const mailer_1 = __importDefault(require("../../common/utils/mailer"));
var saltRounds = 10;
const createToken = (data) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    let token = jwt.sign({ username: data.username, id: data._id, project: data.project }, secret, { expiresIn: process.env.JWT_EXPIRE_DATE });
    return token;
};
exports.createToken = createToken;
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.color = (0, random_hex_color_1.default)();
    user.role = 'manager';
    user.password = (0, exports.hashPassword)(user.password);
    if (user.gender === 'female') {
        user.avatar = `https://avatars.dicebear.com/api/female/${user.username.slice(0, 2) + (0, functions_1.RandomWords)()}.svg`;
    }
    else {
        user.avatar = `https://avatars.dicebear.com/api/male/${user.username.slice(0, 2) + (0, functions_1.RandomWords)()}.svg`;
    }
    user.name = (0, functions_1.Capitalize)(user.name);
    return yield new user_model_1.default(user).save();
});
exports.create = create;
const login = (data, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne({ username: data.username })
        .select('+password')
        .then((user) => {
        if (!user)
            throw new Error(i18n.t('UserNotFound'));
        if (!user.active)
            throw new Error(i18n.t('UserNotRegistered'));
        const result = bcrypt.compareSync(data.password, user.password);
        if (!result)
            throw new Error(i18n.t('InvalidCredentials'));
        let token = (0, exports.createToken)(user);
        return {
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                project: user.project,
                dark_mode: user.dark_mode,
                projects: user.projects
            },
            token,
        };
    });
});
exports.login = login;
const hashLogin = (hash, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    const externalAccess = yield ExternalAccess.findOnlyByHash(hash);
    if (!externalAccess)
        throw new Error(i18n.t('ExternalAccessUnAuthorized'));
    const result = yield user_model_1.default.findOne({ _id: externalAccess.user })
        .select('+password')
        .then((user) => {
        if (!user)
            throw new Error(i18n.t('UserNotFound'));
        let token = (0, exports.createToken)(user);
        return {
            user: {
                username: user.username,
                role: user.role,
                avatar: user.avatar,
                email: user.email,
            },
            token,
        };
    });
    return result;
});
exports.hashLogin = hashLogin;
const AddToProject = (teamMembers, project, user) => __awaiter(void 0, void 0, void 0, function* () {
    const filtered = teamMembers.filter((el) => el.member.toString() === user._id.toString());
    if (filtered.length < 1) {
        project.team = [...project.team, { member: user._id, role: 'member' }];
        yield project.save();
    }
});
const hashInvitedLogin = (data, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    const externalAccess = yield ExternalAccess.findOnlyByHash(data.hash);
    if (!externalAccess)
        throw new Error(i18n.t('ExternalAccessUnAuthorized'));
    const project = yield ProjectService.findById(externalAccess.project);
    if (!project)
        throw new Error(i18n.t('ProjectNotAvailable'));
    const projectLeader = yield user_model_1.default.findById(project.creator);
    if (!projectLeader)
        throw new Error(i18n.t('ProjectLeaderNotAvailable'));
    const user = yield user_model_1.default.findOne({
        email: externalAccess.email,
    });
    const teamMembers = project.team;
    if (!user) {
        const newUser = yield user_model_1.default.create({
            username: externalAccess.email,
            email: externalAccess.email,
            name: externalAccess.email,
            password: (0, exports.hashPassword)('Project123#'),
            project: project._id,
            projects: [project._id],
            color: (0, random_hex_color_1.default)(),
            avatar: `https://avatars.dicebear.com/api/male/${externalAccess.email.slice(0, 2) + (0, functions_1.RandomWords)()}.svg`,
        });
        yield AddToProject(teamMembers, project, newUser);
        let token = (0, exports.createToken)(newUser);
        return {
            user: newUser,
            projectLeader: {
                username: projectLeader.username,
                email: projectLeader.email,
            },
            token,
        };
    }
    else {
        yield AddToProject(teamMembers, project, user);
        const filterProject = user === null || user === void 0 ? void 0 : user.projects.filter((el) => el === project._id);
        let projects;
        if (filterProject.length <= 0) {
            projects = [...user.projects, project._id];
        }
        else {
            projects = [...user.projects];
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(user._id, { project: project._id, projects: projects }, { new: true });
        if (updatedUser) {
            let token = (0, exports.createToken)(updatedUser);
            return {
                user: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    project: updatedUser.project,
                    dark_mode: updatedUser.dark_mode,
                    projects: updatedUser.projects
                },
                project: project._id,
                projectLeader: {
                    username: projectLeader.username,
                    email: projectLeader.email,
                },
                token,
            };
        }
    }
});
exports.hashInvitedLogin = hashInvitedLogin;
const changePassword = (data, userId, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    //Find User According To Object Id
    return yield user_model_1.default.findOne({ _id: userId })
        .select('+password')
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        //If Not User throws Error
        if (!user)
            throw new Error(i18n.t('UserNotFound'));
        //Compare the oldPassword
        const result = bcrypt.compareSync(data.oldPassword, user.password);
        if (!result)
            throw new Error(i18n.t("OldPasswordDoesn'tMatch"));
        //Hash New Password
        user.password = (0, exports.hashPassword)(data.password);
        return yield user.save();
    }));
});
exports.changePassword = changePassword;
const forgetChangePassword = (data, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    //Find User According To Object Id
    return yield user_model_1.default.findOne({ email: data.email })
        .select('+password')
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        //If Not User throws Error
        if (!user)
            throw new Error(i18n.t('UserNotFound'));
        user.password = (0, exports.hashPassword)(data.password);
        return yield user.save();
    }));
});
exports.forgetChangePassword = forgetChangePassword;
const forgetPassword = (data, userId, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    //Find User According To Object Id
    return yield user_model_1.default.findOne({ _id: userId })
        .select('+password')
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        //If Not User throws Error
        if (!user)
            throw new Error(i18n.t('UserNotFound'));
        //Compare the oldPassword
        //Hash New Password
        user.password = (0, exports.hashPassword)(data.password);
        return yield user.save();
    }));
});
exports.forgetPassword = forgetPassword;
const inviteTeam = (data, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = (0, uuid_1.v4)();
    yield ExternalAccess.createInvitedAccess(data.email, hash, 'INVITATION', projectId);
    (0, mailer_1.default)(data.email, 'EMAIL REGISTRATION', (0, mailHTML_1.invitationEmailHtml)(data.email, hash));
});
exports.inviteTeam = inviteTeam;
const choosen = (choosenProjectId, userId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(userId, { project: choosenProjectId }, { new: true });
    let token = (0, exports.createToken)(user);
    return {
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            project: user.project,
            dark_mode: user.dark_mode,
            projects: user.projects
        },
        token,
    };
});
exports.choosen = choosen;
//# sourceMappingURL=auth.service.js.map