const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/databse.sqlite', () => {
    // Crear tabla productos
    db.run('CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, codigo INTEGER NOT NULL, modelo TEXT, precio REAL NOT NULL, potencia REAL NOT NULL, descripcion TEXT, categoria_id INTEGER, FOREIGN KEY(categoria_id) REFERENCES categorias(id))');
    // Crear tabla categorias
    db.run('CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT)');
    // Crear tabla imagenes
    db.run('CREATE TABLE IF NOT EXISTS imagenes (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, producto_id INTEGER, destacado BOOLEAN NOT NULL, FOREIGN KEY(producto_id) REFERENCES productos(id))');
});
module.exports = db;