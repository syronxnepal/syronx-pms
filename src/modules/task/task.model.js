"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    key: {
        type: String,
        required: [true, 'Key is required'],
    },
    comment: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'comment',
        },
    ],
    assigne: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    reporter: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Reporter id is required'],
    },
    estimate: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Task', 'Bug'],
        default: 'Task',
    },
    summary: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
        default: 'Medium',
    },
    time_tracking: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user',
            },
            sprint: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'sprint',
            },
            time: {
                type: String
            }
        }
    ],
    sprint: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'sprint',
    },
    current: {
        type: Boolean,
        default: false,
    },
    epic: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'epic',
    },
    deferred: {
        type: Boolean,
        default: false,
    },
    in_progress: {
        type: Boolean,
        default: false,
    },
    to_do: {
        type: Boolean,
        default: true,
    },
    qa: {
        type: Boolean,
        default: false,
    },
    done: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, 'Project id is required'],
    },
});
const TaskModel = (0, mongoose_1.model)('task', taskSchema);
exports.default = TaskModel;
//# sourceMappingURL=task.model.js.map