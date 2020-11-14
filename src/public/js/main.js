(function ($) {
    "use strict";
    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }else {
                $(this).removeClass('has-val');
            }
        });
    });

    /*==================================================================
    [ Validate ]*/
    let isValid = (input) => {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    var input = $('.validate-input .input100');
    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(isValid(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        return check;
    });

    /**
     * 
     */
    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });



    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);

/**
 * CICLO TEMPORAL 
 */
function clicleTemporal(){
    let bClear = false;
    let iTemptime = 0;
    let iTime = 3000;
    let oInput = $(window.document.body).find("#cliclotemporal");

    iTemptime = oInput.val();
    console.log("Valor en milisegundos:" + iTemptime);

    if(iTemptime && !isNaN(iTemptime)){
        iTime = iTemptime;
    }
    // GET
    var intervalGet = setInterval(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => console.log(json));
    }, iTime);
    // PUT
    var intervalPut = setInterval(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(json => console.log(json))
    }, iTime);

}

/**
 * Llamadas a microservicios Java
 */
function manageJavaMicro(e){
    try {
        if(e){
            var url = "";
            var sTypefetch = e.id    
            var iRandom = Math.floor(Math.random() * (1000 - 1)) + 1;
            switch (sTypefetch) {
                case "add":
                   url="http://localhost:8090/add?descripcion=Descripcininsertada%20para%20probar"
                break;
                case "get":
                    url="http://localhost:8090/get/"+String(iRandom);
                break;
                case "delete":
                    url="http://localhost:8090/delete/"+String(iRandom);
                break;
            }
            if(url){
                fetch(url,{
                    'mode': 'no-cors',
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                    }
                }).then(function(response) {
                    if(response.ok) {
                        console.log('PETICION JAVA MICROSERVICIOS SUCCES');
                    } else {
                      console.log('RESPUESTA DE RED : OK | RESPUESTA DE HTTP : FAIL');
                    }
                  })
                .catch(function(error) {
                    console.log('ERROR PETICIÓN FETCH : ' + error.message);
                });
            }
        }
    } catch (t) {
        console.log("[ERROR] - manageJavaMicro :" + t);        
    }
}

