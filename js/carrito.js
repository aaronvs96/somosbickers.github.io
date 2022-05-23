const verificarStorage = () => {
    let lista = [];
    if (localStorage.getItem("Carrito") != null) {
        lista = JSON.parse(localStorage.getItem("Carrito"));
        return lista;
    }
}


const eliminarProducto = (idMoto) => {
    swal({
        title: "Eliminar producto",
        text: `¿Eliminar?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((resultado) => {
            if (resultado) {
                swal("Producto eliminado", { button: false });
                let listaVieja = JSON.parse(localStorage.getItem("Carrito"));
                let listaFiltrada = listaVieja.filter(obj => obj.idMoto != idMoto);
                localStorage.setItem("Carrito", JSON.stringify(listaFiltrada));
                // localStorage.remove("Carrito");
                setTimeout(() => {
                    location.reload();
                }, 300)

            } else {
                swal("No se eliminó el producto");
            }
        })

}


//FORMATO DOLARES
const formatoDolares = (monto) => {
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);

    // console.log(numberFormat2.format(monto));
    return numberFormat2.format(monto);
}



let precioFinal = 0;
const sumaCarrito = document.getElementById("resultadoCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const aviso = document.getElementById("aviso");
const tabla = document.getElementById("tabla");

// const btn_pagar = document.getElementById("btn_pagar");
// const btnComprar = document.createElement("button");
const imprimirDatos = () => {
    if (verificarStorage() != undefined) {
        // console.log(Object.entries(verificarStorage()).length)
        tabla.className = "mostrar_tabla";//si es que hay datos en el localstorage entonces se muestra la tabla
        verificarStorage().forEach(obj => {
            document.querySelector("table").innerHTML += `
                <tr class="producto_carrito">
                    <!--<td>${obj.idMoto}</td>-->
                    <td><img src="${obj.imgMoto}" width="300px" height="220px"></td>
                    <!--<td>${obj.marcaMoto}</td>-->
                    <td><h5>${obj.nombreMoto}</h5></td>
                    <td><h5>${formatoDolares(obj.precioMoto)}</h5></td>
                    <td>
                        <button id="boton_eliminar" class="noselect" onclick="eliminarProducto(${obj.idMoto})">
                            <span class="text">Delete</span>
                            <span class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                                </svg>
                            </span>
                        </button>
                    </td>
                </tr>
                </hr>
                `
            precioFinal += parseInt(obj.precioMoto);
            // console.log(precioFinal);

        });
        sumaCarrito.innerHTML = `Total: ${formatoDolares(precioFinal)}`;//mostrando el precio final por la compra de motos

        if (Object.entries(verificarStorage()).length === 0) {
            carritoVacio.className = "mostrar_carritoVacio";
            aviso.className = "ocultar_aviso";
        } else {
            sumaCarrito.className = "mostrar_resultadoCarrito";
            aviso.className = "mostrar_aviso";
        }

    } else {
        carritoVacio.className = "mostrar_carritoVacio";

    }

}

imprimirDatos();