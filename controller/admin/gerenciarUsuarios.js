$(document).ready(function(){
    carregarUsuarios();
    chamarEdicao();
    chamarDelecao();
    chamarView();

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
                            <td class="text-center">
                                <button class="btn btn-sm btn-primary view-btn" data-id="${usuario.id}" data-nome="${usuario.nome}">
                                    <i class="bi bi-eye"></i>
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
    function chamarView(){
        $('#usuarioTableBody').on('click', '.view-btn', function(){
            const idUsuario = $(this).data('id');
            $.ajax({
                url: `/api/admin/usuarios/${idUsuario}`,
                method: 'GET',
                success: function(usuario) {
                    // Preencher o formulário com os dados do usuário
                    $('#viewId').val(usuario.id);
                    $('#viewNome').val(usuario.nome);
                    $('#viewUsuario').val(usuario.usuario);
                    $('#viewEmail').val(usuario.email);
                    $('#viewTipoUsuario').val(usuario.tipoUsuario);
                    $('#viewModal').modal('show');
                },
                error: function(error) {
                    console.error('Erro ao buscar o usuário:', error);
                }
            });
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