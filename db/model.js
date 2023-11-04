const db = require('./coneccion');

// Declaracion de funciones
let consulta = {
    obtenerproductoid: 'SELECT * FROM productos WHERE id = ?',
    obtenerProductos: 'SELECT * FROM productos',
    obtenerImagenes: 'SELECT * FROM imagenes',
    obtenerCategorias: 'SELECT * FROM categorias',
    insertarProducto: 'INSERT INTO productos (nombre, codigo, modelo, precio, potencia, descripcion, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    insertarImagen: 'INSERT INTO imagenes (url, producto_id, destacado) VALUES (?, ?, ?)',
    insertarCategoria: 'INSERT INTO categorias (nombre) VALUES (?)',
    editarProducto: 'UPDATE productos SET nombre = ?, codigo = ?, modelo = ?, precio = ?, potencia = ?, descripcion = ?, categoria_id = ? WHERE id = ?',
    editarCategoria: 'UPDATE categorias SET nombre = ? WHERE id = ?',
    editarImagen: 'UPDATE imagenes SET url = ?, producto_id = ? WHERE id = ?',
    borrarCategoria: 'DELETE FROM categorias WHERE id = ?',
    obtenercategoriaid: 'SELECT * FROM categorias WHERE id = ?',
    borrarProducto: 'DELETE FROM productos WHERE id = ?',
    borrarImagen: 'DELETE FROM imagenes WHERE id = ?'
};

// Declaracion de modulos
module.exports = {
    obtenerProductos(){
        return new Promise ((resolve, reject) => {
            db.all (consulta.obtenerProductos, (err, rows) => {
                if (err) reject(err);
                resolve (rows);
            })
        })
    },
    obtenerCategorias(){
        return new Promise ((resolve, reject) => {
            db.all (consulta.obtenerCategorias, (err, rows) => {
                if (err) reject(err);
                resolve (rows);
            })
        })
    },
    insertarProducto(nombre, codigo, modelo, precio, potencia, descripcion, categoria_id){
        return new Promise ((resolve, reject) => {
            db.run(consulta.insertarProducto, [nombre, codigo, modelo, precio, potencia, descripcion, categoria_id], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    insertarImagen(url, producto_id, destacado){
        return new Promise ((resolve, reject) => {
            db.run(consulta.insertarImagen, [url, producto_id, destacado], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    insertarCategoria(nombre){
        return new Promise ((resolve, reject) => {
            db.run(consulta.insertarCategoria, [nombre], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    editarProducto( id, nombre, codigo, modelo, precio, potencia, descripcion){
        return new Promise ((resolve, reject) => {
            db.run(consulta.editarProducto, [nombre, codigo, modelo, precio, potencia, descripcion, id ], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    editarCategoria( id, nombre){
        return new Promise ((resolve, reject) => {
            db.run(consulta.editarCategoria, [nombre, id], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    obtenerproductoid(id){
        return new Promise ((resolve, reject) => {
            db.run (consulta.obtenerproductoid, [id], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    },
    obtenercategoriaid(id){
        return new Promise ((resolve, reject) => {
            db.run (consulta.obtenercategoriaid, [id], (err) => {
                if (err) reject(err);
                resolve ();
            })
        })
    }
}