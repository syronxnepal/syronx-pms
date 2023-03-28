"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../auth/auth.middleware");
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const router = (0, express_1.Router)();
router.route('/create').post(auth_middleware_1.authenticateToken, task_controller_1.create);
router.route('/initial-create').post(auth_middleware_1.authenticateToken, task_controller_1.initialCreate);
router.route('/list').get(auth_middleware_1.authenticateToken, task_controller_1.list);
//Inspect Working Process, if not used Remove route
router.route('/sprintList').get(auth_middleware_1.authenticateToken, task_controller_1.sprintList);
//
router.route('/sprintTask').get(auth_middleware_1.authenticateToken, task_controller_1.sprintTask);
router.route('/backlog').get(auth_middleware_1.authenticateToken, task_controller_1.backlog);
router.route('/mass/update').put(task_controller_1.updateMass);
router.route('/groupDelete').post(task_controller_1.groupDelete);
router.route('/:id').get(task_controller_1.findById);
router.route('/:id/update').put(task_controller_1.update);
router.route('/:id/delete').delete(task_controller_1.remove);
module.exports = router;
//# sourceMappingURL=task.router.js.map