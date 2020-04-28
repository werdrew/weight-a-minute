import axios from 'axios';

const BASE_URL = 'http://localhost:5601';

export default {
  getWeight: async (year, month, day) => {
    const response = await axios.get(BASE_URL + `/${year}/${month}/${day}`)
      .then(res => { return res; })
      .catch(err => console.log(err));
    return response;
  },
  getAllWeights: async (from, to) => {
    if (!from || !to) {
      const code = `From and to both required but got: ${from}, ${to}`;
      console.error(code);
      return { code };
    }
    const response = await axios.get(BASE_URL + `/weight?from=${from}&to=${to}`)
      .then(res => { return res; })
      .catch(err => console.log(err));
    return response;
  },
  addWeight: async (year, month, day, weight) => {
    const response = await axios.post(BASE_URL + `/${year}/${month}/${day}`, {
        weight
      })
      .then(res => { return res; })
      .catch(err => { throw err; });
    return response.data;
  },
  updateWeight: async (year, month, day, weight) => {
    const response = await axios.put(BASE_URL + `/${year}/${month}/${day}`, {
        weight
      })
      .then(res => { return res; })
      .catch(err => { throw err; });
    return response.data;  
  },
  deleteWeight: async (year, month, day, weight) => {
    const response = await axios.delete(BASE_URL + `/${year}/${month}/${day}`)
      .then(res => { return res; })
      .catch(err => { throw err; });
    return response.data;  
  },
};