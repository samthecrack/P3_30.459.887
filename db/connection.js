const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite', (err) =>{
    if(err) console.log(err);
    db.run('CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)'); 
    db.run('CREATE TABLE IF NOT EXISTS producto (id INTEGER PRIMARY KEY AUTOINCREMENT, code INTEGER NOT NULL, name TEXT, power REAL NOT NULL, model TEXT, description TEXT, price REAL NOT NULL, category_id INTEGER, FOREIGN KEY(category_id) REFERENCES category(id))');
    db.run('CREATE TABLE IF NOT EXISTS imagen (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, producto_id INTEGER, destacado TEXT NOT NULL, FOREIGN KEY(producto_id) REFERENCES producto(id))');
    db.run('CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, pass TEXT NOT NULL)');
    db.run('CREATE TABLE IF NOT EXISTS compra (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente_id INTEGER, producto_id INTEGER, cantidad INTEGER, total_pagado real, fecha TEXT, ip_cliente TEXT)');
console.log('base de datos creada')
});
module.exports = db; 