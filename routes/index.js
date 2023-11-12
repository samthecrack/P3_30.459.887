var express = require('express');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('view')
} )

router.get('/view', (req, res) => {
  res.render('view')
} )

router.get('/destacados', (req, res) => {
  res.render('destacados')
} )

router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )

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

//index
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


router.get('/insertcat', (req, res) => {
  res.render('insertcat')
} )

router.get('/insertima', (req, res) => {
  res.render('insertima')
} )

//insertar producto
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



//editar producto
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

router.get('/administrar', (req, res) =>{
  res.render('administrar')
})

router.get('/tabcategory', (req, res) =>{
  res.render('tabcategory')
})

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