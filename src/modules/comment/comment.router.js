"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const router = (0, express_1.Router)();
router.route('/create').post(comment_controller_1.create);
router.route('/list').get(comment_controller_1.list);
router.route('/:id').get(comment_controller_1.findById);
router.route('/:id/update').put(comment_controller_1.update);
router.route('/:id/delete').delete(comment_controller_1.remove);
module.exports = router;
//# sourceMappingURL=comment.router.js.map