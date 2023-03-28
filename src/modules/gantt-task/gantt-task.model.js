"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ganttTaskSchema = new mongoose_1.Schema({
    id: {
        type: String,
    },
    parentId: {
        type: String,
    },
    progress: {
        type: Number,
    },
    title: {
        type: String,
        required: [true, 'Title Is Required'],
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, 'Project id is required'],
    },
}, { timestamps: true });
const GanttTaskModel = (0, mongoose_1.model)('gantt-task', ganttTaskSchema);
exports.default = GanttTaskModel;
//# sourceMappingURL=gantt-task.model.js.map