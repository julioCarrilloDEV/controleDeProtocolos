$(document).ready(function(){
    $('#btn-login').click(function(){
        let login_usuario = $('#usuario').val();
        let senha_usuario = $('#senha').val();

        $.ajax({
            url: '/login',
            method: 'POST',
            data:{
                usuario: login_usuario,
                senha: senha_usuario
            },
            success: function(data){
                window.location.href = '/home';
                req.session.usuario = data.usuario;
            },
            error: function(){
                alert('Error ao fazer login. Usuário ou senha incorretos.')
            }
        })
    })
})