alert('AQUI ESTÁ SENDO CHAMADO?');

$(document).ready(function(){
    alert('AQUI ESTÁ SENDO CHAMADO?');
    console.log('ISSO AQUI ESTÁ SENDO CHAMADO?? idCategoria:', idCategoria); 
    
    $.ajax({
        url: `/api/categorias/protocolos/${idCategoria}`,
        method: 'GET',
        success: function(data) {
            const protocolosList = $('#lista-categoriasProtocolos');
            data.forEach(protocolo => {
                protocolosList.append(`
                    <a class="list-group-item list-group-item-action">${protocolo.descricao}</a>
                    `);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar protocolos:', error);
        }
    });
});