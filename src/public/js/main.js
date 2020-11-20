"use strict";
const URL = "http://localhost:8090";

/**
 * CICLO TEMPORAL 
 */
function clicleTemporal(){
    let iTemptime = 0;
    let iTime = 3000;
    let oInput = $(window.document.body).find("#cliclotemporal");

    iTemptime = oInput.val();
    console.log("Valor en milisegundos:" + iTemptime);

    if(iTemptime && !isNaN(iTemptime)){
        iTime = iTemptime;
    }
    // GET
    setInterval(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => console.log(json));
    }, iTime);
    // PUT
    setInterval(() => {
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
 * 
 */
const DomUtils = {};



/**
 * 
 */
DomUtils.isValidform = (input) => {
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

/**
 * 
 */
DomUtils.onBlurform = () => {
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
                $(this).parent().removeClass('alert-validate');
            }else {
                $(this).removeClass('has-val');
            }
        });
    });
}

/**
 * 
 */
DomUtils.onSubmitform = () => {
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(DomUtils.isValidform(input[i]) == false){
                $(input[i]).parent().addClass('alert-validate');
                check=false;
            }
        }
        return check;
    });
}

/**
 * 
 */
DomUtils.attachHandlerform = () => {
    DomUtils.onBlurform();
    DomUtils.onSubmitform();
    DomUtils.onFocusform();
}

/**
 * 
 */
DomUtils.attachHandlerServices = () => {
    $("#add").on("click", function(evt){ServicesJava.add();});
    $("#count").on("click", function(evt){ServicesJava.count();});
    $("#getAll").on("click", function(evt){ServicesJava.getAll();});
}

/**
 * 
 */
DomUtils.refreshTable = async function(oData){
    let oUlheader = $(".panel .panel-heading span:nth-child(2)");
    let oUl = $(".panel .panel-body .list-group");
    oUlheader.text(oData.length);
    oUl.children().remove();
    if(oData.length === -1){
        oUl.append(`<li class="list-group-item"><strong>No existen registros</strong></li>`);
    }else{
        oData.forEach(list => {
            oUl.append(`<li class="list-group-item">${list.description}</li>`);
        });
    }
}


/**
 * 
 */
const ServicesJava = {};

/**
 * 
 */
ServicesJava.add = async function(){
    await fetch (URL+"/add?descripcion="+encodeURIComponent("Petición enviada desde Front-end"));
    await ServicesJava.getAll();
}

/**
 * 
 */
ServicesJava.count = async function(){
    const url = URL+"/count";
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    $('#myModal .modal-body').text(response);
    $('#myModal').modal('show');
}

/**
 * 
 */
ServicesJava.get = async function(sId){
    const url = URL+"/get="+encodeURIComponent(sId);
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    console.log(response);
    return response;        
}

/**
 * 
 */
ServicesJava.getAll = async function(){
    const url = URL+"/getAll";
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    await DomUtils.refreshTable(response);
    return response;        
}

/**
 * 
 */
$(document).ready(function () {
    // Eventos de Servicios
    DomUtils.attachHandlerServices();

    // Eventos de registro
    DomUtils.attachHandlerform();

});