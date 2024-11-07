$(document).ready(function(){
    carregarUsuarios();
    chamarEdicao();
    chamarDelecao();

    function carregarUsuarios() {
        $.ajax({
            url: '/api/admin/usuarios',
            method: 'GET',
            success: function(usuarios) {
                $('#usuarioTableBody').empty();
                usuarios.forEach(function(usuario) {
                    $('#usuarioTableBody').append(`
                        <tr>
                            <td>${usuario.nome}</td> 
                            <td>${usuario.usuario}</td>
                            <td>${usuario.tipoUsuario}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-info upload-btn" data-id="${usuario.id}" data-nome="${usuario.nome}">
                                    <i class="bi bi-file-earmark-arrow-up"></i>
                                </button>
                                <button class="btn btn-sm btn-warning edit-btn" data-id="${usuario.id}" data-nome="${usuario.nome}">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger delete-btn" data-id="${usuario.id}" data-nome="${usuario.nome}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    function chamarEdicao() {
        $('#usuarioTableBody').on('click', '.edit-btn', function(){
            const idUsuario = $(this).data('id');
            $.ajax({
                url: `/api/admin/usuarios/${idUsuario}`,
                method: 'GET',
                success: function(usuario) {
                    // Preencher o formulário com os dados do usuário
                    $('#editId').val(usuario.id);
                    $('#editNome').val(usuario.nome);
                    $('#editUsuario').val(usuario.usuario);
                    $('#editEmail').val(usuario.email);
                    $('#editTipoUsuario').val(usuario.tipoUsuario);
                    $('#editModal').modal('show');
                },
                error: function(error) {
                    console.error('Erro ao buscar o usuário:', error);
                }
            });
        });
    }

    function chamarDelecao() {
        $('#usuarioTableBody').on('click', '.delete-btn', function(){
            const idUsuario = $(this).data('id');
            const nomeUsuario = $(this).data('nome');
            $('#deleteId').val(idUsuario);
            $('#deleteNome').val(nomeUsuario);
            $('#deleteModal').modal('show');
        });
    }
})