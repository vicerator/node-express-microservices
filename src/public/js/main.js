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

$(document).ready(function () {
    // Eventos de Servicios
    DomUtils.attachHandlerServices();

    // Eventos de registro
    DomUtils.attachHandlerform();
});