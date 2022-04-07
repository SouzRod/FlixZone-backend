const axios = require('axios');
const { baseURL, bearerToken, timeout, apiKey } = require('../../config');

const instance = axios.create({
  baseURL: baseURL,
  timeout: timeout,
	'Authorization': bearerToken
});

const getMovies = async (page, language) => {
	try {
		const { data: { results } } = await instance.get(`/3/discover/movie?api_key=${apiKey}&language=${language}&page=${page}`);
		return results;
	} catch (e) {
		throw e;
	}
};

module.exports = { getMovies };