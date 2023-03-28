"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Story Name Is Required']
    }
}, { timestamps: true });
const StoryModel = (0, mongoose_1.model)('story', storySchema);
exports.default = StoryModel;
//# sourceMappingURL=story.model.js.map