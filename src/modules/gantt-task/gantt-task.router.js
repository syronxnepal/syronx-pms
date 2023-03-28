"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gantt_task_controller_1 = require("./gantt-task.controller");
const auth_middleware_1 = require("./../auth/auth.middleware");
const router = (0, express_1.Router)();
router.route('/create').post(auth_middleware_1.authenticateToken, gantt_task_controller_1.create);
router.route('/d/create').post(auth_middleware_1.authenticateToken, gantt_task_controller_1.dCreate);
router.route('/list').get(auth_middleware_1.authenticateToken, gantt_task_controller_1.list);
router.route('/d/list').get(auth_middleware_1.authenticateToken, gantt_task_controller_1.dList);
router.route('/:id/update').put(auth_middleware_1.authenticateToken, gantt_task_controller_1.update);
router.route('/:id/delete').delete(auth_middleware_1.authenticateToken, gantt_task_controller_1.remove);
router.route('/:id/d/delete').delete(auth_middleware_1.authenticateToken, gantt_task_controller_1.dRemove);
module.exports = router;
//# sourceMappingURL=gantt-task.router.js.map