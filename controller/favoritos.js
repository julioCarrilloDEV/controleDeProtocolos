$(document).ready(function(){
    // Obter os protocolos favoritados pelo usuário
    $.ajax({
        url: '/api/favoritos',
        method: 'GET',
        success: function(data){
            const favoritosTable = $('#tabela-favoritos');
            data.forEach(favorito => {
                const anexoUrl = `/uploads/${favorito.anexo}`;
                favoritosTable.append(`
                    <tr>
                        <td><a href="#" class="view-pdf" data-url="${anexoUrl}">${favorito.descricao}</a></td>
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

     // Adicionar evento de clique para os links de visualização de PDF
     $('#tabela-favoritos').on('click', '.view-pdf', function(e){
        e.preventDefault();
        const pdfUrl = $(this).data('url');
        console.log("pdfUrl", pdfUrl);
        if (pdfUrl === '/uploads/') {
            Swal.fire({
                icon: 'warning',
                title: 'Arquivo não encontrado',
                text: 'O arquivo PDF não está disponível.',
            });
        } else {
            renderPDF(pdfUrl);
            $('#pdfModal').modal('show');
        }
    });
});