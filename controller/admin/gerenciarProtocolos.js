$(document).ready(function(){
    carregarProtocolos();
    uploadProtocolo();
    editarProtocolo();
    deletarProtocolo();
    visualizarPDF();
    exibirAlertas();

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
                            <td><a href="#" class="view-pdf" data-url="${anexoUrl}">${protocolo.descricao}</a></td>
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

    function visualizarPDF(){
         $('#protocoloTableBody').on('click', '.view-pdf', function(e){
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

    function editarProtocolo(){
        $('#protocoloTableBody').on('click', '.edit-btn', function(){
            const idprotocolo = $(this).data('id');
            const protocoloNome = $(this).data('nome');
            $('#editModalLabel').text(`Editar protocolo ${protocoloNome}`);
            $('#idProtocoloEdit').val(idprotocolo);
            $('#descricaoEdit').val(protocoloNome);
            $('#editModal').modal('show');
        });
    }

    function deletarProtocolo(){
        $('#protocoloTableBody').on('click', '.delete-btn', function(){
            const idprotocolo = $(this).data('id');
            const protocoloNome = $(this).data('nome');
            $('#deleteModalLabel').text(`Tem certeza que deseja deletar o protocolo ${protocoloNome}?`);
            $('#idProtocoloDelete').val(idprotocolo);
            $('#deleteModal').modal('show');
        });
    }

    function exibirAlertas(){
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        if (status === 'successAdd') {
            Swal.fire({
                text: "Protocolo Adicionado com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successEdit') {
            Swal.fire({
                text: "Protocolo Atualizado com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successDelete') {
            Swal.fire({
                text: "Protocolo Removido com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successUpload') {
            Swal.fire({
                text: "Arquivo adicionado com Sucesso!",
                icon: "success"
              });
        }
    }
})