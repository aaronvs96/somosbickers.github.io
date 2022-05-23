//MOSTRANDO PRODUCTOS
const container = document.getElementById("contenedor");
const productos = [];
fetch("productos.json")
    .then(response => response.json())
    .then(result => {
        let productos = result;
        productos.forEach(producto => {
            container.innerHTML += `
                                <div class="moto"  id="${producto.marca}">             
                                    <div class="col"> 
                                        <div class="card shadow-sm">
                                            <img src=${producto.img} alt="Foto de moto">
                                            <div class="card-body">                                        
                                                <h3 class="nombre-marca">${producto.marca}</h3>                                                
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="datos-extra">
                                                        <p>${producto.nombreMoto}</p>
                                                        <p>${formatoDolares(producto.precio)}</p>
                                                    </div>
                                                    <div class="btn-group">
                                                        <button id="boton_agregar" type="button" class="boton" data-product-id="${producto.id}"
                                                                                            data-product-img="${producto.img}"
                                                                                            data-product-marca="${producto.marca}"
                                                                                            data-product-nombre="${producto.nombreMoto}"
                                                                                            data-product-precio="${producto.precio}">Agregar al carrito</button>
                                                    </div>
                                                </div>
                                            </div>                                         
                                        </div>
                                    </div>                      
                                </div>                  
                                `
        })
        
        // CLASE MOTO
        class Moto {
            constructor(idMoto, imgMoto, marcaMoto, nombreMoto, precioMoto) {
                this.idMoto = idMoto;
                this.marcaMoto = marcaMoto;
                this.nombreMoto = nombreMoto;
                this.precioMoto = precioMoto;
                this.imgMoto = imgMoto; //imagen
            }
        }
        const btn_agregar = document.querySelectorAll(".boton");
       
        btn_agregar.forEach(btn => {
            btn.addEventListener("click", () => {
                // console.log("Id:", btn.dataset.productId);
                // console.log("Marca:", btn.dataset.productMarca);

                let id_moto = btn.dataset.productId;
                let img_Moto = btn.dataset.productImg;//imagen
                let marca_moto = btn.dataset.productMarca;
                let nombre_moto = btn.dataset.productNombre;
                let precio_moto = btn.dataset.productPrecio;
                let listaProductos = [];

                const crearProducto = () => {
                    const nuevoProducto = new Moto(id_moto, img_Moto, marca_moto, nombre_moto, precio_moto);
                    // console.log(nuevoProducto);

                    let listaNueva = [];
                    // if (numero.length > 0 && marca.length > 0 && nombre.length > 0 && precio.length > 0) {
                    if (localStorage.getItem("Carrito") != null) {
                        listaNueva = JSON.parse(localStorage.getItem("Carrito"));
                        listaNueva.push(nuevoProducto);
                        localStorage.setItem("Carrito", JSON.stringify(listaNueva));
                    } else {
                        listaProductos.push(nuevoProducto);
                        localStorage.setItem("Carrito", JSON.stringify(listaProductos));
                    }

                    return nuevoProducto;
                    // }
                }

                const verificarStorage = () => {
                    let lista = [];
                    if (localStorage.getItem("Carrito") != null) {
                        lista = JSON.parse(localStorage.getItem("Carrito"));
                        return lista;
                    }
                }

                const guardar = () => {
                    if (crearProducto() == undefined) {
                        swal({
                            title: "Error",
                            text: "Completa todos los campos!",
                            icon: "error",
                        })
                    } else {
                        // crearProducto();
                        if (verificarStorage() != undefined) {//si es que tengo algo en el storage
                            localStorage.setItem("Carrito", JSON.stringify(verificarStorage()));
                            // console.log(nombre_moto ` agregado`)
                            swal({
                                title: "Listo",
                                text: "Moto agregada al carrito",
                                icon: "success",
                            })
                        } else {
                            localStorage.setItem("Carrito", JSON.stringify(listaProductos));
                        }
                    }
                }

                guardar();

            })
        })
    })
    .catch(error => console.log(error))



// EVENTO FILTRO
const selectFiltro = document.getElementById("selectFiltro");
selectFiltro.addEventListener("change", () => {

    //ocultando todas las motos con la clase ".moto"
    const moto = document.querySelectorAll(".moto");
    moto.forEach(el => {
        el.className = "ocultar_tarjeta_moto";
    })

    //ocultando todas las motos mostradas con clase ".mostrar_tarjeta_moto"
    const motoMostradas = document.querySelectorAll(".mostrar_tarjeta_moto");
    motoMostradas.forEach(el => {
        el.className = "ocultar_tarjeta_moto";
    })

    // console.log(selectFiltro.value);

    //mostrando las motos de la marca elegida en el select
    const marca = document.querySelectorAll(`#${selectFiltro.value}`);
    marca.forEach(e => {
        e.className = "mostrar_tarjeta_moto";
    })

})


//FORMATO DOLARES
import {formatoDolares} from './formatoDolares.js';
