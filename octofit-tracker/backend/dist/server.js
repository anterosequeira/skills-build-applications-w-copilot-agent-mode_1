"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const mongoUrl = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api/welcome', (_req, res) => {
    res.json({ message: 'Welcome to OctoFit Tracker backend' });
});
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    console.log('Connected to MongoDB on port 27017');
    app.listen(port, () => {
        console.log(`Backend running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
