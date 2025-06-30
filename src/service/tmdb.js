const axios = require('axios');
const { baseURL, bearerToken, timeout, apiKey } = require('../../config');

const instance = axios.create({
  baseURL: baseURL,
  timeout: timeout,
	'Authorization': bearerToken
});

const getMovies = async (page, language, genreId) => {
  try {
    const params = {
      api_key: apiKey,
      language,
      page,
      'release_date.gte': '2018',
      without_genres: 27
    };
    if (genreId) {
      params.with_genres = genreId;
    }
    const { data: { results } } = await instance.get(`/3/discover/movie`, { params });
    return results;
  } catch (e) {
    throw e;
  }
};

module.exports = { getMovies };