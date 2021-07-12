
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
      keepAlive: true,
    },
    {
      path: '/buscador/',
      url: 'buscador.html',
    },
    {
      path: '/paginicio/',
      url: 'paginicio.html',
      keepAlive: true,
    },
  ]
});

var mainView = app.views.create('.view-main');
//------------------------Variables globales------------------
var urlImagen;
var picName;
var hacer = [];
var clickEn;
var foto;
var texto;
var db;
var colAgendas;
var email;
var nuevoNombre;
var usuario;
var newname;
var nombredeagenda;
var id_agenda;
var pictosrecatados;
var editando;
//------------------------------------------------------------
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
//------------------------Index---------------------------------------
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
//----------------------Página de inicio de sesión ----------------------------
$$(document).on('page:init', '.page[data-name="login-screen"]', function (e) {
  app.navbar.hide('.navbar', true, false)
  $$('#volver').on('click', function () {
    console.log("click sí");
    mainView.router.navigate('/index/');
  })

  $$('#login').on('click', function () {
    email = $$("#usuario").val();
    contra = $$("#contra").val();

    firebase.auth().signInWithEmailAndPassword(email, contra)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        mainView.router.navigate('/paginicio/')
        console.log("tu vieja se logueó")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (error.code == "auth/wrong-password") {
          app.toast.create({
            text: "Contraseña incorrecta. Vuelve a intentarlo",
            closeTimeout: 3000,
            position: 'center'
          }).open();
        }

        if (error.code == "auth/user-not-found") {
          app.toast.create({
            text: "Usuario no registrado. Vuelve a intentarlo",
            closeTimeout: 3000,
            position: 'center'
          }).open();
        }
      })
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {

      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  })
})

//-----------------------Página de registro---------------------------------
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  console.log("voy a intentar registrar al usuario")
  app.navbar.hide('.navbar', true, false)
  $$("#loginRegis").on('click', function () {
    var email = $$("#mail").val();
    var contra = $$("#contra").val();
    firebase.auth().createUserWithEmailAndPassword(email, contra)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        //var usuario = userCredential.usuario;
        email = $$("#mail").val();
        // ...
        var db = firebase.firestore();
        var colUsuarios = db.collection("usuarios");
        var id_mail = $$("#mail").val()
        var data = {
          nombre: $$("#usuario").val(),
          rol: $$("#rol").val(),
        }
        colUsuarios.doc(id_mail).set(data)
          .then(() => {
            console.log("ok, se creó con el ID:")
            mainView.router.navigate('/agenda1-registrado/')
          })
          .catch(function (datodelerror) {
            console.log("Error" + datodelerror)
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
    } else {
      if (contra != $$("#repcontra")) {
        console.log("Contraseña incorrecta")
      }
    }
  })
})

