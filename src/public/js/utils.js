const DomUtils = {};


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


DomUtils.attachHandlerform = () => {
    DomUtils.onBlurform();
    DomUtils.onSubmitform();
}


DomUtils.attachHandlerServices = () => {
    $("#add").on("click", function(evt){ServicesJava.add();});
    $("#count").on("click", function(evt){ServicesJava.count();});
    $("#getAll").on("click", function(evt){ServicesJava.getAll();});
    $("#addMultiple").on("click", function(evt){ServicesJava.addMultiple();});
}


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