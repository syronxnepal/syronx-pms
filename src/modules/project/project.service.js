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
exports.updateRole = exports.getTeam = exports.remove = exports.update = exports.findById = exports.get = exports.list = exports.create = void 0;
const functions_1 = require("../../common/utils/functions");
const project_model_1 = __importDefault(require("./project.model"));
const create = (data, userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const shortName = (0, functions_1.getFirstWord)(data.name);
    const image = `https://avatars.dicebear.com/api/jdenticon/${shortName}.svg`;
    if (data.name)
        data.name = (0, functions_1.Capitalize)(data.name);
    const project = yield project_model_1.default.create(Object.assign(Object.assign({}, data), { creator: userId, shortName,
        image, team: [{ member: userId, role: 'manager' }] }));
    const populatedProject = yield project
        .populate({
        path: 'creator',
        select: 'username',
    })
        .execPopulate();
    user.project = project.id;
    user.projects.push(project._id);
    yield user.save();
    return populatedProject;
});
exports.create = create;
const list = () => __awaiter(void 0, void 0, void 0, function* () { return yield project_model_1.default.find(); });
exports.list = list;
const get = (userId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.findOne({
        team: { $elemMatch: { member: userId } },
        _id: projectId
    }).populate([
        { path: 'creator', select: 'username' },
        {
            path: 'team.member',
            select: 'username email name address phone_number avatar',
        },
    ]);
});
exports.get = get;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_model_1.default.findById(id).populate([
        { path: 'creator', select: 'username' },
        {
            path: 'team.member',
            select: 'username email name address phone_number avatar',
        },
    ]);
});
exports.findById = findById;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.name)
        data.name = (0, functions_1.Capitalize)(data.name);
    return yield project_model_1.default.findByIdAndUpdate(id, data);
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield project_model_1.default.findByIdAndDelete(id); });
exports.remove = remove;
const getTeam = (userId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield (0, exports.get)(userId, projectId);
    if (project) {
        const populatedProject = yield project
            .populate({
            path: 'team.member',
            select: 'username email name address phone_number avatar',
        })
            .execPopulate();
        return populatedProject.team;
    }
});
exports.getTeam = getTeam;
const updateRole = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield (0, exports.findById)(id);
    for (const role in project.team) {
        const { _id, member } = project.team[role];
        if (data._id == _id && data.member == member._id)
            project.team[role] = data;
    }
    return yield project.save();
});
exports.updateRole = updateRole;
//# sourceMappingURL=project.service.js.map