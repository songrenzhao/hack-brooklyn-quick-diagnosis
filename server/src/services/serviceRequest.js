import axios from 'axios';

export default async function serviceRequest(requestInfo) {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios({ ...requestInfo, validateStatus: (_) => true });
    const { data } = response;
    return data;
  } catch (err) {
    throw err;
  }
}
