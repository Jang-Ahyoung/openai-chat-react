import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Mongodb connected');
    server.listen(port, () => console.log(`Server is listening on port ${port}`));
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });