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
exports.remove = exports.update = exports.findById = exports.list = exports.create = void 0;
const comment_model_1 = __importDefault(require("./comment.model"));
const create = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_model_1.default.create(data); });
exports.create = create;
const list = () => __awaiter(void 0, void 0, void 0, function* () { return yield comment_model_1.default.find(); });
exports.list = list;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_model_1.default.findById(id); });
exports.findById = findById;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_model_1.default.findByIdAndUpdate(id, data); });
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield comment_model_1.default.findByIdAndDelete(id); });
exports.remove = remove;
//# sourceMappingURL=comment.service.js.map