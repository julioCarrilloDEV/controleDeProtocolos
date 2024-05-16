//Documento criado para recuperar dados do usuário logado, como nome e tipo de usuário. 
$(document).ready(function(){
    $.ajax({
        url: '/home',
        method: 'GET',
        dataType: 'json',
        success: function(data){
            console.log('Dados recebidos: ', data)
        },
        error: function(error){
            console.error('Erro: ', error);
        }
    })
})