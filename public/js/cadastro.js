$(document).ready(function(){
    $('.btn-cadastro').submit(function(){
        let cad_usuario = $('#cad_usuario').val()
        let cad_senha = $('#cad_senha').val()
        let conf_senha = $('#conf_senha').val()

         // Verifica se as senhas coincidem
         if (cad_senha !== conf_senha) {
            alert('As senhas não conferem!');
            return;
        }

        // Envia os dados para o servidor via AJAX
        $.ajax({
            url: '/cadastro', // URL da rota no servidor para cadastrar o usuário
            method: 'POST',
            data: {
                usuario: cad_usuario,
                senha: cad_senha
            },
            success: function(response) {
                // Se o cadastro for bem-sucedido, exibe uma mensagem de sucesso
                alert('Cadastro realizado com sucesso!');
                // Redireciona para a página de login
                window.location.href = '/login';
            },
            error: function(error) {
                // Se ocorrer um erro, exibe uma mensagem de erro
                alert('Erro ao cadastrar usuário: ' + error);
            }
        });
    })


})