const axios = require('axios');
const { baseURL, bearerToken, timeout } = require('../../config');

const instance = axios.create({
  baseURL: baseURL,
  timeout: Number(timeout),
  headers: {
    Authorization: `Bearer ${bearerToken}`
  }
});

const getMovies = async (page, language, genreId) => {
  try {
    const params = {
      language,
      page,
      'release_date.gte': '2018',
      without_genres: 27
    };
    if (genreId) {
      params.with_genres = genreId;
    }
    const { data: { results } } = await instance.get('/discover/movie', { params });
    return results;
  } catch (e) {
    throw e;
  }
};

module.exports = { getMovies };