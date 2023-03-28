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
exports.report = exports.remove = exports.updateTask = exports.close = exports.update = exports.findById = exports.current = exports.details = exports.list = exports.create = void 0;
const sprint_model_1 = __importDefault(require("./sprint.model"));
const TaskService = __importStar(require("../task/task.service"));
const functions_1 = require("../../common/utils/functions");
const task_model_1 = __importDefault(require("../task/task.model"));
const create = (projectId, data, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("PROJECT", projectId, data);
    const prevSprint = yield (0, exports.current)(projectId);
    if (prevSprint)
        throw new Error(i18n.t('SprintNotStarted', { name: prevSprint.name }));
    const currentNumber = yield sprint_model_1.default.find({ project: projectId });
    if (!data.name) {
        data.name = `SPRINT-${currentNumber.length}`;
    }
    else {
        data.name = (0, functions_1.Capitalize)(data.name);
    }
    const task = yield task_model_1.default.find({
        $and: [{ project: projectId, current: true, completed: false, done: false }]
    });
    data.task = task;
    return yield sprint_model_1.default.create(Object.assign(Object.assign({}, data), { project: projectId }));
});
exports.create = create;
const list = (project, active) => __awaiter(void 0, void 0, void 0, function* () { return yield sprint_model_1.default.find({ project, active: active }); });
exports.list = list;
const details = (project) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sprint_model_1.default.find({ project, active: false }).populate({
        path: 'task',
        populate: [
            { path: 'assigne', model: 'user', select: 'name username email color' },
            { path: 'reporter', model: 'user', select: 'name username email color' },
            { path: 'epic', model: 'gantt-task', select: 'title' },
            {
                path: 'time_tracking',
                populate: {
                    path: 'user',
                    model: 'user',
                    select: 'name username email color avatar'
                }
            },
        ],
    });
});
exports.details = details;
const current = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sprint_model_1.default.findOne({ project: projectId, active: true }).populate({
        path: 'task',
        populate: [
            { path: 'assigne', model: 'user', select: 'name username email color' },
            { path: 'reporter', model: 'user', select: 'name username email color' },
            { path: 'epic', model: 'gantt-task', select: 'title' },
        ],
    });
});
exports.current = current;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield sprint_model_1.default.findById(id); });
exports.findById = findById;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield sprint_model_1.default.findByIdAndUpdate(id, data);
});
exports.update = update;
const close = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sprint = yield sprint_model_1.default.findById(id);
    if (sprint) {
        const populatedSprint = yield sprint.populate({
            path: 'task',
            model: 'task',
            select: 'current deferred in_progress to_do qa done completed'
        }).execPopulate();
        const task = populatedSprint.task;
        for (const i in task) {
            if ((_a = task[i]) === null || _a === void 0 ? void 0 : _a.done) {
                yield task_model_1.default.findOneAndUpdate({ _id: task[i]._id }, { current: false, completed: true });
            }
        }
    }
    return yield sprint_model_1.default.findByIdAndUpdate(id, { active: false });
});
exports.close = close;
const updateTask = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const sprint = yield (0, exports.findById)(id);
    if (sprint) {
        for (const tsk in data.task) {
            yield TaskService.update(data.task[tsk], { current: true });
            const prevTask = sprint.task.filter((i) => { var _a; return i.toString() == ((_a = data.task) === null || _a === void 0 ? void 0 : _a.toString()); });
            if (prevTask.length <= 0)
                sprint.task = [...sprint.task, data.task[tsk]];
        }
        const updatedSprint = yield sprint.save();
        const populatedSprint = yield updatedSprint
            .populate({
            path: 'task',
            populate: [
                {
                    path: 'assigne',
                    model: 'user',
                    select: 'name username email color',
                },
                {
                    path: 'reporter',
                    model: 'user',
                    select: 'name username email color',
                },
                { path: 'epic', model: 'gantt-task', select: 'title' },
            ],
        })
            .execPopulate();
        return populatedSprint;
    }
});
exports.updateTask = updateTask;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield sprint_model_1.default.findByIdAndDelete(id); });
exports.remove = remove;
const report = (sprintId, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const sprint = yield sprint_model_1.default.findOne({
        _id: sprintId,
        project: projectId,
    }).populate({
        path: 'task',
        select: 'in_progress to_do done title assigne time_tracking',
        populate: [{ path: 'assigne', select: 'username email name' },
            {
                path: 'time_tracking',
                populate: {
                    path: 'user',
                    model: 'user',
                    select: 'name username email color avatar'
                }
            },],
    });
    return sprint;
});
exports.report = report;
//# sourceMappingURL=sprint.service.js.map