$(document).ready(function(){
    const idCategoria = 1; // Define idCategoria with an appropriate value
    alert('AQUI ESTÁ SENDO CHAMADO?');
    console.log('ISSO AQUI ESTÁ SENDO CHAMADO?? idCategoria:', idCategoria); 
    
    $.ajax({
        url: `/api/categorias/protocolos/${idCategoria}`,
        method: 'GET',
        success: function(data) {
            const protocolosList = $('#lista-protocolosCategoria');
            data.forEach(protocolo => {
                protocolosList.append(`
                    <li>${protocolo.descricao}</li>
                    `);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar protocolos:', error);
        }
    });
});