// ----------Agenda pre-cargada para quienes ingresen sin loguearse-------
$$(document).on('page:init', '.page[data-name="agenda1"]', function (e) {
  console.log(e);

  var posArriba = 0;
  var posAbajo = 1;
  $$('.picactual').on('click', function cambiopic() {
    console.log("habemus click")
    if (posAbajo <= 6) {
      if (posArriba != 0) {
        //mover lo que había a a fila de arriba (posArriba)
        var srcHecho = $$('.picactual').children('img').attr('src')
        $$('#hecho' + posArriba).children('img').attr('src', srcHecho)
        posArriba++;
      }
      //agarra el elemento de abajo y lo pone en "haciendo" (posAbajo)
      var srcDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('src')
      var textoDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('alt')
      $$('.picactual').children('img').attr('src', srcDeLaImagen)
      $$('#texto-picto').text(textoDeLaImagen);

      if (posAbajo == 6) {
        $$('#picactual').attr('src', 'img/icons8-estrella-relleno.gif')
        $$('#botonfinal').removeClass('oculto').addClass('visible')
        $$('#texto-picto').text("¡Bien hecho!")
      }
      $$('#hacer' + posAbajo).children('img').attr('src', 'img/icons8-star-struck-48.png')
      posAbajo++;
      if (posArriba == 0) {
        posArriba++;
      }
    }
    /*$$('#escuchar').on('click', function () {

        // basic usage
        TTS.speak('p', function () {
          alert('success');
        }, function (reason) {
          alert(reason);
        });
    })*/
  })
})
//----------------------Menú de inicio para registrados-------------------------
$$(document).on('page:init', '.page[data-name="paginicio"]', function (e) {
  $$('#signout').on('click', function () {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  })
  $$('#crearagendanueva').on('click', function () {
    editando = true
    mainView.router.navigate('/agenda2/')
    mainView.router.refreshPage('/agenda2/')
  })
  db = firebase.firestore();
  colAgendas = db.collection("agendas");
  colAgendas.where("usuario", "==", email).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var colordeagenda = doc.data().color;
        nombredeagenda = doc.id;
        var agendadelusuario = `
    <div class="`+ colordeagenda + `"><p class="cardmenu">` + nombredeagenda + `</p>
    <div class="card-content card-content-padding">
        <a href="#" class="link right"><i
                class="icon material-icons cardmenu" id="playagenda1">play_circle_filled</i></a><a href="#" class="link left"><i
                class="icon material-icons cardmenu">edit</i></a>
    </div>
    </div>`
        var agendaenmenu = `
          <div class="item-content">
            <div class="item-inner">
             <div class="item-title">`+ nombredeagenda + `</div>
          </div>
          </div>`
        $$('.page-content').append(agendadelusuario);
        $$('.accordion-item-content').children('.list').append(agendaenmenu);
      });
      $$('#playagenda1').on('click', function () {
        var nombrecito = this.parentElement.parentElement.parentElement.children[0].innerText;
        $$('#primeraetapa').addClass('oculto2')
        console.log("entré")
        editando = false;
        mainView.router.navigate('/agenda2/');
        colAgendas.where("nombre", "==", nombrecito).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              pictosrecatados = doc.data().pictogramas;
              $$('#tituloagenda').text(nombrecito)
              for (i = 0; i < 5; i++) {
                $$('#hacer' + (i + 1)).children('img').attr('src', pictosrecatados[i].foto).removeClass('pq')
                $$('#hacer' + (i + 1)).children('img').attr('alt', pictosrecatados[i].texto).removeClass('pq')
                console.log(pictosrecatados[i])
              }

            })
          })
          .catch((error) => {
            console.log(error.code)
          })
      })




    })
})

