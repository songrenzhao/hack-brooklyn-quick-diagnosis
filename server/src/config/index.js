import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  infermedica_headers: {
    'App-Id': process.env.INFERMEDICA_APPID,
    'App-Key': process.env.INFERMEDICA_APPKEY,
    'Content-Type': 'application/json',
  },
};
