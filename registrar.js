const form_registro = document.getElementById("form_registro");
const conte_form = document.getElementById("conte_form");
/* creando formulario de registro de usuarios y motos*/
const creandoFormRegistro = (gr,nombre,apellido,placa)=>{
    let form;
    if(nombre == 'Vehiculo'){
        form = `<input type="text" placeholder=${gr}>
        <div class="conteOptVehiculo">
            <input type="radio" id="moto" name="opt" value="Moto">
            <label for="moto">moto</label>
            <input type="radio" id="vehiculo"  name="opt" value="Vehiculo">
            <label for="vehiculo">vehiculo</label>
        </div>
        <input type="text" placeholder=${apellido}>
        <input type="text" placeholder=${placa}>
        <button>Regiatrar</button>`;
    }else{
        form = `<input type="text" placeholder=${gr}>
        <input type="text" placeholder=${nombre}>
        <input type="text" placeholder=${apellido}>
        <input type="text" placeholder=${placa}>
        <button>Regiatrar</button>`;
    }
    conte_form.innerHTML= form;
    validacionForm();
}/* mostrando el formulario registro de la opcion escogida */
let opc;
let cantidadUser = localStorage.length;
const mostrando_formulario =()=>{
   if(form_registro.value == 'usuario'){   
    creandoFormRegistro("GR","Nombre","Apellido","Placa");
   }else if(form_registro.value == 'vehiculo'){
    creandoFormRegistro("Destino","Vehiculo","Sigla","PlacaVehiculo");
    optVehiculos()}
    opc = "KEY_"+cantidadUser;
}
/* opccion de vehiculos */
let optElegida;
const optVehiculos = ()=>{
    const conteOptVehiculo = document.querySelectorAll(".conteOptVehiculo input");
    for (let i = 0; i < conteOptVehiculo.length; i++) {
        conteOptVehiculo[i].addEventListener("click", ()=>{
           optElegida = conteOptVehiculo[i].value;
           return optElegida;
        });
   }
}
form_registro.addEventListener("click", mostrando_formulario);
/* creando validacion del formulario */
const validacionForm = ()=>{
    conte_form.children[4].addEventListener("click", ()=>{
        let arr = [];
       for(let indice = 0; indice < conte_form.children.length; indice++) {
            if(indice == 1 && form_registro.value == 'vehiculo'){
                arr.push(optElegida);
            }else{
                let res = conte_form.children[indice].value;
                if(res != "")arr.push(res);
                else arr.push(res);
            }
       }
       dataLocalS(arr); 
    });
}/* validando y enviando los datos al  */
const dataLocalS = (val)=>{
    if(val[0] && val[1] && val[2] && val[3] != ""){
        let arr = [];
        let registrados = [];
          for (let i = 1; i < cantidadUser; i++) {
                let valo = localStorage.getItem("KEY_"+i);
                arr.push(JSON.parse(valo));
            }
            for (const i in arr) {
                if(arr[i] != null){
                   registrados.push(arr[i])
                }
            }
            let valor = registrados.filter(i => i[3] == val[3]);
            if(valor.length > 0){
                alert("ya estas registrado");
            }else{
                localStorage.setItem(opc,JSON.stringify(val));
                window.location.reload();
            }
    }else{
        alert("Llena todos los campos");
    }
}
