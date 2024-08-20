$(document).ready(function(){
    $.ajax({
        url: '/perfil',
        method: 'POST',
        data: {
            nome: nomeUsuario,
            tipo: tipoUsuario,
            usuario: usuario
        },
        success: function(response){
            $('#perfilInfo').html(response);
        },
        error: function(error){
            console.log('Erro ao buscar informações do perfil: ', error);
        }
    })
})