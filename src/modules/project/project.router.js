"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("./../auth/auth.middleware");
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const router = (0, express_1.Router)();
router.route('/create').post(auth_middleware_1.authenticateToken, project_controller_1.create);
router.route('/list').get(project_controller_1.list);
router.route('/get').get(auth_middleware_1.authenticateToken, project_controller_1.get);
router.route('/get/team').get(auth_middleware_1.authenticateToken, project_controller_1.getTeam);
router.route('/:id').get(project_controller_1.findById);
router.route('/:id/update').put(project_controller_1.update);
router.route('/:id/update-role').put(project_controller_1.updateRole);
router.route('/:id/delete').delete(project_controller_1.remove);
module.exports = router;
//# sourceMappingURL=project.router.js.map