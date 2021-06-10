  
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
        path: '/agenda/',
        url: 'agenda.html',
      },
      {
        path: '/index/',
        url: 'index.html',
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
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});
// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
    
})
//Página de inicio
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$('#login').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/login-screen/');
  });
  $$('#registro').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/registro/');
  });
  $$('#agenda').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/agenda/');
  });
})
  //Página de inicio de sesión 
$$(document).on('page:init', '.page[data-name="login-screen"]', function (e) {
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
  


//Página de registro
  $$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  var email = "usuario@dominio.com";
  var clave = "1234Abc";
  firebase.auth().createUserWithEmailAndPassword(email, clave)
  .then((userCredential) => {
    // Signed in
    console.log("tu vieja se registró")
    var user = userCredential.user;
    var email= $$("#email")
    // ...
    
  })
  .catch(function(error){ //este error es un json
    console.error(error.code);
    if (error.code == "auth/email-already-in-use"){
      console.error("El mail ya existe");
    }
    console.error(error.message)
  });
  })
  $$(document).on('click', function () {
    $$('#iniciarsesionR').on('click', '/index/')
  })
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="agenda"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
  console.log(e);
  alert('Hello');
})
  