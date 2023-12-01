var express = require('express');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()


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
  res.render('compra') 
} )


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

module.exports = router;