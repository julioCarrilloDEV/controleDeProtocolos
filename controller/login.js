$(document).ready(function(){
    console.log('Controle de login funcionando');
    $('#btn-login').click(function(){
        let login_usuario = $('#usuario').val();
        let senha_usuario = $('#senha').val();

        // Certifique-se de que os valores sejam strings
        login_usuario = String(login_usuario);
        senha_usuario = String(senha_usuario);

        $.ajax({
            url: '/login',
            method: 'POST',
            data:{
                usuario: login_usuario,
                senha: senha_usuario
            },
            success: function(response){
                console.log('Caiu na response? '+ response)
                // Verifica se o login foi bem-sucedido
                if (response && response.user) {
                    // Define os dados do usuário na sessão
                    //req.session.usuario = response.user;
                    // Redireciona para a página de perfil do usuário
                    window.location.href = '/home';
                } else {
                    console.log('Caiu nesse else do controller')
                    // Se as credenciais estiverem incorretas, redireciona de volta para a página de login
                    window.location.href = '/login';
                }
            },
            error: function(error){
                console.log('Erro ao fazer login: '+ error);
            }
        })
    })
})