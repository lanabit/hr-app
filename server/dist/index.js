"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./api/router"));
const app = (0, express_1.default)();
const port = 4000;
app.use(router_1.default);
// app.use(bodyParser.json());
// app.use(cors());
app.get('/', (req, res) => {
    res.send(`<h1>😃 Welcome to Express</h1>`);
});
app.listen(port, () => {
    console.log(`😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`);
});
