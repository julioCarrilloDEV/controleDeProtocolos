$(document).ready(function() {
    // Carregar as categorias ao carregar a página
    loadCategorias();

    // Função para carregar as categorias via AJAX
    function loadCategorias() {
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

    // Função para editar uma categoria
    $(document).on('click', '.edit-btn', function() {
        const categoriaId = $(this).data('id');
        const categoriaNome = $(this).data('nome');
        $('#inputIdCat').val(categoriaId);
        $('#inputNomeCat').val(categoriaNome);
        $('#editModal').modal('show');
    });


    // Função para remover uma categoria
    $(document).on('click', '.delete-btn', function() {
        const categoriaId = $(this).data('id');
        const categoriaNome = $(this).data('nome');
        $('#deleteCategoriaForm').attr('data-id', categoriaId);
        $('#deleteModal p').text(`Tem certeza que deseja remover a categoria "${categoriaNome}"?`);
        $('#deleteModal').modal('show');
    });

    $('#deleteCategoriaForm').submit(function(e) {
        e.preventDefault();
        const categoriaId = $(this).attr('data-id');
        $.ajax({
            url: `/admin/categorias/${categoriaId}`,
            method: 'DELETE',
            success: function() {
                $('#deleteModal').modal('hide');
                loadCategorias();
            }
        });
    });

    // Função para associar uma categoria
    $(document).on('click', '.associate-btn', function() {
        const categoriaId = $(this).data('id');
        const categoriaNome = $(this).data('nome');
        // Aqui você pode adicionar lógica para preencher o modal de associação
        $('#associateModal').modal('show');
    });
});