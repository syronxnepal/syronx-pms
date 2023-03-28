"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExternalAccessSchema = new mongoose_1.Schema({
    hash: { type: String },
    type: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'project'
    },
    email: {
        type: String
    },
    active: { type: Boolean, default: true }
}, { timestamps: true });
const ExternalAccessModel = (0, mongoose_1.model)('externalAccess', ExternalAccessSchema);
exports.default = ExternalAccessModel;
//# sourceMappingURL=externalAccess.model.js.map