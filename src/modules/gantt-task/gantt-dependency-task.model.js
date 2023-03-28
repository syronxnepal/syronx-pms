"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dependenciesSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    predecessorId: {
        type: String,
    },
    successorId: {
        type: String,
    },
    type: {
        type: Number,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, 'Project id is required'],
    },
}, { timestamps: true });
const DependenciesTask = (0, mongoose_1.model)('dependent-task', dependenciesSchema);
exports.default = DependenciesTask;
//# sourceMappingURL=gantt-dependency-task.model.js.map