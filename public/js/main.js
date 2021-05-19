const socket = io.connect();

// Templates

const tablaTemplate = Handlebars.compile(`
<table class="table table-striped">
    <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
            </tr>
    </thead>
    <tbody id="listado">
    </tbody>
</table>`)

const productoTemplate = Handlebars.compile(`
<tr>
    <th scope="row" class="align-middle"><p class="m-0 p-0">{{elem.id}}</p></th>
    <td class="align-middle"><p class="m-0 p-0">{{elem.title}}</p></td>
    <td class="align-middle"><p class="m-0 p-0">{{elem.price}}</p></td>
    <td class="align-middle"><img src={{elem.thumbnail}} style="height: 50px" class="img-fluid" alt="..."></td>
</tr>
`);

const messageTemplate = Handlebars.compile(`
<div class="mb-2">
    <p class="m-0 p-0"><strong style="color: blue">{{elem.author}}</strong> <span style="color: brown">[{{elem.date}}]</span>: <em style="class: green">{{elem.body}}</em></p>
</div>
`)

// Functions

function render(data, template, elementId) {
    if(!data) return false;
    var html = data.map(function(elem, index) {
        templateHtml = template({ elem });
        return templateHtml
    });
    html = html.join('')
    document.getElementById(elementId).innerHTML = html;
}

function addProduct(e) {
    let product = {
        title: document.getElementById('prodTitle').value,
        price: document.getElementById('prodPrice').value,
        thumbnail: document.getElementById('prodThumbnail').value
    };
    socket.emit('new-product', product);
    return false;
}

function addMessage(e) {
    let message = {
        author: document.getElementById('msgAuthor').value,
        body: document.getElementById('msgBody').value,
        date: new Date().toLocaleString('es-AR')
    };
    if(!message.author) return false
    socket.emit('new-message', message);
    return false;
}

// Table 

socket.on('products', products => {
    if(!products || products.length < 1) {
        return document.getElementById('tabla-productos').innerHTML = "<p class='m-0 p-0'>No hay productos cargados</p>" ; 
    }
    document.getElementById('tabla-productos').innerHTML = tablaTemplate()
    render(products, productoTemplate, 'listado')
});

// Messages

socket.on('messages', messages => {
    if(messages.length < 1) {
        return document.getElementById('messages').innerHTML = "<p class='m-0 p-0'>Aún no hay mensajes.</p><br>"; 
    }
    render(messages, messageTemplate, 'messages')
})