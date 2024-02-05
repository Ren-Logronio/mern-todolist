"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    setTimeout(() => { next(); }, 200);
}
exports.default = default_1;
