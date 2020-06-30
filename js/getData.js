$(document).ready(function () {

    function getAbout(){
        $.ajax({
            url : '/about',
            data : {},
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                console.log(json.about);
               $("#lblName").html(json.about.name + " "+ json.about.lastname);
               $("#lblDescription").html(json.about.description);
               $("#lblAdress").html(json.about.adress);
               $("#lblEmail").html(json.about.email);
               $("#lblPhone").html(json.about.phone);
               $("#lblDNI").html("DNI | "+json.about.dni);
            },
            error : function(xhr, status) {
                console.log('Disculpe, existió un problema');
            },
            complete : function(xhr, status) {
            }
        });
    };

    getAbout();
    $('#myTab li:last-child a').tab('show');

});