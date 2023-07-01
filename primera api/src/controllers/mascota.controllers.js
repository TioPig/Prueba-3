const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');


const obtenerMascotas = async (req, res) => {

    try {
        const db = await database();

        const sql = `
            SELECT 
               m.id_mascota,
               m.nombre,
               m.tipo_mascota,
               m.raza,
               m.fecha_nacimiento,
               m.img,
            FROM mascota m
        `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_MASCOTA");
    }
}

const agregarMascota = async (req, res) => {

    try {
        const { nombre, tipo_mascota, raza, fecha_nacimiento,img } = req.body;


        const db = database();

        const sql = `
            INSERT INTO mascota(nombre, tipo_mascota, raza, fecha_nacimiento,img)
            VALUES('${nombre}', '${tipo_mascota}', '${raza}', '${fecha_nacimiento}', '${img}')
        `;

        const [resultado] = await db.query(sql);

        if (!resultado.insertId) {
            return res.json(
                {
                    "ok": false,
                    "msj": "no creaste nada"
                }
            );
        }

        res.json(
            {
                "ok": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_MASCOTA")
    }

}

const obtenerMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();

        const sql = `
        SELECT 
               m.id_mascota,
               m.nombre,
               m.tipo_mascota,
               m.raza,
               m.fecha_nacimiento,
               m.img,
            FROM mascota m
        WHERE m.id_mascota = ${id}
    `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "ok": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO_MASCOTA")
    }
}

const editarMascota = async (req, res) => {

    try {
        const { id } = req.params;

        const { nombre, tipo_mascota, raza,img } = req.body;

        const db = await database;

        const sql = `
            UPDATE mascota SET
                nombre = '${nombre}',
                tipo_mascota = '${tipo_mascota}',
                raza = ${raza},
                img = '${img}'
            WHERE id_mascota = ${id}
        `;

        const [resultado] = db.query(sql);

        if (!resultado.insertId) {
            return httpError(res, "Error al Editar");
        }

        return res.json({
            "ok": true,
            "msj": "Se edito correctamente"
        });

    } catch (error) {
        return httpError(res, "Error en editar mascota");
    }
}

const eliminarMascota = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM mascota WHERE id_mascota = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar nada");
        }

        return res.json(
            {
                "ok": true,
                "msj": "Mascota eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE MASCOTA");
    }
}

module.exports = {
    obtenerMascotas,
    agregarMascota,
    obtenerMascota,
    editarMascota,
    eliminarMascota
}