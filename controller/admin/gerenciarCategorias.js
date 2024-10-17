$(document).ready(function() {
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
                                <button class="btn btn-sm btn-warning edit-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="fas fa-trash"></i>
                                </button>
                                <button class="btn btn-sm btn-info associate-btn" data-id="${categoria.idCategoria}" data-nome="${categoria.nomeCategoria}">
                                    <i class="fas fa-link"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    // Carregar as categorias ao carregar a página
    loadCategorias();

    // Função para criar uma nova categoria
    $('#createCategoriaForm').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/admin/categorias',
            method: 'POST',
            data: formData,
            success: function() {
                $('#createModal').modal('hide');
                loadCategorias();
            }
        });
    });

    // Função para editar uma categoria
    $(document).on('click', '.edit-btn', function() {
        const categoriaId = $(this).data('id');
        const categoriaNome = $(this).data('nome');
        $('#editCategoriaForm').attr('data-id', categoriaId);
        $('#editCategoriaForm input[name="nome"]').val(categoriaNome);
        $('#editModal').modal('show');
    });

    $('#editCategoriaForm').submit(function(e) {
        e.preventDefault();
        const categoriaId = $(this).attr('data-id');
        const formData = $(this).serialize();
        $.ajax({
            url: `/admin/categorias/${categoriaId}`,
            method: 'PUT',
            data: formData,
            success: function() {
                $('#editModal').modal('hide');
                loadCategorias();
            }
        });
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