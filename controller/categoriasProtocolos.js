$(document).ready(function(){

    
    $.ajax({
        url: `/api/categorias/protocolos/${idCategoria}`,
        method: 'GET',
        success: function(data) {
            const protocolosList = $('#lista-categoriasProtocolos');
            const anexoUrl = `/uploads/${protocolo.anexo}`;
            data.forEach(protocolo => {
                protocolosList.append(`
                    <a href="${anexoUrl}" class="list-group-item list-group-item-action">${protocolo.descricao}</a>
                    `);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar protocolos:', error);
        }
    });
});