const btn_enviar_formulario = document.getElementById("btn_enviar_formulario");

btn_enviar_formulario.addEventListener("click",()=>{
    swal({
        title: "LISTO",
        text: "Pronto uno de nuestros asesores se contactará contigo!"
    })
    texto_nombres.value="";
    texto_apellidos.value="";
    texto_email.value="";
    texto_celular.value="";
    setTimeout(()=>{
        location.href = "./carrito.html";
    },3000);    
})