"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
    },
}, { timestamps: true });
const CommentModel = (0, mongoose_1.model)('comment', commentSchema);
exports.default = CommentModel;
//# sourceMappingURL=comment.model.js.map