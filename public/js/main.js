const socket = io.connect();
let productCounter = 0;

// Templates

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
    <p class="m-0 p-0"><strong>{{elem.author}}</strong>:</p>
    <p class="m-0 p-0"><em>{{elem.body}}</em></p>
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
        id: productCounter++,
        title: document.getElementById('prodTitle').value,
        price: document.getElementById('prodPrice').value,
        thumbnail: document.getElementById('prodThumbnail').value
    };
    if(productCounter % 2 == 0) {
        product.thumbnail = "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-512.png"
    } else {
        product.thumbnail = "https://cdn3.iconfinder.com/data/icons/education-209/64/apple-fruit-science-school-512.png"
    }
    socket.emit('new-product', product);
    return false;
}

function addMessage(e) {
    let message = {
        author: document.getElementById('msgAuthor').value,
        body: document.getElementById('msgBody').value
    };
    socket.emit('new-message', message);
    return false;
}

// Table 

socket.on('productos', productos => {
    if(productos.length < 1) {
        return document.getElementById('tabla-productos').innerHTML = "<p>No hay productos cargados.</p>"; 
    }
    render(productos, productoTemplate, 'listado')
    // productosHtml = [];
    // for (prod of productos) {
    //     const productHtml = productoTemplate({ producto: prod });
    //     productosHtml.push(productHtml);
    // }
    // productosHtml = productosHtml.join('')
    // document.getElementById('listado').innerHTML = productosHtml;

});

// Messages

socket.on('messages', messages => {
    if(messages.length < 1) {
        return document.getElementById('messages').innerHTML = "<p>Aún no hay mensajes.</p><br>"; 
    }
    render(messages, messageTemplate, 'messages')
})