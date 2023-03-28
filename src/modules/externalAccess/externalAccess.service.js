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
exports.invalidPreviousLink = exports.createInvitedAccess = exports.create = exports.DisableExternalAccess = exports.verify = exports.updateExternalAccess = exports.findHashByUserId = exports.findOnlyByHash = exports.findByHash = void 0;
const externalAccess_model_1 = __importDefault(require("./externalAccess.model"));
const UserService = __importStar(require("../user/user.service"));
const findByHash = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield externalAccess_model_1.default.findOne({ hash: hash, active: true });
});
exports.findByHash = findByHash;
const findOnlyByHash = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield externalAccess_model_1.default.findOne({ hash: hash });
});
exports.findOnlyByHash = findOnlyByHash;
const findHashByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield externalAccess_model_1.default.findOne({ user: userId, active: true });
});
exports.findHashByUserId = findHashByUserId;
const updateExternalAccess = (hash, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield externalAccess_model_1.default.findOneAndUpdate({ hash }, data);
});
exports.updateExternalAccess = updateExternalAccess;
const verify = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    const externalAccess = yield (0, exports.findByHash)(hash);
    if (!externalAccess)
        throw new Error('Invalid Link');
    yield externalAccess.updateOne({ active: false });
    yield UserService.activate(externalAccess.user);
    return externalAccess;
});
exports.verify = verify;
const DisableExternalAccess = (hash) => __awaiter(void 0, void 0, void 0, function* () {
    const externalAccess = yield (0, exports.findByHash)(hash);
    if (!externalAccess)
        throw new Error('Invalid Link');
    yield externalAccess.updateOne({ active: false });
});
exports.DisableExternalAccess = DisableExternalAccess;
const create = (userID, hash, type) => __awaiter(void 0, void 0, void 0, function* () {
    yield new externalAccess_model_1.default({ user: userID, hash: hash, type: type }).save();
});
exports.create = create;
const createInvitedAccess = (email, hash, type, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    yield new externalAccess_model_1.default({ email: email, hash: hash, type: type, project: projectId }).save();
});
exports.createInvitedAccess = createInvitedAccess;
const invalidPreviousLink = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const externalAccess = yield externalAccess_model_1.default.find({ user: userID });
    if (externalAccess) {
        externalAccess.forEach((access) => __awaiter(void 0, void 0, void 0, function* () {
            yield access.updateOne({ active: false });
        }));
    }
    return externalAccess[0];
});
exports.invalidPreviousLink = invalidPreviousLink;
//# sourceMappingURL=externalAccess.service.js.map