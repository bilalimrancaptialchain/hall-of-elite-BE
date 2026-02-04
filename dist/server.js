"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const app = (0, app_1.createApp)();
const PORT = env_1.env.PORT;
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/health`);
        });
        process.on("SIGINT", async () => {
            console.log("\n🛑 Shutting down server...");
            await (0, database_1.disconnectDatabase)();
            process.exit(0);
        });
        process.on("SIGTERM", async () => {
            console.log("\n🛑 Shutting down server...");
            await (0, database_1.disconnectDatabase)();
            process.exit(0);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map