import axios from 'axios';
export const weatherAPI = async ({lat, lon}) => {
  const API_KEY = '47b24d4635cea692830a72a890acc17b';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await axios.get(url);
  return res.status === 200 ? res : 'Not Data';
};
