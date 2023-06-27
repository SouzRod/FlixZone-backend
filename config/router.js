const { Router } = require('express');
const movieController = require('../src/controller/movie');

const router = Router();

router.get('/', movieController.get);

module.exports = router;