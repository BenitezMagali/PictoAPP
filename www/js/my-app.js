
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/agenda1/',
      url: 'agenda1.html',
    },
    {
      path: '/index/',
      url: 'index.html',
      pageName: 'index',
    },
    {
      path: '/login-screen/',
      url: 'login-screen.html',
    },
    {
      path: '/registro/',
      url: 'registro.html',
    },
    {
      path: '/agenda1-registrado/',
      url: 'agenda1-registrado.html',
    },
    {
      path: '/agenda2/',
      url: 'agenda2.html',
    }
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  //app.navbar.show(".navbar", true)
  // Do something here when page loaded and initialized
  console.log(e);

})
//Página de inicio
$$(document).on('page:init', '.page[data-name="index"]', function (e) {

  $$('#login').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/login-screen/')
  })
  $$('#registro').on('click', function () {
    console.log("click sí");
    //mainView.router.navigate('/registro/')
  })
  $$('#agenda').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/agenda/')
  })

})
//Página de inicio de sesión 
$$(document).on('page:init', '.page[data-name="login-screen"]', function (e) {
  app.navbar.hide('.navbar', true, false)
  $$('#volver').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/index/');
  })
 
  $$('#login').on('click', function () {
    var email = $$("#usuario").val();
    var contra = $$("#contra").val();
    console.log(email)
  firebase.auth().signInWithEmailAndPassword(email, contra)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      mainView.router.navigate('/agenda1-registrado/')
        console.log("tu vieja se logueó")
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  })
})

//Página de registro
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  console.log("voy a intentar registrar al usuario")
  app.navbar.hide('.navbar', true, false)


  $$("#loginRegis").on('click', function () {
    var email = $$("#mail").val();
    var contra = $$("#contra").val();
    console.log(email)
    console.log(contra)
    firebase.auth().createUserWithEmailAndPassword(email, contra)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        //var usuario = userCredential.usuario;
        var email = $$("#mail").val();
        // ...
        var db = firebase.firestore();
        var colUsuarios = db.collection("usuarios");
        var id_mail = $$("#mail").val()
        var data = {
          nombre: $$("#usuario").val(),
          rol: $$("#rol").val(),
        }
        console.log("siguiente linea va a intentar hacer el set")
        colUsuarios.doc(id_mail).set(data)
          .then(() => {
            console.log("ok, se creó con el ID:")
            mainView.router.navigate('/agenda1-registrado/')
          })
          .catch(function (datodelerror) {
            console.log("Error" +



              datodelerror)
          })
      })
      .catch(function (error) { //este error es un json HACER UN ALERT 
        console.error(error.code);
        if (error.code == "auth/email-already-in-use") {
          console.error("El mail ya existe");
        }
        console.error(error.message)
      })


    if (contra == $$("#repcontra").val()) {
      console.log("hace click")
      //$$("#loginRegis").on('click', function(){

      //})
    } else {
      if (contra != $$("#repcontra")) {
        console.log("Contraseña incorrecta")
      }
    }
  })
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="agenda1"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  
  var posArriba=0;
  var posAbajo=1;
  $$('.picactual').on('click', function cambiopic() {
    console.log("habemus click")
    if (posAbajo<=6) {
      if (posArriba!=0){
        //mover lo que había a a fila de arriba (posArriba)
        var srcHecho= $$('.picactual').children('img').attr('src')
        $$('#hecho'+posArriba).children('img').attr('src', srcHecho)
        posArriba++;
      }
      //agarra el elemento de abajo y lo pone en "haciendo" (posAbajo)
      var srcDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('src')
      var textoDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('alt')
      $$('.picactual').children('img').attr('src', srcDeLaImagen)
      $$('#texto-picto').text(textoDeLaImagen);

      if (posAbajo==6) {
        $$('#picactual').attr('src', 'img/icons8-estrella-relleno.gif')
      $$('#botonfinal').removeClass('oculto').addClass('visible')
      $$('#texto-picto').text("¡Bien hecho!")
      }
      $$('#hacer' + posAbajo).children('img').attr('src', 'img/icons8-star-struck-48.png')
      posAbajo++;
      if(posArriba==0){
        posArriba++;
      }
    }
  })
    //var pictos = [1, 2, 3, 4, 5]
    //var nombrepic;
    //for (var i = 1; i <= pictos.length; i++) {
      //var srcDeLaImagen = $$('#hacer' + pictos[0]).children('img').attr('src')
      //$$('img').val('src','img/'+nombrepic+'.png')
      //console.log('el src de la imagen tiene como valor ' + srcDeLaImagen)
      //$$('.picactual').children('img').attr('src', srcDeLaImagen)
   // })
  //})
  /*$$('#hacer1').on('click', function() {
    console.log("hay click")
    var srcDeLaImagen = $$('#hacer1').children('img').attr('src')
    console.log('el src de la imagen tiene como valor '+ srcDeLaImagen)
    $$('#picactual').attr('src',srcDeLaImagen)
    for (i=1;i>=pictos.lenght; i++){
      
    }*/

})
