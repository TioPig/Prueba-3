const database = require('./../config/basedatos');
const { encriptar } = require('./../utils/password');
const { httpError } = require('./../utils/error')
const { matchedData } = require('express-validator');

const obtenerTodo = async (req, res) => {

    try {
        const db = await database();
        const sql = `SELECT * FROM usuario`;
        const [rows] = await db.query(sql);

        const resultado = {
            ok: true,
            data: rows
        }

        res.json(resultado);
    } catch (error) {
        return httpError(res, "Ocurrio algo en Get Usuarios");
    }
}
//  Metodo para solo obtener 1 user x id
const obtenerUnoSolo = async (req, res) => {
    //obtener el id por la url
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `SELECT * FROM usuario WHERE id_usuario = ${id}`;
        const [row] = await db.query(sql);

        const resultado = {
            ok: true,
            data: row
        }

        res.json(resultado);
    } catch (error) {
        return httpError(res, "Ocurrio algo en Get Usuario");
    }
}
//  Agregar User
const agregarUsuario = async (req, res) => {
    try {
        const body = matchedData(req);
        const { nombre, password, user, activo } = body;

        const passwordhash = encriptar(password);

        const db = await database();
        const sql = `INSERT INTO usuario(nombre, user, password, activo)
                VALUES('${nombre}', '${user}', '${passwordhash}', ${activo})`;
        const [result] = await db.query(sql);

        if (result.insertId) {
            return res.json({
                "msj": "Usuario Agregado Correctamente",
                "usuario": result
            });
        }

        res.json({
            "msj": "Usuario No Agregado",
            // "usuario": usuario
        });
    } catch (error) {
        // console.log(error);
        return httpError(res, "Ocurrio algo en POST Usuario");
    }
}
// EDITAR USER
const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const db = await database();
        const sql = `UPDATE usuario SET
                    nombre = '${nombre}',
                WHERE id_usuario = ${id}`;
        const [result] = await db.query(sql);

        console.log(result);

        res.json({
            "msj": "usuario modificado",
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en PUT Usuario");
    }
}
// Eliminar user
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM usuario
                WHERE id_usuario = ${id}`;
        const [result] = await db.query(sql);

        if (result.affectedRows) {
            return res.json({
                "msj": "usuario eliminado"
            });
        }

        res.json({
            "msj": "usuario no eliminado"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en DELETE Usuario");
    }

}
//Exportacion met
module.exports = {
    obtenerTodo,
    obtenerUnoSolo,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario
}