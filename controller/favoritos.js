$(document).ready(function(){
    // Obter os protocolos favoritados pelo usuário
    $.ajax({
        url: '/api/favoritos',
        method: 'GET',
        success: function(data){
            const favoritosTable = $('#tabela-favoritos');
            data.forEach(favorito => {
                favoritosTable.append(`
                    <tr>
                        <td>${favorito.descricao}</td>
                        <td class="text-center">
                            <i class="bi bi-star-fill" data-id="${favorito.idProtocolo}" data-favorito="true"></i>
                        </td>
                    </tr>
                `);
            });

            // Adicionar evento de clique para os ícones de favorito
            $('#tabela-favoritos').on('click', 'i[data-id]', function(){
                const protocoloId = $(this).data('id');
                const isFavorito = $(this).data('favorito');
                const $icon = $(this);

                if (isFavorito) {
                    // Remover dos favoritos
                    $.ajax({
                        url: '/api/protocolos/desfavoritar',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({ protocoloId: protocoloId }),
                        success: function(response){
                            if (response.success) {
                                $icon.closest('tr').remove();
                            }
                        },
                        error: function(error){
                            console.error('Erro ao remover favorito:', error);
                        }
                    });
                }
            });
        },
        error: function(error){
            console.error('Erro ao buscar favoritos:', error);
        }
    });
});