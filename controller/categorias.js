$(document).ready(function(){
            $.ajax({
                url: '/api/categorias',
                method: 'GET',
                success: function(data){
                    const categoriaList = $('#lista-categorias');
                    data.forEach(categoria => {
                        categoriaList.append(`
                            <a class="list-group-item list-group-item-action" data-id="${categoria.idCategoria}">${categoria.nomeCategoria}</a>
                            `);
                    });

                },
                error: function(error){
                    console.error('Erro ao buscar categorias:', error);
                }
            })

            // Adicionar evento de clique aos itens da lista de categorias
            $('#lista-categorias').on('click', '.list-group-item', function() {
                let idCategoria = $(this).data('id');
                // Redirecionar para a nova página que exibe os protocolos
                window.location.href = `/categorias/protocolos/${idCategoria}`;
            });
    });