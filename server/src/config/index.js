import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  infermedica_appid: process.env.INFERMEDICA_APPID,
  infermedica_appkey: process.env.INFERMEDICA_APPKEY,
};
