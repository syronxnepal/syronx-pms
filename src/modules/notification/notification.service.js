"use strict";
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
exports.remove = exports.list = exports.create = void 0;
const notification_model_1 = __importDefault(require("./notification.model"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield notification_model_1.default.create(data); });
exports.create = create;
const list = (userId, projectId, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield notification_model_1.default.find({
        assignedTo: userId,
        project: projectId,
    });
    const notification = yield notification_model_1.default.find({
        assignedTo: userId,
        project: projectId,
    }).skip(skip).limit(limit).populate([{
            path: 'assignedBy',
            select: 'username name avatar color'
        }, {
            path: 'assignedTo',
            select: 'username name avatar color'
        }, {
            path: 'task',
            select: '_id title key'
        }]).sort({ 'createdAt': -1 });
    return {
        total: total.length, notification
    };
});
exports.list = list;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield notification_model_1.default.findByIdAndDelete(id); });
exports.remove = remove;
//# sourceMappingURL=notification.service.js.map