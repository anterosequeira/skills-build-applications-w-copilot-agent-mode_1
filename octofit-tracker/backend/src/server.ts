import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUrl = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

app.get('/api/welcome', (_req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker backend' });
});

mongoose
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
