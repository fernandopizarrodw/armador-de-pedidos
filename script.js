const productos = [
    "asado", "vacío", "bife sin lomo", "bife chorizo", "cuadril", "paleta", "roastbeef", "colita", "peceto", "nalga", "bola", "cuadrada", "matambre", "entraña", "espinazo", "tortuguita", "tortuga", "palomita", "paloma", "tapa", "cima", "falda", "media completa", "media entera", "tapa asado", "falda puchero", "osobuco",
    "cajón pollo", "cajón patamuslo", "cajón suprema", "cajón huevo", "alita", "menudo", "alita y menudos", "menudo alita", "cajón alita", "cajón menudo",
    "picada comun", "picada especial", "grasa picada", "grasa",
    "patitas cerdo", "pernil", "paleta de cerdo", "carré", "provoleta", "parmesano", "carbon", "salchicha parrillera"
];

const select = document.getElementById('producto');
const cantidad = document.getElementById('cantidad');
const lista = document.getElementById('lista');
const form = document.getElementById('form');
const copiar = document.getElementById('copiar');
const reset = document.getElementById('reset');

// Cargar opciones al select
productos.sort().forEach(prod => {
    const option = document.createElement('option');
    option.value = prod;
    option.textContent = prod;
    select.appendChild(option);
});

// Cargar pedido guardado
let pedido = JSON.parse(localStorage.getItem('pedido')) || [];
render();

form.addEventListener('submit', e => {
    e.preventDefault();
    const prod = select.value;
    const cant = cantidad.value.trim();
    if (!prod || !cant) return;
    pedido.push(`${cant} ${prod}`);
    cantidad.value = '';
    select.selectedIndex = 0;
    guardar();
    render();
});

copiar.addEventListener('click', () => {
    const texto = pedido.join("\n");
    navigator.clipboard.writeText(texto).then(() => alert("Pedido copiado"));
});

reset.addEventListener('click', () => {
    if (confirm("¿Borrar todo el pedido?")) {
        pedido = [];
        guardar();
        render();
    }
});

function guardar() {
    localStorage.setItem('pedido', JSON.stringify(pedido));
}

function render() {
    lista.innerHTML = '';
    pedido.forEach(item => {
        const li = document.createElement('li');
        li.className = 'pedido__item';
        li.textContent = item;
        lista.appendChild(li);
    });
}

const sendBtn = document.getElementById("send-whatsapp");

sendBtn.addEventListener("click", () => {
    const pedidoTexto = pedido.join('\n');
    const numero = "+5491168497526"; // <- cambiá esto por el número de tu papá
    const mensaje = encodeURIComponent(pedidoTexto);
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('service-worker.js')
            .then(reg => console.log("Service Worker registrado"))
            .catch(err => console.error("Error al registrar SW:", err));
    });
}
