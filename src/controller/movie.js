const { getMovies } = require('../service/tmdb');
const { getWatchProviders } = require('../service/watchProviders');
const { getRandomInt } = require('../utils/random');
const Favorite = require('../models/favorite');

const get = async (req, res) => {
	const { genre } = req.query;
	const page = getRandomInt(1, 70);
	let response = await getMovies(page, 'pt-BR', genre);

	if (!response || response.length === 0) {
		return res.status(404).json({ error: 'Nenhum filme encontrado.' });
	}

	let movieWithProviders = null;
	for (let i = 0; i < response.length; i++) {
		const movie = response[i];
		const { backdrop_path, title, overview, id } = movie;
		if (!overview || overview.trim() === '') continue;
		let providers = await getWatchProviders(id);
		if (!providers || providers.length === 0) {
			providers = await getWatchProviders(id);
		}
		if (providers && providers.length > 0) {
			movieWithProviders = {
				id,
				backdrop_path: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
				title,
				overview,
				providers
			};
			break;
		}
	}

	response = await getMovies(page, 'pt-BR', genre);

	if (!response || response.length === 0) {
		return res.status(404).json({ error: 'Nenhum filme encontrado.' });
	}


	for (let i = 0; i < response.length; i++) {
		const movie = response[i];
		const { backdrop_path, title, overview, id } = movie;
		if (!overview || overview.trim() === '') continue;
		let providers = await getWatchProviders(id);
		if (!providers || providers.length === 0) {
			providers = await getWatchProviders(id);
		}
		if (providers && providers.length > 0) {
			movieWithProviders = {
				id,
				backdrop_path: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
				title,
				overview,
				providers
			};
			break;
		}
	}

	if (!movieWithProviders) {
		return res.status(404).json({ error: 'Nenhum filme com providers encontrado.' });
	}

	return res.status(200).json(movieWithProviders);
};

const saveFavorite = async (req, res) => {
	try {
		const { movieId, title, overview, backdrop_path, providers } = req.body;
		const favorite = new Favorite({ movieId, title, overview, backdrop_path, providers });
		await favorite.save();
		return res.status(201).json({ message: 'Favorito salvo com sucesso!' });
	} catch (err) {
		if (err.code === 11000) {
			return res.status(409).json({ error: 'Filme já está nos favoritos.' });
		}
		return res.status(500).json({ error: 'Erro ao salvar favorito.' });
	}
};

const getFavorites = async (req, res) => {
	try {
		const favorites = await Favorite.find();
		return res.status(200).json(favorites);
	} catch (err) {
		return res.status(500).json({ error: 'Erro ao buscar favoritos.' });
	}
};

const deleteFavorite = async (req, res) => {
	try {
		const { movieId } = req.params;
		const result = await Favorite.deleteOne({ movieId });
		if (result.deletedCount === 0) {
			return res.status(404).json({ error: 'Favorito não encontrado.' });
		}
		return res.status(200).json({ message: 'Favorito removido com sucesso!' });
	} catch (err) {
		return res.status(500).json({ error: 'Erro ao remover favorito.' });
	}
};

module.exports = { get, saveFavorite, getFavorites, deleteFavorite };