"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Project Name'],
    },
    shortName: {
        type: String,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
    working_days: [
        {
            type: String,
        },
    ],
    team: [
        {
            member: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user',
            },
            working_hours: {
                type: String
            },
            role: {
                type: String,
                enum: [
                    'management',
                    'developer',
                    'manager',
                    'analyst',
                    'tester',
                    'trainer',
                    'member',
                    'deployment_team',
                ],
                default: 'member',
            },
        },
    ],
}, { timestamps: true });
const ProjectModel = (0, mongoose_1.model)('project', projectSchema);
exports.default = ProjectModel;
//# sourceMappingURL=project.model.js.map