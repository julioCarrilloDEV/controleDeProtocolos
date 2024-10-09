$(document).ready(function(){
    // Obter os protocolos favoritados pelo usuário
    $.ajax({
        url: '/api/protocolos/protocolosFavoritos',
        method: 'GET',
        success: function(favoritos){
            // Obter todos os protocolos
            $.ajax({
                url: '/api/protocolos',
                method: 'GET',
                success: function(data){
                    data.forEach(function(protocolo){
                        const isFavorito = favoritos.includes(protocolo.idProtocolo);
                        const favoritoClass = isFavorito ? 'bi-star-fill' : 'bi-star';
                        $('#tabela-protocolos').append(`
                            <tr>
                                <td>${protocolo.descricao}</td>
                                <td>${protocolo.nomeCategoria}</td>
                                <td class="text-center">
                                    <i class="bi ${favoritoClass}" data-id="${protocolo.idProtocolo}" data-favorito="${isFavorito}"></i>
                                </td>
                            </tr>
                        `);
                    });

                    // Adicionar evento de clique para os ícones de favorito
                    $('#tabela-protocolos').on('click', 'i[data-id]', function(){
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
                                        $icon.removeClass('bi-star-fill').addClass('bi-star');
                                        $icon.data('favorito', false);
                                    }
                                }
                            });
                        } else {
                            // Adicionar aos favoritos
                            $.ajax({
                                url: '/api/protocolos/favoritar',
                                method: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify({ protocoloId: protocoloId }),
                                success: function(response){
                                    if (response.success) {
                                        $icon.removeClass('bi-star').addClass('bi-star-fill');
                                        $icon.data('favorito', true);
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});