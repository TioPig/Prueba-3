const { Router } = require('express');
const { obtenerMascotas,
    agregarMascota,
    obtenerMascota,
    editarMascota,
    eliminarMascota } = require('../controllers/mascota.controllers');
const { validadorMascotas } = require('../validators/mascota.validator');
const { tengoToken } = require('../middlewares/auth');

const route = Router();

route.get('/', obtenerMascotas,);

route.post('/', [tengoToken, validadorMascotas], agregarMascota);

route.get('/:id', obtenerMascota,);

route.put('/:id', editarMascota,);

route.delete('/:id', eliminarMascota);

module.exports = route;