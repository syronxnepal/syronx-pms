"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const epic_controller_1 = require("./epic.controller");
const router = (0, express_1.Router)();
router.route('/create').post(epic_controller_1.create);
router.route('/list').get(epic_controller_1.list);
router.route('/:id').get(epic_controller_1.findById);
router.route('/:id/update').put(epic_controller_1.update);
router.route('/:id/delete').delete(epic_controller_1.remove);
module.exports = router;
//# sourceMappingURL=epic.router.js.map