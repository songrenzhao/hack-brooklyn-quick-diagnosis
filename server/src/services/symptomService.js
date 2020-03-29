import serviceRequest from './serviceRequest';
import config from '../config';

export default async function searchSymptom(payload) {
  try {
    const { text } = payload;
    const data = await serviceRequest({
      method: 'POST',
      url: 'https://api.infermedica.com/v2/parse',
      headers: {
        'App-Id': config.infermedica_appid,
        'App-Key': config.infermedica_appkey,
        'Content-Type': 'application/json',
      },
      data: {
        text,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
}
