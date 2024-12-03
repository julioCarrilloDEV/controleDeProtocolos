$(document).ready(function(){
    buscar();
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

            function buscar(){
                $('#buscar-categorias').on('keyup', function() {
                    const termo = $(this).val().toLowerCase();
                    $('#lista-categorias .list-group-item').each(function() {
                        // Obtém o texto do nome da categoria e converte para letras minúsculas
                        const categoriaNome = $(this).text().toLowerCase();
                        if (categoriaNome.includes(termo)) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                });
            }
    });