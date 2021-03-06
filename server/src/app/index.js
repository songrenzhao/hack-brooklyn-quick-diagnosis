import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import jsend from 'jsend';
import healthCheck from './healthCheck';
import symptom from './symptom';

export default function create() {
  const app = express();
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(jsend.middleware);
  app.use('/api/healthcheck', healthCheck);
  app.use('/api/symptom', symptom);
  return app;
}
