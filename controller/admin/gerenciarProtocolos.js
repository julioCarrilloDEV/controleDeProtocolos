$(document).ready(function(){
    carregarProtocolos();
    uploadProtocolo();
    function carregarProtocolos() {
        $.ajax({
            url: '/api/admin/protocolos',
            method: 'GET',
            success: function(protocolos) {
                $('#protocoloTableBody').empty();
                protocolos.forEach(function(protocolo) {
                    const anexoUrl = `/uploads/${protocolo.anexo}`;
                    $('#protocoloTableBody').append(`
                        <tr>
                            <td><a href="${anexoUrl}" >${protocolo.descricao}</a></td> 
                            <td>${protocolo.nomeCategoria}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-info upload-btn" data-id="${protocolo.idProtocolo}" data-nome="${protocolo.descricao}">
                                    <i class="bi bi-file-earmark-arrow-up"></i>
                                </button>
                                <button class="btn btn-sm btn-warning edit-btn" data-id="${protocolo.idProtocolo}" data-nome="${protocolo.descricao}">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${protocolo.idProtocolo}" data-nome="${protocolo.descricao}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    function uploadProtocolo(){
        $('#protocoloTableBody').on('click', '.upload-btn', function(){
            const idprotocolo = $(this).data('id');
            const protocoloNome = $(this).data('nome');
            $('#uploadModalLabel').text(`Selecione o arquivo do protocolo ${protocoloNome}`);
            $('#idProtocolo').val(idprotocolo);
            $('#uploadModal').modal('show');
        });

        
    }
})