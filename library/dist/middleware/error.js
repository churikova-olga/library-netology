"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res) => {
    res.status(404);
    const content = '404 | not found';
    res.send(content);
};
