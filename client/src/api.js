import axios from 'axios'

const API_BASE = `http://hack-bk.herokuapp.com/api`

const header = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const getSearchResults = async(payload) => {
  const res = await axios.post(`${API_BASE}/symptom/search`, payload, header)
  return res.data.data
}

export const getMoreSuggestions = async(payload) => {
  const res = await axios.post(`${API_BASE}/symptom/suggest`, payload, header)
  return res.data.data
}

export const getDiagnosis = async(payload) => {
  const res = await axios.post(`${API_BASE}/symptom/diagnosis`, payload, header)
  return res.data.data
}

export const getTriage = async(payload) => {
  const res = await axios.post(`${API_BASE}/symptom/triage`, payload, header)
  return res.data.data
}