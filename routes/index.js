var express = require('express');
var router = express.Router();
require('dotenv').config();
const db = require('../db/model')

// Pagina principal
router.get('/', function(req, res, next) {
  let name = 'Lavadoras portatiles'
  res.render('index', {
    title: 'Lavadoras portatiles',
    name: name,
  });
});

// Nosotros
router.get('/nosotros', (req, res) => {
  res.render('nosotros');
});

// Productos
router.get('/productos', (req, res) => {
  res.render('productos');
});
 
// Index
router.get('/index', (req, res) => {
  res.render('index');
});

// Contacto
router.get('/contacto', (req, res) => {
  res.render('contacto');
});

// Verificacion de usuario
router.post('/contacto', function(req, res, next) {
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.username && pass == process.env.clave)  {
      res.render('administracion');
  } else {
    res.render('contacto', { error: 'Datos incorrectos' });
  }
})

// Listado de Productos
router.get('/listado', (req, res) => {
  db.obtenerProductos()
  .then(data => {
    console.log (data)
    res.render('listado', {productos: data});
  })
  .catch(err => {
    res.render('listado', {productos: []});
  })
});

// Listado de categorias
router.get('/listado-categorias', (req, res) => {
  db.obtenerCategorias()
  .then(data => {
    console.log (data)
    res.render('listado-categorias', {categorias: data});
  })
  .catch(err => {
    res.render('listado-categorias', {categorias: []});
  })
});

// Agregar producto
router.get('/agregar-producto', (req, res) => {
  db.obtenerCategorias()
  .then(data => {
    console.log (data)
    res.render('agregar-producto', {categorias: data});
  })
  .catch(err => {
    res.render('agregar-producto', {categorias: []});
  })
});
router.post('/productos', (req, res) => {
  const { nombre, codigo, modelo, precio, potencia, descripcion, categoria_id } = req.body;
  db.insertarProducto(nombre, codigo, modelo, precio, potencia, descripcion, categoria_id); // Función que inserta el producto en la base de datos
  res.redirect('/agregar-producto');
});

// Agregar categoria
router.get('/agregar-categoria', (req, res) => {
  db.obtenerCategorias()
  .then(data => {
    console.log (data)
    res.render('agregar-categoria', {categorias: data});
  })
  .catch(err => {
    res.render('agregar-categoria', {categorias: []});
  })
});
router.post('/categoria', (req, res) => {
  const {nombre} = req.body;
  db.insertarCategoria(nombre); // Función que inserta el producto en la base de datos
  res.redirect('/agregar-categoria');
});

// Editar categoria
router.get('/editar-categorias/:id', (req, res) => {
  const id = req.params.id;
  db.obtenercategoriaid(id)
  .then(data => {
    console.log (data)
    res.render('editar-categorias', {categorias: data});
  })
  .catch(err => {
    res.render('editar-categorias', {categorias: []});
  })
});
router.post('/editar', (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  db.editarCategoria(id, nombre); // Función que inserta el producto en la base de datos
  res.redirect('/listado-categorias');
});

// Editar producto
router.get('/editar-producto/:id', (req, res) => {
  const id = req.params
  db.obtenerproductoid(id)
  .then(data => {
    console.log (data)
    res.render('editar-producto', {productos: data});
  })
  .catch(err => {
    res.render('editar-producto', {productos: []});
  })
});
router.post('/actualizar', (req, res) => {
  const { nombre, codigo, modelo, precio, potencia, descripcion} = req.body;
  db.editarProducto(id, nombre, codigo, modelo, precio, potencia, descripcion); // Función que inserta el producto en la base de datos
  res.redirect('/listado');
});

// Agregar imagen
router.get('/agregar-imagen/:id', (req, res) => {
  db.obtenerCategorias()
  .then(data => {
    console.log (data)
    res.render('agregar-imagen', {categorias: data});
  })
  .catch(err => {
    res.render('agregar-categoria', {categorias: []});
  })
});
router.post('/imagen', (req, res) => {
  const {url, producto_id, destacado} = req.body;
  db.insertarImagen(url, producto_id, destacado); // Función que inserta el producto en la base de datos
  res.redirect('/listado');
});






module.exports = router;