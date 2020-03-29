import httpStatus from 'http-status';
import { version } from '../../../package.json';

export default async function healthCheck(req, res) {
  const response = {
    online: true,
    version,
  };
  return res.status(httpStatus.OK).jsend.success(response);
}