 $(document).ready(function(){

     // Função para obter o valor de uma query string
     function pegarValorStatus(key) {
        return new URLSearchParams(window.location.search).get(key);
    }
    
    // Verificar o status na query string
    const status = pegarValorStatus('status');
    if (status === 'successPw') {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Senha atualizada com sucesso!'
        });
    } else if (status === 'errorPw') {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao atualizar a senha. Tente novamente.'
        });
    } else if (status === 'wrong_password') {
        Swal.fire({
            icon: 'error',
            title: 'Senha atual incorreta.'
        });
    } else if (status === 'password_mismatch') {
        Swal.fire({
            icon: 'error',
            title: 'A nova senha e a confirmação não coincidem.'
        });
    } else if (status === 'successEdit') {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Dados atualizados com sucesso!'
        });
    } else if (status === 'errorEdit') {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao atualizar os dados. Tente novamente.'
        });
    }
 })