# PictoAPP

**PictoAPP** es una aplicación pensada para el desarrollo del lenguaje en pesonas con **Trastorno del Espectro Autista** o trastornos ligados a la comunicación mediante el lenguaje hablado. Utiliza un sistema de incremento del lenguaje, por medio de imágenes, texto y, en un futuro, sonido. 
**PictoAPP** es una **aplicación híbrida**, basada en Apache Cordova, utilizando Framework7 en las interfaces visuales. 
[Pantalla de inicio de sesión]
https://drive.google.com/file/d/1zoYrVJ2zwgsFOb7kkXdQcOXTLpuOB1r8/view?usp=sharing

## Diseño

El diseño fue pensado para que sea sencillo, pues lo que se prioriza es la funcionalidad de la aplicación, ya que es una herramienta más de trabajo. Está pensada para trabajar con niños de entre 3 a 8 años. Se utiliza una paleta de colores pasteles y proximamente se agregará el modo oscuro, para las personas que tengan sensibilidad visual. 
[Agenda precargada para quienes continuen sin iniciar sesión. ] https://drive.google.com/file/d/1Kil1sLljKHqU_YcfkvSEpwllJzPPt1iB/view?usp=sharing
https://drive.google.com/file/d/1KZf6HlEP7yr6RD11Leg0mb602e-MMcsz/view?usp=sharing

## Base de datos y autenticación 

**PictoAPP** utiliza el servicio de **Firebase** para la **autenticación de usuarios**, que pueden subir sus propias imágenes o buscarlas en un servidor y guardarlas en **CloudFirestore**, mediante la cuenta de e-mail, pudiendo recuperar su información desde cualquier dispositivo al iniciar sesión. Las imágenes son guardadas y recuperadas con el texto que las describa, siendo este también editable y actulizable en la DB.
[Armado de agenda para quienes inician sesión ] https://drive.google.com/file/d/1ZK-FxQNa46G3zpmSGhR0ldV3YYZTqIRE/view?usp=sharing

## API 

Las imágenes que se utilizan pertenecen a ARASAAC, Gobierno de Aragón. Mediante el **buscador**, **PictoAPP** consume esta API, trayendo diversas opciones de imágenes que los usuarios pueden posicionar e ir armando una agenda de actividad. 
[Buscador ] https://drive.google.com/file/d/1Ve3xo2Ol6QWTgYiUe9gaRxkprqlmaPyD/view?usp=sharing
[Menú de opciones ] https://drive.google.com/file/d/1i1h0UjaeDf--vS2Qq0Icv_BNo7vXwGSZ/view?usp=sharing

