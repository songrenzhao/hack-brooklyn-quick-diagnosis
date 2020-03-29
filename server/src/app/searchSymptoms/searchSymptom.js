import httpStatus from 'http-status';
import { searchSymptom } from '../../services/symptomService';

export default async function (req, res) {
  try {
    const { body } = req;
    const response = await searchSymptom(body);
    return res.status(httpStatus.OK).jsend.success(response);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).jsend.error(err);
  }
}
