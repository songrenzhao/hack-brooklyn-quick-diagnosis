import httpStatus from 'http-status';
import { triageSymptom } from '../../services/symptomService';

export default async function (req, res) {
  try {
    const { body } = req;
    const response = await triageSymptom(body);
    return res.status(httpStatus.OK).jsend.success(response);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err);
  }
}
