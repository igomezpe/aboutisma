$(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAOccn0YZvJVaf8Nd72EdNvnk5ar1iSRDU",
    authDomain: "rolitas-b0c7d.firebaseapp.com",
    databaseURL: "https://rolitas-b0c7d.firebaseio.com",
    projectId: "rolitas-b0c7d",
    storageBucket: "rolitas-b0c7d.appspot.com",
    messagingSenderId: "783515532564",
    appId: "1:783515532564:web:f3c6fe9bf6d8b6b41fd601",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  //Inicializacion de variables y estados de controles
  var audio = $("#audio");
  var music = [];

  $("#btnDownload").hide();

  $("#btnSubir").click(function (e) {
    e.preventDefault();
    var sizeFile = $("#Archivo").val();
    if (sizeFile.length > 0) {
      UploadFileToFirebase();
    } else {
      alert("Debe seleccionar un archivo");
    }
  });

  getSongs();
  setMusic();

  $("#btnPlay").click(function (e) {
    e.preventDefault();
    audio[0].play();
  });

  $("#btnPause").click(function (e) {
    e.preventDefault();
    audio[0].pause();
  });

  $("#btnSiguiente").click(function (e) {
    e.preventDefault();

    var audio = $("#audio");
    audio.next;
  });

  function playSong(id) {
    console.log(music[id]);
    audio.attr("src", music[id].data().url);
    $("#songName").html(music[id].data().name);
    $("#btnDownload").attr("href", music[id].data().url);
    $("#btnDownload").attr("download", music[id].data().name);
    audio[0].play();
  }

  function removeclass() {
    $("#listSongs li").removeClass("bg-info");
  }

  function getSongs() {
    $("#listSongs").empty();
    var i = -1;
    db.collection("rolitas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          i += 1;
          $("#listSongs").append(
            "<li class='list-group-item' id ='" +
              i +
              "'>" +
              doc.data().name +
              "</li>"
          );
          audio.attr("src", doc.data().url);
          $("#songName").html(doc.data().name);
        });

        $("#listSongs li").click(function (e) {
          e.preventDefault();
          removeclass();
          $("#btnDownload").show();
          var selectedSong = $(this).attr("id");
          $(this).addClass("bg-info");
          playSong(selectedSong);
        });
      });
  }

  function setMusic() {
    db.collection("rolitas")
      .get()
      .then((query) => {
        query.forEach((item) => {
          music.push(item);
        });
      });
  }

  function lookFiles() {
    $("#Archivo").attr("disabled", true);
    $("#btnSubir").attr("disabled", true);
  }
  function cleanFiles() {
    $("#Archivo").val("");
    $("#Archivo").removeAttr("disabled");
    $("#btnSubir").removeAttr("disabled");
    $("#barraProgreso").attr("style", "width:0%");
  }

  function UploadFileToFirebase() {
    var storageRef = firebase.storage().ref();

    var metadata = {
      contentType: "audio/mp3",
    };

    // var archivo = $("#Archivo").val();
    var archivo = $("#Archivo")[0].files[0];
    var uploadTask = storageRef
      .child("Rolitas/" + archivo.name)
      .put(archivo, metadata);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        //document.getElementById("barraProgreso").style.width=progress+"%";

        $("#barraProgreso").attr("style", "width:" + progress + "%");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            lookFiles();
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;

          case "storage/canceled":
            console.log(" User canceled the upload");
            break;

          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          InsertFirestore(archivo.name, downloadURL);
          console.log(downloadURL);
        });
        cleanFiles();
        getSongs();
      }
    );
  }

  function InsertFirestore(name, url) {
    var objRolita = {
      name: name,
      url: url,
    };

    db.collection("rolitas")
      .add(objRolita)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
});

var music = [];
function UpdateBarra(event) {
  var audio = $("#audio");
  var maxDura = (audio[0].currentTime / audio[0].duration) * 100;
  $("#barraReproductor").attr("style", "width:" + maxDura + "%");
}
