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


// Vista principal
router.get('/', (req, res) => {
  res.render('view')
} )

router.get('/view', (req, res) => {
  res.render('view') 
} )


// nosotros
router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )


// registro para clientes
router.get('/client', (req, res) => {
  res.render('client')
} )

router.post('/client', (req, res) => {

  const captcha = req.body['g-recaptcha-response'];
  const secretKey = process.env.SecretKey;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  const {email, pass} = req.body;
  db.insertclient(email, pass)
  .then(() => {
     res.redirect('client')
  })
  .catch(err => {
    console.log(err);
  })
});


// login para clientes
router.get('/sesion', (req, res) => {
  res.render('sesion')
} )


// login para clientes 1
router.get('/iniciar', (req, res) => {
  res.render('iniciar')
} )

router.post('/iniciar', (req, res) => {
  const email = req.body.email; 
  const pass = req.body.pass;
  const bd = require('../db/connection');
  bd.get('SELECT * FROM client WHERE email = ? AND pass = ?', [email, pass], (err, row) => {
    if (err) {
      console.error(err);
      // Manejar el error
    } else {
      if (row) {
        // Los datos son iguales, redirigir a otra vista
        res.redirect('/compra');
      } else {
        // Los datos no son iguales, manejar según sea necesario
        res.redirect('/client');
      }
    }
  });
});

  
// destacados
router.get('/destacados', (req, res) => {
  db.getproducto()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('destacados', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('destacados', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('destacados', { producto: [], imagen: [] });
    }); 
})


