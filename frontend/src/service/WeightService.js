import axios from 'axios';

const BASE_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/weight`;

const getWeight = async (year, month, day) => {
  const response = await axios.get(BASE_URL + `/${year}/${month}/${day}`)
    .then(res => { return res; })
    .catch(err => console.log(err));
  return response;
};

const getAllWeight = async (from, to) => {
  if (!from || !to) {
    const code = `From and to both required but got: ${from}, ${to}`;
    console.error(code);
    return { code };
  }
  const response = await axios.get(BASE_URL + `?from=${from}&to=${to}`)
    .then(res => { return res; })
    .catch(err => console.log(err));
  return response;
};

const addWeight = async (year, month, day, weight) => {
  const response = await axios.post(BASE_URL + `/${year}/${month}/${day}`, {
      weight
    })
    .then(res => { return res; })
    .catch(err => { throw err; });
  return response;
};

const updateWeight = async (year, month, day, weight) => {
  const response = await axios.put(BASE_URL + `/${year}/${month}/${day}`, {
      weight
    })
    .then(res => { return res; })
    .catch(err => { throw err; });
  return response;  
};

const deleteWeight = async (year, month, day, weight) => {
  const response = await axios.delete(BASE_URL + `/${year}/${month}/${day}`)
    .then(res => { return res; })
    .catch(err => { throw err; });
  return response;  
};

export { 
  getWeight, 
  getAllWeight, 
  addWeight, 
  updateWeight, 
  deleteWeight 
};