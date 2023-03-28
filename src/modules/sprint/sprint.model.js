"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sprintSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Name'],
        trim: true,
        maxLength: [100, 'Name Cannot Exceed 100 Character'],
    },
    starting_date: {
        type: String,
    },
    closing_date: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    },
    closed_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    task: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'task'
        }],
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, 'Project Id Required'],
    }
}, { timestamps: true });
const SprintModel = (0, mongoose_1.model)('sprint', sprintSchema);
exports.default = SprintModel;
//# sourceMappingURL=sprint.model.js.map