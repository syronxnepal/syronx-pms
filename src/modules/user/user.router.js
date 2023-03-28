"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../auth/auth.middleware");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.route('/create').post(user_controller_1.create);
router.route('/list').get(user_controller_1.list);
router.route('/get/:username').get(user_controller_1.getByUserName);
router.route('/update/:username').put(user_controller_1.updateByUserName);
router.route('/:id').get(user_controller_1.findById);
router.route('/:id/update').put(user_controller_1.update);
router.route('/:id/delete').delete(user_controller_1.remove);
router.route('/invite-team').post(auth_middleware_1.authenticateToken, user_controller_1.inviteTeam);
module.exports = router;
//# sourceMappingURL=user.router.js.map