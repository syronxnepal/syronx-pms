"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false
    },
    clicked: {
        type: Boolean,
        default: false
    },
    assignedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, 'Project id is required'],
    },
    task: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'task',
    },
}, { timestamps: true });
const NotificationModel = (0, mongoose_1.model)('notification', notificationSchema);
exports.default = NotificationModel;
//# sourceMappingURL=notification.model.js.map