"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = exports.prisma = void 0;
var client_1 = require("../prisma/client");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return client_1.prisma; } });
Object.defineProperty(exports, "connectDatabase", { enumerable: true, get: function () { return client_1.connectDatabase; } });
Object.defineProperty(exports, "disconnectDatabase", { enumerable: true, get: function () { return client_1.disconnectDatabase; } });
//# sourceMappingURL=database.js.map