// listado
router.get('/listado', (req, res) => {
  db.getproducto()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// filtro
router.get('/filtro', (req, res) => {
  res.render('filtro')
} )


// por_nombre 
router.get('/por_nombre', (req, res) => {
  db.getproductoNO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// por_descripcion
router.get('/por_descripcion', (req, res) => {
  db.getproductoDE()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// por_categoria
router.get('/por_categoria', (req, res) => {
  db.getproductoDE()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// por_modelo
router.get('/por_modelo', (req, res) => {
  db.getproductoMO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// por_potencia
router.get('/por_potencia', (req, res) => {
  db.getproductoPO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


// imagen
router.get('/imagen/:id', (req, res)=>{
  const id = req.params.id
  db.getimagenID(id)
  .then(data =>{
    console.log(data)
    res.render('imagen', {imagen: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('imagen', {imagen: []})
    })   
})


// producto
router.get('/producto/:id', (req, res)=>{
  const id = req.params.id
  db.getproductoID(id)
  .then(data =>{
    db.getimagen()
    .then (images => { 
      res.render ('producto', { producto: data[0], imagen: images });
    })
    .catch (err => {
      res.render ('producto', { producto: data[0], imagen: [] });
    })
  })     
  .catch (err => {
    res.render ('producto', { producto: [], imagen: [] });
  });
})


// compra
router.get('/compra', (req, res) => {
  db.getproducto()
  .then(data =>{
    db.getclient()
    .then (cliente => { 
      res.render ('compra', { producto: data, client: cliente });
    })
    .catch (err => {
      res.render ('compra', { producto: data, client: cliente  });
    })
  })     
  .catch (err => {
    res.render ('compra', { producto: [], client: [] });
  });
} )

router.post('/compra', function(req, res, next) {
  let date = new Date();
  let Datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  let fecha = Datetime;
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ip_cliente = ip.split(",")[0];
  const cliente_id = req.body.cliente_id
  const producto_id = req.body.producto_id
  const cantidad = req.body.cantidad
  const bd = require('../db/connection');
  let sql = `SELECT price FROM producto WHERE id = ?`;
  let precio;
 
  bd.get(sql, [producto_id], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    precio = row.price;
    console.log(`El precio del producto ${producto_id} es: ${precio}`);
   
    let total_pagado = precio * cantidad;
    console.log(`El resultado de la multiplicación es: ${total_pagado}`);

    db.insertcompra(cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente)
    .then(() => {
       res.redirect('payments')
    })
    .catch(err => {
      console.log(err);
    })

  });
 
})


// pagar
router.get('/payments', (req, res) => {
  res.render('payments') 
})




// login
router.get('/login', (req, res) => {
  res.render('login') 
} )

router.post('/login', function(req, res, next) {
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.username && pass == process.env.clave)  {
      res.render('administrar');
  } else {
    res.render('login', { error: 'Datos incorrectos' });
  }
})


// administrar
router.get('/administrar', (req, res) =>{
  res.render('administrar')
})


// tabla de productos
router.get('/index', (req, res) => {
  db.getproducto()
    .then(data => {        
      console.log(data)
      res.render('index', { producto: data });
  })
  .catch(err => {
      res.render('index', { producto: [] });
  })
});


// insertar producto
router.get('/insert', (req, res) => {
  db.getcategory()
  .then(data => {
    console.log (data)
    res.render('insert', {category: data});
  })
  .catch(err => {
    res.render('insert', {category: []});
  })
});

router.post('/insert', (req, res) => {
  const {code, name, power, model, description, price, category_id} = req.body;
  console.log(code, name, power, model, description, price, category_id);
  db.insertproducto(code, name,power,model,description,price,category_id)
  .then(() => {
     res.redirect('index')
  })
  .catch(err => {
    console.log(err);
  })
});


// editar producto
router.get('/edit/:id', (req, res)=>{
  const id = req.params.id
  db.getproductoID(id)
  .then(data =>{
    console.log(data)
    res.render('edit', {producto: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit', {producto: []})
    })   
})

router.post('/edit/', (req, res)=>{
  const {id, code, name, power, model, description, price, category_id,} = req.body;
  db.updateproducto(id, code, name, power, model, description, price, category_id)
  .then(() =>{
    res.redirect('/index');
  })
  .catch(err =>{
    console.log(err);

  })
});


// eliminar producto
router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  db.deleteproducto(id)
    .then(() => {
    res.redirect('/index');
  })
  .catch(err => {
  console.log(err);
  });
})


// tabla de clientes
router.get('/tabclient', (req, res) => {
  db.getclient()
    .then(data => {        
      console.log(data)
      res.render('tabclient', { client: data });
  })
  .catch(err => {
      res.render('tabclient', { client: [] });
  })

});


// tabla de compras
router.get('/tabcompra', (req, res) => {
  db.getcompra()
    .then(data => {        
      console.log(data)
      res.render('tabcompra', { compra: data });
  })
  .catch(err => {
      res.render('tabcompra', { compra: [] });
  })

});


// tabla de categorias
router.get('/tabcategory', (req, res) => {
  db.getcategory()
    .then(data => {        
      console.log(data)
      res.render('tabcategory', { category: data });
  })
  .catch(err => {
      res.render('tabcategory', { category: [] });
  })

});


// insertar categoria
router.get('/insertcat', (req, res) => {
  res.render('insertcat')
})

router.post('/insertcat', (req, res) => {
  const {name} = req.body;
  console.log(name);
  db.insertcategory(name)
  .then(() => {
     res.redirect('tabcategory')
  })
  .catch(err => {
    console.log(err);
  })
});

// editar categoria
router.get('/editcat/:id', (req, res)=>{
  const id = req.params.id
  db.getcategoryID(id)
  .then(data =>{
    console.log(data)
    res.render('editcat', {category: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editcat', {category: []})
    }) 
})

router.post('/editcat/', (req, res)=>{
  const {id, name} = req.body;
  db.updatecategory(id, name)
  .then(() =>{
    res.redirect('/tabcategory');
  })
  .catch(err =>{
    console.log(err);

  })
});


// eliminar categoria
router.get('/deletecat/:id', (req, res)=>{
  const id = req.params.id;
  db.deletecategory(id)
    .then(() => {
    res.redirect('/tabcategory');
  })
  .catch(err => {
  console.log(err);
  });
})


// tabla de imagenes
router.get('/tabimagen', (req, res) => {
  db.getimagen()
    .then(data => {        
      console.log(data)
      res.render('tabimagen', { imagen: data });
  })
  .catch(err => {
      res.render('tabimagen', { imagen: [] });
  })
});


// insertar imagen
router.get('/insertima', (req, res) => {
  res.render('insertima')
})

router.post('/insertima', (req, res) => {
  const {url, producto_id, destacado} = req.body;
  console.log(url, producto_id, destacado);
  db.insertimagen(url, producto_id, destacado)
  .then(() => {
     res.redirect('tabimagen')
  })
  .catch(err => {
    console.log(err);
  })
});


//editar imagen
router.get('/editima/:id', (req, res)=>{
  const id = req.params.id
  db.getimagenID(id)
  .then(data =>{
    console.log(data)
    res.render('editima', {imagen: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editima', {imagen: []})
    })  
})

router.post('/editima/', (req, res)=>{
  const {id, url, producto_id, destacado} = req.body;
  db.updateimagen(id, url, producto_id, destacado)
  .then(() =>{
    res.redirect('/tabimagen');
  })
  .catch(err =>{
    console.log(err);

  })
});


// eliminar imagen
router.get('/deleteima/:id', (req, res)=>{
  const id = req.params.id;
  db.deleteimagen(id)
    .then(() => {
    res.redirect('/tabimagen');
  })
  .catch(err => {
  console.log(err);
  });
})

router.post('/',
    authenticateToken,
    body('full-name').notEmpty(),
    body('card-number').notEmpty().isCreditCard(),
    body('expiration-month').isLength({ min: 1, max: 2 }),
    body('expiration-year').isLength({ min: 4, max: 4 }),
    body('cvv').isLength({ min: 3, max: 4 }),
    body('amount').notEmpty(),
    body('currency').isLength({ min: 3, max: 3 }),
    body('description').notEmpty(),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const card_number = req.body['card-number'];
        const full_name = req.body['full-name'];

        if (!cards.cardExists(card_number)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid card number',
                code: '001',
            });
        }

        if (full_name == 'REJECTED') {
            return res.status(400).json({
                success: false,
                message: 'Card rejected',
                code: '002',
            });
        }

        if (full_name == 'ERROR') {
            return res.status(400).json({
                success: false,
                message: 'Card error',
                code: '003',
            });
        }

        if (full_name == 'INSUFFICIENT') {
            return res.status(400).json({
                success: false,
                message: 'Insufficient funds',
                code: '004',
            });
        }

        const data = {
            transaction_id: uuidv4(),
            amount: req.body['amount'],
            currency: req.body['currency'],
            description: req.body['description'],
            reference: req.body['reference'] ?? null,
            date: new Date().toISOString(),
        }

        await database.insert(data);

        return res.redirect('/payments/' + data.transaction_id);
    });

    router.get('/cards', function (req, res) {
      res.json(cards.getList());
  });


  router.get('/api-key', function (req, res) {
    const payload = {
        name: 'John Doe',
        date: new Date().toISOString(),
    };

    const apiKey = jwt.sign(payload, process.env.JWT_KEY);
    res.json({ apiKey });
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const transaction = await database.select(id);

  if (!transaction) {
      return res.status(404).json({
          success: false,
          message: 'Transaction not found',
          code: '005',
      });
  }

  return res.status(200).json({
      success: true,
      message: 'Payment successful',
      data: transaction,
  });
});



module.exports = router;