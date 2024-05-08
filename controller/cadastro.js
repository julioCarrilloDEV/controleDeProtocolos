$(document).ready(function(){
    console.log('Documento cadastro rodando hehe')
    $('.btn-cadastro').click(function(){
        
        let cad_nome = $('#cad_nome').val();
        let cad_usuario = $('#cad_usuario').val()
        let cad_senha = $('#cad_senha').val()
        let conf_senha = $('#conf_senha').val()

        // Verifica se as senhas coincidem
        if (cad_senha !== conf_senha) {
            alert('As senhas não conferem!');
            console.log('Senha: '+ cad_senha);
            console.log('Senha: '+ conf_senha);
        }else{

            // Envia os dados para o servidor via AJAX
            $.ajax({
                url: '/cadastro', // URL da rota no servidor para cadastrar o usuário
                method: 'POST',
                data: {
                    nome: cad_nome,
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
        }

    })


})