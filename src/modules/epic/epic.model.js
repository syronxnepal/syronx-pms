"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EpicSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    task: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'task'
        }]
}, { timestamps: true });
const EpicModel = (0, mongoose_1.model)('epic', EpicSchema);
exports.default = EpicModel;
//# sourceMappingURL=epic.model.js.map