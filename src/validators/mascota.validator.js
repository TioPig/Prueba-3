const { check, validationResult } = require('express-validator');
const { httpError } = require('../utils/error');

const validadorMascotas = [
    check('nombre')
        .exists().withMessage("Favor debe ir el nombre de la mascota")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('tipo_mascota')
        .exists().withMessage("Favor debe ir que tipo mascota es")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('raza')
        .exists().withMessage("Favor debe ir la raza de el animal")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('fecha_nacimiento')
        .exists().withMessage("Favor debe ir la fecha_nacimiento de el animal")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('img')
        .exists().withMessage("Favor debe ir la url de la imagen")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            return httpError(res, error.array());
        }
    }
]

module.exports = {
    validadorMascotas
}
