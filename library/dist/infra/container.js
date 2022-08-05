"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const BooksRepository_1 = require("./BooksRepository");
require("reflect-metadata");
const container = new inversify_1.Container();
exports.container = container;
container.bind(BooksRepository_1.BooksRepository).to(BooksRepository_1.BooksRepository).inSingletonScope();
