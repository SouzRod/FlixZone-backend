const { Router } = require('express');
const movieController = require('../controller/movie');

const router = Router();

router.get('/', movieController.get);
router.post('/favorite', movieController.saveFavorite);
router.get('/favorites', movieController.getFavorites);
router.delete('/favorite/:movieId', movieController.deleteFavorite);

module.exports = router;
