<?php
    function contador()
    {
        $archivo = "contador.txt"; //el archivo que contiene en numero
        $f = fopen($archivo, "r"); //abrimos el archivo en modo de lectura
        if($f)
        {
            $contador = fread($f, filesize($archivo)); //leemos el archivo
            $contador = $contador + 1; //sumamos +1 al contador
            fclose($f);
        }
        $f = fopen($archivo, "w+");
        if($f)
        {
            fwrite($f, $contador);
            fclose($f);
        }
        return $contador;
    }
?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title>Rolitas</title>
    <!-- Compiled and minified CSS -->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />

    <link rel="stylesheet" href="css/rolitas.css" />
  </head>
  <body>
    <nav class="navbar navbar-light" style="background-color: #e3f2fd;">
      <span class="navbar-brand mb-0 h1">Rolitas</span>

      <div class="ml-5" id="numberVisits">
        Visitas : <?php echo contador(); ?>
      </div>
    </nav>

    <div class="container mt-3">
      <!-- Button trigger modal accept=".mp3"-->
      <div class="jumbotron">
        <h3>Upload Rolitas</h3>
        <input type="file" id="Archivo" class="form-control-file" accept=".mp3" />
        <button class="btn btn-info" id="btnSubir">
          <span class="material-icons">
            cloud_queue
            </span>
            Upload
        </button>
        <hr />

        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated bg-info"
            role="progressbar"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
            id="barraProgreso"
          ></div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class=" card reproductorDiv">
            <div class="container mt-3">
              <h3 class="display-5">Playing Now</h3>
              <p class="lead" id="songName"></p>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  id="barraReproductor"
                ></div>
              </div>
              <audio id="audio" ontimeupdate="UpdateBarra(this)">
              </audio>
            </div>
            <div class="botones m-4">
              <!--
              <button type="button" class="btn btn-outline-info controlrepo" id="btnAnterior">
                <span class="material-icons">navigate_before</span>
              </button>-->
              <button type="button" class="btn btn-outline-info" id="btnPause">
                <span class="material-icons">
                  pause
                </span>
              </button>
              <button type="button" class="btn btn-outline-info" id="btnPlay">
                <span class="material-icons">
                  play_arrow
                </span>
              </button>
              <!--<button type="button" class="btn btn-outline-info controlrepo" id="btnSiguiente">
                <span class="material-icons">navigate_next</span>
              </button>-->
            </div>

          </div>
        </div>
        <div class="col-md-8 mt-3">
          <div class="row">
            <h3>Lista de Rolitas</h3>
            <a class="btn btn-success ml-auto btnDown" target="_blank" id="btnDownload"> Download <span class="material-icons">
              cloud_download
              </span></a>
          </div>
          <hr>
          <ul class="list-group" id="listSongs"></ul>
        </div>
      </div>
    </div>
    <!-- Compiled and minified JavaScript -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
      integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
      crossorigin="anonymous"
    ></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-storage.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-firestore.js"></script>
    <script src="js/rolitas.js"></script>
  </body>
</html>
