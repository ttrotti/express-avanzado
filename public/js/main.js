const socket = io.connect();

const productoTemplate = Handlebars.compile(`
<tr>
    <th scope="row" class="align-middle"><p class="m-0 p-0">{{producto.id}}</p></th>
    <td class="align-middle"><p class="m-0 p-0">{{producto.title}}</p></td>
    <td class="align-middle"><p class="m-0 p-0">{{producto.price}}</p></td>
    <td class="align-middle"><img src={{producto.thumbnail}} style="height: 50px" class="img-fluid" alt="..."></td>
</tr>
`);

socket.on('productos', productos => {
    if(!productos) {
        document.getElementById('tabla-productos').innerHTML = "<p>No hay productos cargados</p>"; 
    }
    productosHtml = [];
    for (prod of productos) {
        const productHtml = productoTemplate({ producto: prod });
        productosHtml.push(productHtml);
    }
    productosHtml = productosHtml.join('')
    document.getElementById('listado').innerHTML = productosHtml;
})