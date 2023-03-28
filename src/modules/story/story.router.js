"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controller_1 = require("./story.controller");
const router = (0, express_1.Router)();
router.route('/create').post(story_controller_1.create);
router.route('/list').get(story_controller_1.list);
router.route('/:id').get(story_controller_1.findById);
router.route('/:id/update').put(story_controller_1.update);
router.route('/:id/delete').delete(story_controller_1.remove);
module.exports = router;
//# sourceMappingURL=story.router.js.map