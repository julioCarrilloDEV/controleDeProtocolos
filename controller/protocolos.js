$(document).ready(function(){
    $.ajax({
        url: '/api/protocolos',
        method: 'GET',
        success: function(data){
            data.forEach(function(protocolo){
                $('#tabela-protocolos').append(`
                    <tr>
                        <td>${protocolo.descricao}</td>
                        <td>${protocolo.nomeCategoria}</td>
                    </tr>
                `);
            });
        }
    });
});
