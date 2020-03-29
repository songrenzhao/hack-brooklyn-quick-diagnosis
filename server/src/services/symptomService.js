import serviceRequest from './serviceRequest';
import config from '../config';

async function getSymptom(symptomID) {
  try {
    const { content_type: _, ...headers } = config.infermedica_headers;
    const data = await serviceRequest({
      method: 'GET',
      url: `https://api.infermedica.com/v2/symptoms/${symptomID}`,
      headers,
    });
    return data;
  } catch (err) {
    throw err;
  }
}

export async function searchSymptom(payload) {
  try {
    const { text } = payload;
    const data = await serviceRequest({
      method: 'POST',
      url: 'https://api.infermedica.com/v2/parse',
      headers: config.infermedica_headers,
      data: {
        text,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
}

export async function suggestSymptom(payload) {
  try {
    const { age, sex, evidence } = payload;
    const data = await serviceRequest({
      method: 'POST',
      url: 'https://api.infermedica.com/v2/suggest',
      headers: config.infermedica_headers,
      data: {
        sex,
        age: parseInt(age, 10),
        evidence,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
}

const addSymptomName = async ({ items }) => {
  const itemsWithSymptomPromises = items.map(async (item) => {
    const { id, ...others } = item;
    const { name: symptomName, common_name: commonName } = await getSymptom(id);
    return {
      id,
      symptomName,
      commonName,
      ...others,
    };
  });
  const itemsWithSymptom = await Promise.all(itemsWithSymptomPromises);
  return itemsWithSymptom;
};

export async function diagnosisSymptom(payload) {
  try {
    const { age, sex, evidence } = payload;
    const { question, conditions } = await serviceRequest({
      method: 'POST',
      url: 'https://api.infermedica.com/v2/diagnosis',
      headers: config.infermedica_headers,
      data: {
        sex,
        age: parseInt(age, 10),
        evidence,
      },
    });
    const SymptomItemList = await addSymptomName(question);
    Object.assign(question, { items: SymptomItemList });
    return {
      question,
      conditions,
    };
  } catch (err) {
    throw err;
  }
}
