<!DOCTYPE html>
<html>
   <head>
      <title>KARTE</title>
      <meta charset="utf-8">
      <meta name="description" content="Traveling HTML5 Template" />
      <meta name="author" content="Design Hooks" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway:400,700" rel="stylesheet" />
      <link href="img/favicon.png" type="image/x-icon" rel="shortcut icon" />
      <link href="css/screen.css" rel="stylesheet" />
   </head>
   <body class="home" id="page">
      <!-- Header -->
      <header class="main-header">
         <div class="container">
            <div class="header-content">
               <a href="index.php">
                  <img src="img/Logo inicial.png" alt="site identity" />
               </a>

            </div>
         </div>
      </header>

      <!-- Main Content -->
      <div class="content-box">
         <!-- Hero Section -->
         <section class="section section-hero">
            <div class="hero-box">
            <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red">KARTE</h1>
                     <p>Consultas de bases de datos</p>
                  </div>

                  <form class="destinations-form" action="consultas/1.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta1" value="Filtrar tabla Usuarios por username y correo." class="form-input check-value" disabled/>
                        <button type="submit" name="enviado" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>
               </div>

               <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red"></h1>
                     
                  </div>

                  <form class="destinations-form" action="consultas/2.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta2" value="" class="form-input check-value" placeholder="Filtrar ciudades de un país. Ingrese país:" />
                        <button type="submit" name="enviado2" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>

               </div>

               <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red"></h1>
                     
                  </div>

                  <form class="destinations-form" action="consultas/3.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta3" value="" class="form-input check-value" placeholder="Filtrar los paises en lo que se ha hospedado un usuario. Ingrese username:" />
                        <button type="submit" name="enviado3" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>
                  
               </div>
               <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red"></h1>
                     
                  </div>

                  <form class="destinations-form" action="consultas/4.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta4" value="" class="form-input check-value" placeholder="Filtrar dinero gastado por usuario en tickets. Ingrese id de usuario:" />
                        <button type="submit" name="enviado2" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>

               </div>
               <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red"></h1>
                     
                  </div>

                  <form class="destinations-form" action="consultas/5.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta5" value="Filtrar reservas desde el 01/01/2020 - 31/03/2020" class="form-input check-value" placeholder="" disabled/>
                        <button type="submit" name="enviado2" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>

               </div>

               <div class="container">
                  <div class="hero-text align-center">
                  <h1 color="red"></h1>
                     
                  </div>

                  <form class="destinations-form" action="consultas/6.php" method="get">
                     <div class="input-line">
                     <input type="text" name="pregunta6" value="" class="form-input check-value" placeholder="Filtrar dinero gastado en tickets por usuario entre fechas. <br> Ingrese fecha inicio y fecha fin separado por una coma." />
                        <button type="submit" name="enviado2" class="form-submit btn btn-special">Filtrar</button>
                     </div>
                  
                  </form>

               </div>
               
            </div>
         


      <!-- Footer -->
      <footer class="main-footer">
         <div class="container">
            <div class="row">
               <div class="col-md-5">
                  <div class="widget widget_links">
                     <h5 class="widget-title"></h5>
                     <ul>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                     </ul>
                  </div>
               </div>

               <div class="col-md-5">
                  <div class="widget widget_links">
                     <h5 class="widget-title"></h5>
                     <ul>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                     </ul>
                  </div>
               </div>

               <div class="col-md-9">
                  <div class="widget widget_social">
                     

                     <ul class="clean-list social-block">
                     </ul>
                  </div>
               </div>

               <div class="col-md-5">
                  <div class="widget widget_links">
                     <h5 class="widget-title">Created by:</h5>
                     <ul>
                        <li><a href="#">Tamara Erdmann</a></li>
                        <li><a href="#">Matias Cea</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </footer>

      <!-- Scripts -->
      <script src="js/jquery.js"></script>
      <script src="js/functions.js"></script>
   </body>
</html>
