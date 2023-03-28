"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const auth_middleware_1 = require("./../auth/auth.middleware");
const router = (0, express_1.Router)();
router.route('/list').get(auth_middleware_1.authenticateToken, notification_controller_1.list);
router.route('/:id/delete').delete(notification_controller_1.remove);
module.exports = router;
//# sourceMappingURL=notification.router.js.map