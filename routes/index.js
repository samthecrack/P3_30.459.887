var express = require('express');
const request = require ('request');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()
const IP = require ('ip');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cards = require('../config/cards');
const database = require('../config/database');
const nodemailer = require('nodemailer');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

// vista principal
router.get('/', (req, res) => {
  res.render('vista_principal')
} )
router.get('/vista_principal', (req, res) => {
  res.render('vista_principal') 
} )

router.get('/view', (req, res) => {
  res.render('view') 
} )

// mision
router.get('/mision', function(req, res, next) {
  res.render('mision');
});

// vision
router.get('/vision', function(req, res, next) {
  res.render('vision');
});

// proyecciones
router.get('/proyecciones', function(req, res, next) {
  res.render('proyecciones');
});

// logros
router.get('/logros', function(req, res, next) {
  res.render('logros');
});

// blog
router.get('/blog', function(req, res, next) {
  res.render('blog');
});

// nosotros
router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )

// login
router.get('/login', (req, res) => {
  res.render('login') 
} )

router.post('/login', function(req, res, next) {
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.user && pass == process.env.clave)  {
      res.render('administrar');
  } else {
    res.render('login', { error: 'Datos incorrectos' });
  }
})

// administrar
router.get('/administrar', (req, res) =>{
  res.render('administrar')
})

// simoncitos
router.get('/index', (req, res) => {
  db.getsimoncitos()
    .then(data => {        
      console.log(data)
      res.render('index', { simoncito: data });
  })
  .catch(err => {
      res.render('index', { simoncito: [] });
  })
});

router.get('/insert', (req, res) => {
  db.getcategory()
  res.render('insert')
});

router.post('/insert', (req, res) => {
  const {simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo} = req.body;
  console.log(simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo);
  db.insertsimoncitos(simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo)
  .then(() => {
     res.render('insert')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/edit/:id', (req, res)=>{
  const id = req.params.id
  db.getsimoncitosID(id)
  .then(data =>{
    console.log(data)
    res.render('edit', {simoncitos: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit', {simoncitos: []})
    })   
})

router.post('/edit/', (req, res)=>{
  const {id, simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo} = req.body;
  db.updatesimoncitos(id, simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo)
  .then(() =>{
    res.redirect('/index');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  db.deletesimoncitos(id)
    .then(() => {
    res.redirect('/index');
  })
  .catch(err => {
  console.log(err);
  });
})















module.exports = router;