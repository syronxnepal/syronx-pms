"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        required: [true, 'Please Enter Your Username'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        sparse: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        select: false,
    },
    address: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    language: {
        type: String,
        default: 'en',
    },
    color: {
        type: String,
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
    },
    projects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'project',
        },
    ],
    active: {
        type: Boolean,
        default: false,
    },
    invited: {
        type: Boolean,
        default: false,
    },
    dark_mode: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: [
            'management',
            'developer',
            'manager',
            'analyst',
            'testers',
            'trainers',
            'member',
            'deployment_team',
        ],
        default: 'member',
    },
}, { timestamps: true });
const userModel = (0, mongoose_1.model)('user', userSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map