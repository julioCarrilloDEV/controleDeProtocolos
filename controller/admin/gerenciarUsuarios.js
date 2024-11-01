$(document).ready(function(){
    carregarUsuarios();

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
})