//-------------------Agenda para personalizar-----------------------
$$(document).on('page:init', '.page[data-name="agenda2"]', function (e) {
  if (editando == true) {

    //----Buscar en SoyVisual----------------------------------------
    $$('.open-confirm').on('click', function () {
      app.dialog.confirm('Desgcargar material e importar desde galería?', 'Ir a #SoyVisual', function () {
        mainView.router.navigate()
      });
    });

    //----Buscar en ARASAAC ---------------------------------------

    $$('#hacer1').on('click', function () {
      clickEn = 1;
      console.log('hice click en 1')
    })

    $$('#hacer2').on('click', function () {
      clickEn = 2;
      console.log('hice click en 2')
    })

    $$('#hacer3').on('click', function () {
      clickEn = 3;
      console.log('hice click en 3')
    })
    $$('#hacer4').on('click', function () {
      clickEn = 4;
      console.log('hice click en 4')
    })
    $$('#hacer5').on('click', function () {
      clickEn = 5;
      console.log('hice click en 5')
    })

    //---------Opciones en guardar agenda----
    $$('#nombreagenda').on('change', function () {
      nuevoNombre = $$('#nombreagenda').val();
      $$('#nuevonomb').text(nuevoNombre);
    })

    $$('.menu-dropdown-link').on('click', function () {
      var color = this.id;
      switch (color) {
        case "verde":
          $$('#preview').removeClass('color-azul', 'color-violeta', 'color-rojo', 'color-amarillo').addClass('color-verde')
          $$('#seleccolor').text(color)
          break;
        case "azul":
          $$('#preview').removeClass('color-verde', 'color-violeta', 'color-rojo', 'color-amarillo').addClass('color-azul')
          $$('#seleccolor').text(color)
          break;
        case "violeta":
          $$('#preview').removeClass('color-azul', 'color-verde', 'color-rojo', 'color-amarillo').addClass('color-violeta')
          $$('#seleccolor').text(color)
          break;
        case "rojo":
          $$('#preview').removeClass('color-azul', 'color-violeta', 'color-verde', 'color-amarillo').addClass('color-rojo')
          $$('#seleccolor').text(color)
          break;
        case "amarillo":
          $$('#preview').removeClass('color-azul', 'color-violeta', 'color-rojo', 'color-verde').addClass('color-amarillo')
          $$('#seleccolor').text(color)
          break;
        default:
          break;
      }
    })
    //-------Modificar el nombre de cada pictograma
    $$('.open-prompt').on('click', function () {
      app.dialog.prompt('Nuevo texto de pictograma', 'Modificar texto', function (newname) {
        var clicki= [1,2,3,4,5]
        switch (clicki) {
          case 1:
            $$('#hacer'+clicki).children('img').attr('alt', newname);
            $$('#picejemplo'+clicki).text(newname)
            
            break;
            case 2:
            $$('#hacer'+clicki).children('img').attr('alt', newname);
            $$('#picejemplo'+clicki).text(newname)
            
            break;
            case 3:
            $$('#hacer'+clicki).children('img').attr('alt', newname);
            $$('#picejemplo'+clicki).text(newname)
            
            break;
            case 4:
            $$('#hacer'+clicki).children('img').attr('alt', newname);
            $$('#picejemplo'+clicki).text(newname)
            
            break;
            case 5:
            $$('#hacer'+clicki).children('img').attr('alt', newname);
            $$('#picejemplo'+clicki).text(newname)
            break;
          default:
            break;
        }
      })
    });
    //-----guardar todo en la base de datos------
    $$('#guardar').on('click', function () {
      var agendaAGuardar = {
        "pictogramas": [
          {
            foto: "",
            texto: ""
          },
          {
            foto: "",
            texto: ""
          },
          {
            foto: "",
            texto: ""
          },
          {
            foto: "",
            texto: ""
          },
          {
            foto: "",
            texto: ""
          }
        ],
        "color": "",
        "usuario": email,
        "nombre": nuevoNombre,
      }

      agendaAGuardar.pictogramas[0].foto = $$('#hacer1').children('img').attr('src');
      agendaAGuardar.pictogramas[0].texto = $$('#hacer1').children('img').attr('alt');
      agendaAGuardar.pictogramas[1].foto = $$('#hacer2').children('img').attr('src');
      agendaAGuardar.pictogramas[1].texto = $$('#hacer2').children('img').attr('alt');
      agendaAGuardar.pictogramas[2].foto = $$('#hacer3').children('img').attr('src');
      agendaAGuardar.pictogramas[2].texto = $$('#hacer3').children('img').attr('src');
      agendaAGuardar.pictogramas[3].foto = $$('#hacer4').children('img').attr('src');
      agendaAGuardar.pictogramas[3].texto = $$('#hacer4').children('img').attr('alt');
      agendaAGuardar.pictogramas[4].foto = $$('#hacer5').children('img').attr('src');
      agendaAGuardar.pictogramas[4].texto = $$('#hacer5').children('img').attr('alt');
      agendaAGuardar.color = $$('#preview').attr('class')

      var db = firebase.firestore();
      var colAgendas = db.collection("agendas");
      id_agenda = nuevoNombre;

      colAgendas.doc(id_agenda).set(agendaAGuardar)
        .then(() => {
          console.log("ok, se creó con el ID:" + id_agenda)
        })
        .catch(() => {
          console.log("no se creó nada")
        }
        )
    })
    $$('#playagenda').on('click', function () {
      $$('#primeraetapa').addClass('oculto')
      var plus = $$('#hacer' + clickEn).children('img').attr('img', 'img/icons8-add-24.png')
      if (plus == true) {
        $$('#hacer' + clickEn).children('img').attr('img', 'img/0.png')
      }

      var posArriba = 0;
      var posAbajo = 1;
      $$('.picactual').on('click', function cambiopic() {
        console.log("habemus click")
        if (posAbajo <= 6) {
          if (posArriba != 0) {
            //mover lo que había a a fila de arriba (posArriba)
            var srcHecho = $$('.picactual').children('img').attr('src')
            $$('#hecho' + posArriba).children('img').attr('src', srcHecho)
            posArriba++;
          }
          //agarra el elemento de abajo y lo pone en "haciendo" (posAbajo)
          var srcDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('src')
          var textoDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('alt')
          $$('.picactual').children('img').attr('src', srcDeLaImagen)
          $$('#texto-picto').text(textoDeLaImagen);

          if (posAbajo == 6) {
            $$('#picactual').attr('src', 'img/icons8-estrella-relleno.gif')
            $$('#botonfinal').removeClass('oculto').addClass('visible')
            $$('#texto-picto').text("¡Bien hecho!")
          }
          $$('#hacer' + posAbajo).children('img').attr('src', 'img/icons8-star-struck-48.png')
          posAbajo++;
          if (posArriba == 0) {
            posArriba++;
          }
        }
      })
    })
  } else
    if (editando == false) {
      //--------Traer de la BD la agenda guardada-------------
      $$('#playagenda').on('click', function () {
        $$('#primeraetapa').addClass('oculto')

        var posArriba = 0;
        var posAbajo = 1;
        $$('.picactual').on('click', function cambiopic() {
          console.log("habemus click")
          if (posAbajo <= 6) {
            if (posArriba != 0) {
              //mover lo que había a a fila de arriba (posArriba)
              var srcHecho = $$('.picactual').children('img').attr('src')
              $$('#hecho' + posArriba).children('img').attr('src', srcHecho)
              posArriba++;
            }
            //agarra el elemento de abajo y lo pone en "haciendo" (posAbajo)
            var srcDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('src')
            var textoDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('alt')
            $$('.picactual').children('img').attr('src', srcDeLaImagen)
            $$('#texto-picto').text(textoDeLaImagen);

            if (posAbajo == 6) {
              $$('#picactual').attr('src', 'img/icons8-estrella-relleno.gif')
              $$('#botonfinal').removeClass('oculto').addClass('visible')
              $$('#texto-picto').text("¡Bien hecho!")
            }
            $$('#hacer' + posAbajo).children('img').attr('src', 'img/icons8-star-struck-48.png')
            posAbajo++;
            if (posArriba == 0) {
              posArriba++;
            }
          }
        })
      })
    }
    $$('#volver1').on('click', function () {
      app.routes[5].keepAlive = false;
      mainView.router.navigate('/paginicio/')
    })
    $$('#crearnuevo').on('click', function () {
     app.routes[5].keepAlive = false;
      mainView.router.refreshPage('/agenda2/');
      editando=true;
      app.routes[5].keepAlive=true;
      mainView.router.refreshPage('/agenda2/');
    })
  })
