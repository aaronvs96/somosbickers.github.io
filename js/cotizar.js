const mostrarCotizacion = document.createElement("p");
let nuevoTextoH = "";
nuevoTextoH = document.createElement("p");

//CLASE MOTO
class Moto {
    constructor(id, marcaMoto, nombreMoto, precioMoto) {
        this.id = id;
        this.marcaMoto = marcaMoto;
        this.nombreMoto = nombreMoto;
        this.precioMoto = precioMoto;
    }

    calcularCuota(cantidadCuota) {
        let interesCuota = 0.25;
        let valorCuotaInteres = 0;
        let valorCuota = this.precioMoto / cantidadCuota;
        let precioFinal = 0;

        if (cantidadCuota > 0 && cantidadCuota == 1) {
            nuevoTextoH.innerHTML = `<h6>Producto elegido: ${this.nombreMoto} -- Precio al contado: ${formatoDolares(this.precioMoto)}</h6>`;

        } else if (cantidadCuota >= 2 && cantidadCuota <= 12) {
            // nuevoTextoH.innerHTML = `Producto: ${this.nombreMoto} -- Precio al contado: $${this.precioMoto}`;
            // nuevoTextoH.innerHTML += `<br>Resumen de cuotas: `;

            valorCuotaInteres = Math.round(valorCuota + (interesCuota * valorCuota));
            nuevoTextoH.innerHTML = `<h6>Valor de Cuota: ${formatoDolares(valorCuotaInteres)}</h6>`;
            for (let i = 1; i <= cantidadCuota; i++) {
                precioFinal += valorCuotaInteres;
            }
            nuevoTextoH.innerHTML += `<h6>Interés por cuota: ${interesCuota * 100}%</h6>`;
            nuevoTextoH.innerHTML += `<h6>El precio final de tu moto es de ${formatoDolares(precioFinal)}<br></h6>`;

        }
        const resultadoCotizacion = document.getElementById("resultadoCotizacion");
        resultadoCotizacion.className = "mostrar_cotizacion";
        document.getElementById("resultadoCotizacion")?.append(nuevoTextoH);
        return nuevoTextoH;
    }

    filtroMarca(valorBuscado) {
        let texto = "";
        let textoFiltro = "";

        if (valorBuscado != "") {
            const resultado = listaMotos.filter((el) => el.marcaMoto.includes(valorBuscado.toUpperCase()));

            console.log("\n*************** PAGINA DE FILTROS ***************\nBuscando por 'marca'.")
            console.log(`Elemento buscado: '${valorBuscado}'`)
            console.log(`${resultado.length} resultados encontrados.`)

            textoFiltro = document.createElement("p")
            textoFiltro.innerHTML = `<br><h3>*************** PAGINA DE FILTROS ***************</h3><br>Buscando por 'marca'<br>`;
            textoFiltro.innerHTML += `<h5>Elemento buscado: '${valorBuscado}'</h5><br>`;
            textoFiltro.innerHTML += `<h5>${resultado.length} resultados encontrados.</h5><br><br>`;

            for (const el of resultado) {
                texto += `Marca: ${el.marcaMoto}\nNombre: ${el.nombreMoto}\nPrecio: $${el.precioMoto}\n\n`;
                textoFiltro.innerHTML += `Marca: ${el.marcaMoto}<br>Nombre: ${el.nombreMoto}<br>Precio: $${el.precioMoto}<br><br>`;
            }
            document.getElementById("resultadoFiltro")?.append(textoFiltro);
        } else {
            alert("Por favor ingrese un valor.");
        }
        return texto;
    }
}


function cotizacion(opMoto, opcionCuotas) {    
    const opCuota = parseInt(opcionCuotas);
    fetch("productos.json")
        .then(response => response.json())
        .then(result => {
            let productos = result;
            const moto = productos.find((el) => el.nombreMoto === opMoto);
            // console.log(moto.nombreMoto)
            if (moto) {
                mostrarCotizacion.innerHTML = `
                                    <h5 class="title_cotizar">Cotizando: ${moto.nombreMoto}  -  Precio: ${formatoDolares(moto.precio)}</h5>
                                    <h6>Número de cuotas: ${opcionCuotas}</h6>
                                `;
                document.getElementById("resultadoCotizacion")?.append(mostrarCotizacion);
            }
            const datos_cotizacion = new Moto(moto.id, moto.marca, moto.nombreMoto, moto.precio, moto.img);
            datos_cotizacion.calcularCuota(opCuota);
        })
        .catch(error => console.log(error))
}


// SELECT MOTOS
const selectMotos = document.getElementById("selectMotos");
fetch("productos.json")
    .then(response => response.json())
    .then(result => {
        let productos = result;
        productos.forEach(producto => {
            selectMotos.innerHTML += `
                <option value="${producto.nombreMoto}">${producto.nombreMoto}</option>
                `
        })
    })
    .catch(error => console.log(error))

// // evento para saber que moto elige en el select
// selectMotos.addEventListener("change", () => {
//     console.log(selectMotos.value);
// })


// SELECT CUOTAS
const selectCuotas = document.getElementById("selectCuotas");
//agregar lista de cuotas al select
for (let a = 1; a <= 12; a++) {
    const opcion = document.createElement("option");
    opcion.value = a;
    opcion.innerHTML = `${a}`;
    selectCuotas?.append(opcion);
}
//evento para saber que cuotas elige en el select
// selectCuotas.addEventListener("change", () => {
//     console.log(selectCuotas.value);
// })

const boton_cotizar = document.querySelector("#btn-enviar-cotizar");

boton_cotizar.addEventListener("click", (e) => {
    e.preventDefault();

    if (!selectMotos.value) {
        // alert("Por favor elegir una moto");
        swal({
            title: "Error",
            text: "Elige una moto",
            icon: "error",
        })
    } else if (selectCuotas.value == 0) {
        // alert("Por favor elegir al menos una cuota.")
        swal({
            title: "Error",
            text: "Elige la cantidad de cuotas",
            icon: "error",
        })
    } else {
        // mostrarCotizacion.innerHTML = ``;
        cotizacion(selectMotos.value, selectCuotas.value);
    }
})

//FORMATO DOLARES
import { formatoDolares } from './formatoDolares.js';