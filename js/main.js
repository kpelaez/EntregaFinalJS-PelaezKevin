document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('art_1_precio').innerHTML = '$'+bebidas[0].precio;
    document.getElementById('art_2_precio').innerHTML = '$'+bebidas[1].precio;
    document.getElementById('art_3_precio').innerHTML = '$'+bebidas[2].precio;
    document.getElementById('art_4_precio').innerHTML = '$'+bebidas[3].precio;
    document.getElementById('art_5_precio').innerHTML = '$'+bebidas[4].precio;
    document.getElementById('art_6_precio').innerHTML = '$'+bebidas[5].precio;
    document.getElementById('art_7_precio').innerHTML = '$'+bebidas[6].precio;
    document.getElementById('art_8_precio').innerHTML = '$'+bebidas[7].precio;
    document.getElementById('art_9_precio').innerHTML = '$'+bebidas[8].precio;
    document.getElementById('art_10_precio').innerHTML = '$'+bebidas[9].precio;

});

//Conseguir Nro de cliente del input y modificar header
let nro_cliente = document.getElementById("nro_cliente");

nro_cliente.onchange= () => {

    sessionStorage.setItem('nro_cliente', nro_cliente.value);
    let contenedor = document.getElementById("datos_cliente");

    contenedor.innerHTML = `<h3>Su numero de cliente es: <strong>${sessionStorage.getItem('nro_cliente')}</strong> </h3>`;
}


//Objeto bebida
function Bebida(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
}

//Objeto Presupuesto Constructor
function PresupuestoItem(bebida, cantidad){
    this.producto = bebida.nombre;
    this.cantidad = cantidad;
    this.precioitem = bebida.precio;
    this.importe = bebida.precio*cantidad;
}

function calcularTotal(){

    let elemento = sessionStorage.getItem('presupuesto');
    elemento = JSON.parse(elemento);

    let total = 0;

    for(const item of elemento){
        total = total + item.importe
    }

    return total;
}

function mostrarPresupuestoFinal (total){

    let elemento = sessionStorage.getItem('presupuesto');
    elemento = JSON.parse(elemento);

    let nro_cliente = sessionStorage.getItem('nro_cliente');
    //STRINGS CON PLANTILLAS
    let inicioPresu = `Presupuesto del Cliente n°: ${nro_cliente}\n`;

    let cuerpo = "";
    for (const item of elemento){

        if (item.cantidad > 0) {
                cuerpo +=`${item.producto}, cantidad: ${item.cantidad}, importe: $ ${item.importe}<br>`;
        }

    }

    let contenedor_presupuesto = document.createElement("div");
    let stringTotal = `El total del presupuesto es: $${total}`;

    contenedor_presupuesto.id = "presupuesto_carrito";


    //Estructura del div final
    contenedor_presupuesto.innerHTML = `<h3> ${inicioPresu}</h3>
                                        <p>${cuerpo}</p>
                                        <p><strong>${stringTotal}</strong></p>
                                        <button class="btn btn-danger" type="button" onclick="volver_carrito();">Volver</button>`;

    document.body.appendChild(contenedor_presupuesto);
}

/*Array Generico de bebidas*/
const bebidas = [
    {nombre: "Cerveza Rubia", precio: 750.0},
    {nombre: "Cerveza Negra", precio: 900.0},
    {nombre: "Cerveza Roja", precio: 750.0},
    {nombre: "Vino Blanco",precio:1700.0},
    {nombre: "Vino Tinto", precio:1400.0},
    {nombre: "Fernet", precio: 2400.0},
    {nombre: "Ron", precio: 3200.0},
    {nombre: "Vodka", precio: 2500.0},
    {nombre: "Gaseosas",precio:800.0},
    {nombre: "Agua", precio: 700.0}
];

const sumar_unidad = (art_id) => {

    let input   = document.getElementById('art_'+art_id);
    let unidad  = parseInt(input.value);

    input.value = unidad+1;

}

const restar_unidad = (art_id) => {

    let input = document.getElementById('art_'+art_id);
    let unidad = parseInt(input.value);

    (unidad!=0) ? (input.value = unidad-1) : undefined;

}

const armar_presupuesto = () => {

    let presupuesto = [];

    for (let i = 1; i < 11; i++) {

        let cant = parseInt(document.getElementById('art_'+i).value);
        presupuesto.push(new PresupuestoItem(bebidas[i-1],cant));

    }

    presupuesto = JSON.stringify(presupuesto);
    sessionStorage.setItem('presupuesto',presupuesto);

    importeTotal = calcularTotal();
    mostrarPresupuestoFinal(importeTotal);

    // Oculto el Carrito
    document.getElementById("carrito").hidden = true;

}

// Borra el Presupuesto y vuelve a la vista del Carrito
const volver_carrito = () => {

    // Obtengo el Presupuesto Creado
    let presupuesto_carrito = document.getElementById("presupuesto_carrito");

    // Verifico que exista
    if (presupuesto_carrito) {
        // Si existe lo elimino
        presupuesto_carrito.parentNode.removeChild(presupuesto_carrito);
    }

    // Muestro el Carrito
    document.getElementById("carrito").hidden = false;

}