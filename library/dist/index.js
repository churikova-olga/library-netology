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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_1 = __importDefault(require("./middleware/error"));
const index_1 = __importDefault(require("./routes/api/index"));
// const COOKIE_SECRET = process.env.COOKIE_SECRET;
const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'olga';
const PasswordDB = process.env.DB_PASSWORD || '523896';
const NameDB = process.env.DB_NAME || 'book_database';
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set("view engine", "ejs");
app.set('views', 'src/views');
app.use('/src/public', express_1.default.static(__dirname + "/public"));
// app.use(require 'express-session')({
//     secret: COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
// }))
app.use('/api/book', index_1.default);
app.use(error_1.default);
// const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`mongodb+srv://${UserDB}:${PasswordDB}@cluster0.rhhgpyk.mongodb.net/${NameDB}?retryWrites=true&w=majority`);
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
