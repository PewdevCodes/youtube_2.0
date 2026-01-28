import axios from 'axios';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  url: BASE_URL,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};

// async function fetchData() {
// 	try {
// 		const response = await axios.request(options);
// 		console.log(response.data);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// fetchData();

export const FetchFromAPI = async ( url ) => { 
   const { data } = await axios.get(`${BASE_URL}/${url}`, options);

   return data;

} 