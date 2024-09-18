$(document).ready(function(){
        $.ajax({
            url: '/api/categorias',
            method: 'GET',
            success: function(data){
                const categoriaList = $('#lista-categorias');
                data.forEach(categoria => {
                    categoriaList.append(`<a href="#" class="list-group-item list-group-item-action">${categoria.nomeCategoria}</a>`);
                });
            },
            error: function(error){
                console.error('Erro ao buscar categorias:', error);
            }
        })
    });

