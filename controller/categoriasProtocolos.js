$(document).ready(function(){    
    $.ajax({
        url: `/api/categorias/protocolos/${idCategoria}`,
        method: 'GET',
        success: function(data) {
            $('#nomeCat').text(data[0].nomeCategoria);
            const protocolosList = $('#lista-categoriasProtocolos');
            data.forEach(protocolo => {
                const anexoUrl = `/uploads/${protocolo.anexo}`;
                protocolosList.append(`
                       <a href="#" class="view-pdf list-group-item list-group-item-action" data-url="${anexoUrl}">${protocolo.descricao}</a>
                    `);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar protocolos:', error);
        }
    });

    // Adicionar evento de clique para os links de visualização de PDF
    $('#lista-categoriasProtocolos').on('click', '.view-pdf', function(e){
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