//-----------------Agenda precargargada para quienes se registran--------------------------------
$$(document).on('page:init', '.page[data-name="agenda1-registrado"]', function (e) {
  var posArriba = 0;
  var posAbajo = 1;
  $$('.picactual').on('click', function cambiopic() {
    console.log("habemus click")
    if (posAbajo <= 6) {
      if (posArriba != 0) {
        //mover lo que había a a fila de arriba (posArriba)
        var srcHecho = $$('.picactual').children('img').attr('src')
        $$('#hecho' + posArriba).children('img').attr('src', srcHecho)
        posArriba++;
      }
      //agarra el elemento de abajo y lo pone en "haciendo" (posAbajo)
      var srcDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('src')
      var textoDeLaImagen = $$('#hacer' + posAbajo).children('img').attr('alt')
      $$('.picactual').children('img').attr('src', srcDeLaImagen)
      $$('#texto-picto').text(textoDeLaImagen);

      if (posAbajo == 6) {
        $$('#picactual').attr('src', 'img/icons8-estrella-relleno.gif')
        $$('#botonfinal').removeClass('oculto').addClass('visible')
        $$('#texto-picto').text("¡Bien hecho!")
      }
      $$('#hacer' + posAbajo).children('img').attr('src', 'img/icons8-star-struck-48.png')
      posAbajo++;
      if (posArriba == 0) {
        posArriba++;
      }
    }
  })

  $$('#volver').on('click', function () {
    app.routes[5].keepAlive = false;
    mainView.router.navigate('/paginicio/')
  })
})
//------------Página del buscador de pictos en ARASAAC-----------------
$$(document).on('page:init', '.page[data-name="buscador"]', function (e) {
  console.log(e);
  var searchbar = app.searchbar.create({
    el: '.searchbar',
  })
  $$('#buscar').on('click', function () {
    var buscando = $$('#buscador').val();
    var url = "https://api.arasaac.org/api/pictograms/es/search/" + buscando;
    app.request.json(url, function (encontrados) {
      console.log(encontrados)
      for (i = 0; i <= encontrados.length; i++) {
        id = encontrados[i]._id;
        urlImagen = "https://static.arasaac.org/pictograms/" + id + "/" + id + "_500.png"
        $$('#imagen' + (i + 1)).attr('src', urlImagen);
        var picName = encontrados[i].keywords[0].keyword;
        $$('#picName' + (i + 1)).text(picName)
        $$('#encontrado' + (i + 1)).removeClass('oculto').on('click', function () {
          switch (clickEn) {
            case 1:
              foto = this.children[0].src
              texto = this.children[1].innerHTML
              $$('#hacer' + clickEn).children('img').attr('src', foto).attr('alt', texto).removeClass('pq')
              $$('#ejemplo' + clickEn).children('img').attr('src', foto)
              $$('#picejemplo' + clickEn).text(texto)
              mainView.router.navigate('/agenda2/')
              break;
            case 2:
              foto = this.children[0].src
              texto = this.children[1].innerHTML
              $$('#hacer' + clickEn).children('img').attr('src', foto).attr('alt', texto).removeClass('pq')
              $$('#ejemplo' + clickEn).children('img').attr('src', foto)
              $$('#picejemplo' + clickEn).text(texto)
              mainView.router.navigate('/agenda2/')
              break;
            case 3:
              foto = this.children[0].src
              texto = this.children[1].innerHTML
              $$('#hacer' + clickEn).children('img').attr('src', foto).attr('alt', texto).removeClass('pq')
              $$('#ejemplo' + clickEn).children('img').attr('src', foto)
              $$('#picejemplo' + clickEn).text(texto)
              mainView.router.navigate('/agenda2/')
              break;
            case 4:
              foto = this.children[0].src
              texto = this.children[1].innerHTML
              $$('#hacer' + clickEn).children('img').attr('src', foto).attr('alt', texto).removeClass('pq')
              $$('#ejemplo' + clickEn).children('img').attr('src', foto)
              $$('#picejemplo' + clickEn).text(texto)
              mainView.router.navigate('/agenda2/')
              break;
            case 5:
              foto = this.children[0].src
              texto = this.children[1].innerHTML
              $$('#hacer' + clickEn).children('img').attr('src', foto).attr('alt', texto).removeClass('pq')
              $$('#ejemplo' + clickEn).children('img').attr('src', foto)
              $$('#picejemplo' + clickEn).text(texto)
              mainView.router.navigate('/agenda2/')
              break;
            default:
              break;
          }
        })
      }
    })
  });
  $$('#clear').on('click', function () {
    $$('.itemcito').addClass('oculto')
  })
  $$('#buscador').on('click', function () {
    $$('.itemcito').addClass('oculto')
  })
})
