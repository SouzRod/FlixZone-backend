const axios = require('axios');
const { baseURL, bearerToken } = require('../../config');

const getWatchProviders = async (movieId, language = 'pt-BR') => {
  try {
    const url = `${baseURL}/movie/${movieId}/watch/providers`;
    const headers = { Authorization: `Bearer ${bearerToken}` };
    const { data } = await axios.get(url, { headers });
    const providers = data.results && data.results.BR ? data.results.BR.flatrate || [] : [];

    const seen = new Set();
    const popularNames = {
      'Amazon Prime Video': 'Prime Vídeo',
      'Amazon Prime Video with Ads': 'Prime Vídeo',
      'Netflix': 'Netflix',
      'Netflix Standard with Ads': 'Netflix',
      'Disney Plus': 'Disney+',
      'HBO Max': 'Max',
      'Max': 'Max',
      'Globo': 'Globoplay',
      'Globoplay': 'Globoplay',
      'Claro': 'Claro video',
      'Claro video': 'Claro video',
      'Claro tv+': 'Claro tv+',
      // Adicione outros nomes se necessário
    };
    const uniqueProviders = [];
    for (const provider of providers) {
      if (provider.provider_name.toLowerCase().includes('channel')) continue;
      const popularName = popularNames[provider.provider_name] || provider.provider_name;
      if (!seen.has(popularName)) {
        seen.add(popularName);
        uniqueProviders.push({
          ...provider,
          provider_name: popularName,
          logo_path: provider.logo_path ? `https://image.tmdb.org/t/p/w92${provider.logo_path}` : null
        });
      }
    }
    return uniqueProviders;
  } catch (e) {
    return [];
  }
};

module.exports = { getWatchProviders };
