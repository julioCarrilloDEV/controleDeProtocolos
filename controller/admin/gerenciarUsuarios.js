$(document).ready(function(){
    carregarUsuarios();
    chamarEdicao();
    chamarDelecao();
    chamarView();
    chamarAssociacoes();
    salvarAssociacoes();

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
                                <button class="btn btn-sm btn-dark assocCat-btn" data-id="${usuario.id}" data-nome="${usuario.nome}">
                                    <i class="bi bi-calendar2-plus"></i>
                                </button>
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
            console.log('Visualizar usuário:', idUsuario);
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
            console.log('Deletar usuário:', idUsuario);
        });
    }

    function chamarAssociacoes(){
            $('#usuarioTableBody').on('click', '.assocCat-btn', function() {
                const idUsuario = $(this).data('id');
                $('#assocIdUsuario').val(idUsuario);
                
                // Buscar todas as categorias disponíveis e preencher o select
                $.ajax({
                    url: '/api/admin/categorias',
                    method: 'GET',
                    success: function(categorias) {
                        $('#categoriasList').empty();
                        categorias.forEach(categoria => {
                            $('#categoriasList').append(`
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="${categoria.idCategoria}" id="categoria-${categoria.idCategoria}">
                                    <label class="form-check-label" for="categoria-${categoria.idCategoria}">
                                        ${categoria.nomeCategoria}
                                    </label>
                                </div>
                            `);
                        });
        
                        // Buscar e marcar as categorias já associadas ao usuário
                        $.ajax({
                            url: `/api/admin/usuarios/categorias/${idUsuario}`,
                            method: 'GET',
                            success: function(categoriasAssociadas) {
                                categoriasAssociadas.forEach(categoria => {
                                    $(`#categoria-${categoria.idCategoria}`).prop('checked', true);
                                });
                                $('#assocCategoriasModal').modal('show');
                            },
                            error: function(error) {
                                console.error('Erro ao buscar categorias do usuário:', error);
                            }
                        });
                    },
                    error: function(error) {
                        console.error('Erro ao buscar categorias:', error);
                    }
                });
            });
        }

    function salvarAssociacoes(){
        $('#assocCategoriasForm').submit(function(e) {
            e.preventDefault();
            const idUsuario = $('#assocIdUsuario').val();
            const categoriasIds = [];
            $('#categoriasList input:checked').each(function() {
                categoriasIds.push($(this).val());
            });
    
            $.ajax({
                url: `/api/admin/usuarios/categorias/${idUsuario}`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({categoriasIds}),
                success: function() {
                    $('#assocCategoriasModal').modal('hide');
                    alert('Associações atualizadas com sucesso');
                },
                error: function(error) {
                    console.error('Erro ao salvar associações:', error);
                }
            });
        });
    }    

})