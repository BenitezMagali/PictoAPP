
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
  app.navbar.show(".navbar", true)
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
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      $$("#iniciasesion").on('click', function () {
        mainView.router.navigate('/agenda/')
        console.log("tu vieja se logueó")
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
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
          .then(() =>  {
            console.log("ok, se creó con el ID:")
            mainView.router.navigate('/agenda1/')
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
})
