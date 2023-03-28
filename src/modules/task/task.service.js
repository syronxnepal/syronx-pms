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
exports.updateMass = exports.groupDelete = exports.remove = exports.update = exports.findByIdPopulated = exports.findById = exports.sprintTask = exports.sprintList = exports.backlog = exports.list = exports.initialCreate = exports.create = void 0;
const task_model_1 = __importDefault(require("./task.model"));
const ProjectService = __importStar(require("../project/project.service"));
const notification_model_1 = __importDefault(require("./../notification/notification.model"));
const sprint_model_1 = __importDefault(require("../sprint/sprint.model"));
const functions_1 = require("./../../common/utils/functions");
const mongoose_1 = __importDefault(require("mongoose"));
const create = (data, projectId, userId, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield ProjectService.findById(projectId);
    if (!project)
        throw new Error(i18n.t('SomethingWrongwithproject'));
    const length = yield (yield task_model_1.default.find({ project: projectId })).length;
    return yield task_model_1.default.create(Object.assign(Object.assign({}, data), { key: `${project.shortName}-${length}`, title: (0, functions_1.Capitalize)(data.title), project: projectId, reporter: userId }));
});
exports.create = create;
const initialCreate = (data, projectId, userId, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const project = yield ProjectService.findById(projectId);
    if (!project)
        throw new Error(i18n.t('SomethingWrongwithproject'));
    for (const i in data) {
        const tasks = yield task_model_1.default.find({ project: projectId });
        const length = tasks.length;
        yield task_model_1.default.create({
            key: `${project.shortName}-${length}`,
            title: (0, functions_1.Capitalize)((_a = data[i]) === null || _a === void 0 ? void 0 : _a.title),
            project: projectId,
            reporter: userId,
        });
    }
});
exports.initialCreate = initialCreate;
const countDocument = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.estimatedDocumentCount(condition);
});
const findCondition = (condition, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.find(condition).skip(skip).limit(limit).populate([
        { path: 'assigne', model: 'user', select: 'name username email color' },
        { path: 'reporter', model: 'user', select: 'name username email color' },
        { path: 'epic', model: 'gantt-task', select: 'title' },
    ]);
});
const AggrigateListing = (condition, limit, skip) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield task_model_1.default.aggregate([{
                $facet: {
                    rows: [
                        { $match: condition },
                        { $sort: { _id: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $lookup: {
                                from: "users",
                                localField: "assigne",
                                foreignField: "_id",
                                as: "assigne_info"
                            }
                        },
                        {
                            $unwind: "$assigne_info"
                        },
                        // {
                        // 	$lookup: {
                        // 		from: "users",
                        // 		localField: "reporter",
                        // 		foreignField: "_id",
                        // 		as: "reporter_info"
                        // 	}
                        // },
                        // {
                        // 	$unwind: "$reporter_info"
                        // }
                    ],
                    total: [{ $match: condition }, { $count: 'totalCount' }]
                }
            }]).then(([{ rows, total }]) => {
            let totalCount;
            total.length > 0 ? totalCount = total[0].totalCount : totalCount = 0;
            return resolve({ totalCount, data: rows });
        }).catch((e) => {
            reject({ msg: "Error Label" });
        });
    }));
};
const list = (query, user, projectId, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    if (query === 'my') {
        const condition = { assigne: mongoose_1.default.Types.ObjectId(user), project: mongoose_1.default.Types.ObjectId(projectId) };
        return yield AggrigateListing(condition, limit, skip).then(({ totalCount, data }) => { return { totalCount, data }; });
    }
    else if (query === 'reported') {
        const condition = { reporter: mongoose_1.default.Types.ObjectId(user), project: mongoose_1.default.Types.ObjectId(projectId) };
        return yield AggrigateListing(condition, limit, skip).then(({ totalCount, data }) => { return { totalCount, data }; });
    }
    else if (query === 'open') {
        const condition = {
            $or: [{ in_progress: true }, { to_do: true }],
            project: mongoose_1.default.Types.ObjectId(projectId),
        };
        return yield AggrigateListing(condition, limit, skip).then(({ totalCount, data }) => { return { totalCount, data }; });
    }
    else if (query === 'done') {
        const condition = { done: true, project: mongoose_1.default.Types.ObjectId(projectId) };
        return yield AggrigateListing(condition, limit, skip).then(({ totalCount, data }) => { return { totalCount, data }; });
    }
    else {
        const condition = { project: mongoose_1.default.Types.ObjectId(projectId) };
        return yield AggrigateListing(condition, limit, skip).then(({ totalCount, data }) => { return { totalCount, data }; });
    }
});
exports.list = list;
const backlog = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    return task_model_1.default.find({ project: projectId, done: false, current: false, completed: false })
        .sort({ date: -1 })
        .populate([
        { path: 'assigne', model: 'user', select: 'name username email color' },
        { path: 'reporter', model: 'user', select: 'name username email color' },
        { path: 'epic', model: 'gantt-task', select: 'title' },
    ]);
});
exports.backlog = backlog;
const sprintList = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    return task_model_1.default.find({ project: projectId, done: false, current: true })
        .sort({ date: 1 })
        .populate([
        { path: 'assigne', model: 'user', select: 'name username email color' },
        { path: 'reporter', model: 'user', select: 'name username email color' },
        { path: 'epic', model: 'gantt-task', select: 'title' },
    ]);
});
exports.sprintList = sprintList;
const sprintTask = (userId, projectId, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    const sprint = yield sprint_model_1.default.findOne({ active: true });
    if (sprint) {
        return yield task_model_1.default.find({
            assigne: userId,
            project: projectId,
            current: true,
        }).populate([
            { path: 'assigne', model: 'user', select: 'name username email color' },
            { path: 'reporter', model: 'user', select: 'name username email color' },
            { path: 'epic', model: 'gantt-task', select: 'title' },
        ]);
    }
    else {
        throw new Error(i18n.t('SprintisnotStarted'));
    }
});
exports.sprintTask = sprintTask;
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield task_model_1.default.findById(id); });
exports.findById = findById;
const findByIdPopulated = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_model_1.default.findById(id).populate([
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
    ]);
});
exports.findByIdPopulated = findByIdPopulated;
const update = (id, data, i18n) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield (0, exports.findById)(id);
    if (!task)
        throw new Error(i18n.t('TaskNotFound'));
    if (data.title)
        task.title = (0, functions_1.Capitalize)(data.title);
    if (data.comment)
        task.comment = data.comment;
    if (data.assigne)
        task.assigne = data.assigne;
    if (data.reporter)
        task.reporter = data.reporter;
    if (data.estimate)
        task.estimate = data.estimate;
    if (data.type)
        task.type = data.type;
    if (data.summary)
        task.summary = data.summary;
    if (data.priority)
        task.priority = data.priority;
    if (data.sprint)
        task.sprint = data.sprint;
    if (data.current !== undefined)
        task.current = data.current;
    if (data.epic)
        task.epic = data.epic;
    if (data.in_progress !== undefined)
        task.in_progress = data.in_progress;
    if (data.to_do !== undefined)
        task.to_do = data.to_do;
    if (data.done !== undefined)
        task.done = data.done;
    if (data.qa !== undefined)
        task.qa = data.qa;
    if (data.deferred !== undefined)
        task.deferred = data.deferred;
    if (data.project)
        task.project = data.project;
    if (data.time_tracking) {
        task.time_tracking.push(data.time_tracking);
    }
    const newData = yield task.save();
    return yield newData
        .populate([
        { path: 'assigne', select: 'name username email color' },
        { path: 'reporter', select: 'name username email color' },
        { path: 'epic', model: 'gantt-task', select: 'title' },
        {
            path: 'time_tracking',
            populate: {
                path: 'user',
                model: 'user',
                select: 'name username email color avatar'
            }
        },
    ])
        .execPopulate();
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield notification_model_1.default.findOneAndRemove({ task: id });
    return yield task_model_1.default.findByIdAndDelete(id);
});
exports.remove = remove;
const groupDelete = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (const id in data)
        yield task_model_1.default.findByIdAndDelete(data[id]);
});
exports.groupDelete = groupDelete;
const updateMass = (taskIds) => __awaiter(void 0, void 0, void 0, function* () {
    for (const id in taskIds)
        yield task_model_1.default.findByIdAndUpdate(taskIds[id], { current: true });
});
exports.updateMass = updateMass;
//# sourceMappingURL=task.service.js.map