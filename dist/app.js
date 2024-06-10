"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const globalErrorHandler_1 = __importDefault(require("./utils/globalErrorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Create Express server
const app = (0, express_1.default)();
// Serve static files from the 'public' directory
const publicPath = path_1.default.join(__dirname, '../public');
app.use(express_1.default.static(publicPath));
// Parse URL-encoded bodies
const rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 100, // 1 minute
    max: 10,
    message: "Too many reuests from this IP",
});
app.use(rateLimiter);
app.use((0, cors_1.default)());
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// test route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the -> zb ut _server -id: 1.0.0',
    });
});
// import routes
app.use('/api/v1/', routes_1.allRoutes);
// global error handler
app.use(globalErrorHandler_1.default);
//handel not found :
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Not found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'api not found',
            },
        ],
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map