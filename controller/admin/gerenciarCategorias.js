$(document).ready(function() {
    // Carregar as categorias ao carregar a página
    carregarCategorias();
    editarCategoria();
    deletarCategoria();
    associarCategoria();
    salvarAssociacoes();
    exibirAlertas();

    // Função para carregar as categorias via AJAX
    function carregarCategorias() {
        $.ajax({
            url: '/api/admin/categorias',
            method: 'GET',
            success: function(categorias) {
                $('#categoriaTableBody').empty();
                categorias.forEach(function(categoria) {
                    $('#categoriaTableBody').append(`
                        <tr>
                            <td>${categoria.nomeCategoria}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-info associate-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="bi bi-link-45deg"></i>
                                </button>
                                <button class="btn btn-sm btn-warning edit-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }
    function editarCategoria(){
        // Função para editar uma categoria
        $(document).on('click', '.edit-btn', function() {
            const categoriaId = $(this).data('id');
            const categoriaNome = $(this).data('nome');
            $('#inputIdCat').val(categoriaId);
            $('#inputNomeCat').val(categoriaNome);
            $('#editModal').modal('show');
        });
    }

    function deletarCategoria(){
        // Função para deletar uma categoria
        $(document).on('click', '.delete-btn', function() {
            const categoriaId = $(this).data('id');
            const categoriaNome = $(this).data('nome');
            $('#inputIdCatDelete').val(categoriaId);
            $('#deleteModal p').text(`Tem certeza que deseja remover a categoria "${categoriaNome}"?`);
            $('#deleteModal').modal('show');
        });
    }

    function associarCategoria(){
        // Função para associar protocolos a uma categoria
        $(document).on('click', '.associate-btn', function() {
            const categoriaId = $(this).data('id');
            const categoriaNome = $(this).data('nome');
            $('#associateModalLabel').text(`Associar Protocolos à Categoria: ${categoriaNome}`);
            $('#associateProtocolosForm').attr('data-id', categoriaId);
            
            
            // Carregar os protocolos e as associações existentes
            $.ajax({
                url: `/api/admin/protocolos`,
                method: 'GET',
                success: function(protocolos) {
                    $('#protocolosList').empty();
                    protocolos.forEach(function(protocolo) {
                        $('#protocolosList').append(`
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${protocolo.idProtocolo}" id="protocolo-${protocolo.idProtocolo}">
                                <label class="form-check-label" for="protocolo-${protocolo.idProtocolo}">
                                    ${protocolo.descricao}
                                </label>
                            </div>
                        `);
                    });
                    // Carregar as associações existentes
                    $.ajax({
                        url: `/api/categorias/protocolos/${categoriaId}`,
                        method: 'GET',
                        success: function(associacoes) {
                            associacoes.forEach(function(protocolo) {
                                $(`#protocolo-${protocolo.idProtocolo}`).prop('checked', true);
                            });
                        }
                    });
                }
            });
    
            $('#associateModal').modal('show');
        });
    }

    function salvarAssociacoes(){
        // Função para salvar as associações
        $('#associateProtocolosForm').submit(function(e) {
            e.preventDefault();
            const idCategoria = $(this).attr('data-id');
            const protocolosIds = [];
            $('#protocolosList input:checked').each(function() {
                //O campo check está amazenando o valor do id já
                protocolosIds.push($(this).val());
            });
            
            $.ajax({
                url: `/api/admin/categorias/protocolos/${idCategoria}`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({protocolosIds}),
                success: function() {
                    $('#associateModal').modal('hide');
                    alert('Associações atualizadas com sucesso');
                }
            });
        });
    }

    function exibirAlertas(){
        // Exibir alertas
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        if (status === 'successCatAdd') {
            Swal.fire({
                text: "Categoria Adicionada com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successCatEdit') {
            Swal.fire({
                text: "Categoria Atualizada com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successCatDelete') {
            Swal.fire({
                text: "Categoria Removida com Sucesso!",
                icon: "success"
              });
        }
        if (status === 'successCatAssociate') {
            Swal.fire({
                text: "Protocolos Associados com Sucesso!",
                icon: "success"
              });
        }
    }
});