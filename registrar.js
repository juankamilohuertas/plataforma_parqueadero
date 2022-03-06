const form_registro = document.getElementById("form_registro");
const conte_form = document.getElementById("conte_form");
/* creando formulario de registro de usuarios y motos */
const creandoFormRegistro = (gr,nombre,apellido,placa)=>{
    form = `
        <form action="#">
            <input type="text" placeholder=${gr}>
            <input type="text" placeholder=${nombre}>
            <input type="text" placeholder=${apellido}>
            <input type="text" placeholder=${placa}>
            <button>Regiatrar</button>
        </form>
        `;
    conte_form.innerHTML= form;
}
/* mostrando el formulario registro de la opcion escogida */
const mostrando_formulario =()=>{
   if(form_registro.value == 'usuario'){
    creandoFormRegistro("GR","Nombre","Apellido","Placa");
   }else if(form_registro.value == 'vehiculo'){
    creandoFormRegistro("Destino","Vehiculo","Placa","PlacaVehiculo");
   }
}
form_registro.addEventListener("click", mostrando_formulario);

