"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes = require("./modules/auth/auth.router");
const commentRoutes = require("./modules/comment/comment.router");
const epicRoutes = require("./modules/epic/epic.router");
const externalAccessRoutes = require("./modules/externalAccess/externalAccess.router");
const ganttTaskRoutes = require("./modules/gantt-task/gantt-task.router");
const notificationRoutes = require("./modules/notification/notification.router");
const projectRoutes = require("./modules/project/project.router");
const sprintRoutes = require("./modules/sprint/sprint.router");
const storyRoutes = require("./modules/story/story.router");
const taskRoutes = require("./modules/task/task.router");
const userRoutes = require("./modules/user/user.router");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-express-middleware");
require("./i18next");
function default_1() {
    let app = (0, express_1.default)();
    const middleware = () => {
        app.use(i18nextMiddleware.handle(i18next));
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use(express_1.default.urlencoded({ extended: false }));
    };
    const routes = () => {
        try {
            app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.status(201).json({
                    message: `API is running!!!!}`,
                });
            }));
            app.use("/api/auth", authRoutes);
            app.use("/api/comment", commentRoutes);
            app.use("/api/epic", epicRoutes);
            app.use("/api/externalAccess", externalAccessRoutes);
            app.use("/api/gantt-task", ganttTaskRoutes);
            app.use("/api/notification", notificationRoutes);
            app.use("/api/project", projectRoutes);
            app.use("/api/sprint", sprintRoutes);
            app.use("/api/story", storyRoutes);
            app.use("/api/task", taskRoutes);
            app.use("/api/user", userRoutes);
        }
        catch (err) {
            console.log("Error initializing routes:", err);
        }
    };
    const finalizeMiddleware = () => {
        // Error Handler Middleware
        app.use(function (err, req, res, next) {
            console.log(err);
            if (err.name === "CastError") {
                err._message = `Resource Not Found. Invalid: ${err.path}`;
            }
            if (err.code === 11000) {
                err._message = "Duplication Error";
            }
            if (err.name === "ValidationError") {
                err._message = Object.values(err.errors).map((value) => value.message);
                err.path = Object.values(err.errors).map((value) => value.path);
            }
            if (process.env.NODE_ENV === "development") {
                console.log("ERRR>>", err._message);
                res.status(err.status || 500).json({
                    status: err.status || 500,
                    code: err.code,
                    message: err._message ||
                        err.message ||
                        "Error from error handling middleware",
                    path: err.path,
                    errorPlace: err.keyPattern,
                    errorData: err.keyValue,
                    stack: err.stack,
                });
            }
            if (process.env.NODE_ENV === "production") {
                res.status(err.status || 500).json({
                    status: err.status || 500,
                    code: err.code,
                    message: err._message ||
                        err.message ||
                        "Error from error handling middleware",
                    path: err.path,
                    errorPlace: err.keyPattern,
                    errorData: err.keyValue,
                    stack: err.stack,
                });
            }
        });
    };
    const connectToTheDatabase = () => {
        const MONGODB_URI = process.env.MONGODB_URI;
        mongoose_1.default
            .connect(MONGODB_URI)
            .then((con) => {
            const { host, name, port } = con.connection;
            console.log(`Database is Connected with Host:${host}\nDatabase Name:${name}\nDatabase Port:${port}`);
        })
            .catch((e) => {
            console.log("Error in Connecting Database");
        });
    };
    middleware();
    connectToTheDatabase();
    routes();
    finalizeMiddleware();
    return app;
}
exports.default = default_1;
//# sourceMappingURL=app.js.map