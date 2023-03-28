"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../auth/auth.middleware");
const express_1 = require("express");
const sprint_controller_1 = require("./sprint.controller");
const router = (0, express_1.Router)();
router.route('/create').post(auth_middleware_1.authenticateToken, sprint_controller_1.create);
router.route('/list').get(auth_middleware_1.authenticateToken, sprint_controller_1.list);
router.route('/details').get(auth_middleware_1.authenticateToken, sprint_controller_1.details);
router.route('/current').get(auth_middleware_1.authenticateToken, sprint_controller_1.current);
router.route('/:id/report').get(auth_middleware_1.authenticateToken, sprint_controller_1.report);
router.route('/:id').get(auth_middleware_1.authenticateToken, sprint_controller_1.findById);
router.route('/:id/update').put(auth_middleware_1.authenticateToken, sprint_controller_1.update);
router.route('/:id/updateTask').put(auth_middleware_1.authenticateToken, sprint_controller_1.updateTask);
router.route('/:id/delete').delete(auth_middleware_1.authenticateToken, sprint_controller_1.remove);
router.route('/:id/close').delete(auth_middleware_1.authenticateToken, sprint_controller_1.close);
module.exports = router;
//# sourceMappingURL=sprint.router.js.map