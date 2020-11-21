const ServicesJava = {};

ServicesJava.addMultiple = function(){
    for (let i = 0; i < 100; i++) {
        ServicesJava.add("Inserción multiple en DB", (i == 99 ? false : true));
        // ServicesJava.add("Inserción multiple en DB");
    }
}

ServicesJava.add = async function(sVal = "Inserción simple en DB", bIgnorerender){
    await fetch (URL+"/add?descripcion="+encodeURIComponent(sVal));
    if(!bIgnorerender){await ServicesJava.getAll();}
}

ServicesJava.count = async function(){
    const url = URL+"/count";
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    $('#myModal .modal-body').text(response);
    $('#myModal').modal('show');
}

ServicesJava.get = async function(sId){
    const url = URL+"/get="+encodeURIComponent(sId);
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    console.log(response);
    return response;        
}

ServicesJava.getAll = async function(){
    const url = URL+"/getAll";
    var respuesta = await fetch(url);
    var response = await respuesta.json();
    await DomUtils.refreshTable(response);
    return response;        
}