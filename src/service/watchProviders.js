const axios = require('axios');
const { baseURL, apiKey } = require('../../config');

const getWatchProviders = async (movieId, language = 'pt-BR') => {
  try {
    const url = `${baseURL}/3/movie/${movieId}/watch/providers`;
    const params = { api_key: apiKey };
    const { data } = await axios.get(url, { params });
    const providers = data.results && data.results.BR ? data.results.BR.flatrate || [] : [];

    return providers.map(provider => ({
      ...provider,
      logo_path: provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : null
    }));
  } catch (e) {
    return [];
  }
};

module.exports = { getWatchProviders };
