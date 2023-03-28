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
const socket_io_1 = require("socket.io");
const task_service_1 = require("../modules/task/task.service");
const notification_model_1 = __importDefault(require("./../modules/notification/notification.model"));
function default_1(server) {
    // const { CLIENT_HOST, CLIENT_PORT } = process.env;
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        }
    });
    let onlineUsers = [];
    io.on("connection", (socket) => {
        const addNewUser = (username, project, socketId) => {
            if (!onlineUsers.some((user) => user.username === username && user.project === project)) {
                return onlineUsers.push({ username, project, socketId });
            }
            else {
                onlineUsers = onlineUsers.map((el) => {
                    if (el.username === username && el.project === project) {
                        return Object.assign(Object.assign({}, el), { socketId });
                    }
                    return el;
                });
            }
        };
        const removeUser = (socketId) => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
        };
        const getUser = (username) => {
            return onlineUsers.find((user) => user.username === username);
        };
        // console.log("Online Users ", onlineUsers)
        //For Adding User containing username and the socket 
        socket.on("newUser", ({ username, project }) => {
            addNewUser(username, project, socket.id);
        });
        //For Sending Notifications
        socket.on("sendNotification", ({ sender, reciever, senderId, recieverId, type, project, task }) => __awaiter(this, void 0, void 0, function* () {
            console.log(sender, reciever, type, project, task);
            const recieverData = getUser(reciever);
            if (recieverData && recieverData.project === project) {
                if (recieverData.username !== sender)
                    io.to(recieverData.socketId).emit("getNotification", { sender, type });
            }
            yield notification_model_1.default.create({ assignedBy: senderId, assignedTo: recieverId, type, project, task });
            console.log("Notifiacation", sender, reciever, type);
        }));
        socket.on("taskChange", ({ sender, type, project, task }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, task_service_1.findByIdPopulated)(task);
            if (type === 'delete') {
                return io.emit("updateTasks", { type, data: { _id: task } });
            }
            for (const user in onlineUsers) {
                const userData = onlineUsers[user];
                // && sender !== userData.username
                if (userData.project === project) {
                    console.log("PROJECT", project);
                    console.log("PROJECT", userData.project);
                    if (data) {
                        console.log("EMITTINMGG");
                        io.emit("updateTasks", { type, data });
                    }
                }
            }
        }));
        socket.on("sprintTaskChange", ({ sender, type, project, task }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, task_service_1.findByIdPopulated)(task);
            if (type === 'delete') {
                return io.emit("updateSprintTasks", { type, data: { _id: task } });
            }
            for (const user in onlineUsers) {
                const userData = onlineUsers[user];
                // && sender !== userData.username
                if (userData.project === project) {
                    if (data) {
                        io.emit("updateSprintTasks", { type, data });
                    }
                }
            }
        }));
        socket.on("sprintChange", ({ sender, project, type }) => __awaiter(this, void 0, void 0, function* () {
            for (const user in onlineUsers) {
                const userData = onlineUsers[user];
                if (userData.project === project && sender !== userData.username) {
                    io.emit("updateSprint", { sender, type });
                }
            }
        }));
        //Executed after Disconnected
        socket.on("disconnect", () => {
            // console.log("Disconnected")
            removeUser(socket.id);
        });
        socket.on('connect_failed', function (err) {
            console.log('Connection Failed');
            console.log(err.message);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=index.js.map