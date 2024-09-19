$(document).ready(function(){
    $.ajax({
        url: '/api/favoritos',
        method: 'GET',
        success: function(data){
            const favoritosTable = $('#tabela-favoritos');
            data.forEach(favorito => {
                favoritosTable.append(`
                    <tr>
                        <td>${favorito.descricao}</td>
                        <td></td>
                    </tr>
                    `); 
            });
        },
        error: function(error){
            console.error('Erro ao buscar favoritos:', error);
        }
    })
});