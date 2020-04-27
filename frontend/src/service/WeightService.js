import axios from 'axios';

const BASE_URL = 'http://localhost:5601';

export default {
  getWeight: (year, month, day) => {
    const response = axios.get(BASE_URL + `/${year}/${month}/${day}`)
      .then(res => res)
      .catch(err => console.log(err));
    return response.data;
  },
  addWeight: (year, month, day, weight) => {
    const response = axios.post(BASE_URL + `/${year}/${month}/${day}`, {
        weight
      })
      .then(res => res)
      .catch(err => console.log(err));
    return response.data;
  },
  updateWeight: (year, month, day, weight) => {
    const response = axios.put(BASE_URL + `/${year}/${month}/${day}`, {
        weight
      })
      .then(res => res)
      .catch(err => console.log(err));
    return response.data;  },
};