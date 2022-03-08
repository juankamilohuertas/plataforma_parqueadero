const form_registro = document.getElementById("form_registro");
const conte_form = document.getElementById("conte_form");
/* creando formulario de registro de usuarios y motos*/
const creandoFormRegistro = (gr,nombre,apellido,placa)=>{
    const form = `<input type="text" placeholder=${gr}>
            <input type="text" placeholder=${nombre}>
            <input type="text" placeholder=${apellido}>
            <input type="text" placeholder=${placa}>
            <button>Regiatrar</button>`;
    conte_form.innerHTML= form;
    validacionForm();
}/* mostrando el formulario registro de la opcion escogida */
let opc;
let cantidadUser = localStorage.length+1;
const mostrando_formulario =()=>{
   if(form_registro.value == 'usuario'){
    creandoFormRegistro("GR","Nombre","Apellido","Placa");
   }else if(form_registro.value == 'vehiculo'){
    creandoFormRegistro("Destino","Vehiculo","Placa","PlacaVehiculo");}
    opc = "KEY_"+cantidadUser;
}
form_registro.addEventListener("click", mostrando_formulario);
/* creando validacion del formulario */
const validacionForm = ()=>{
    conte_form.children[4].addEventListener("click", ()=>{
        let arr = [];
       for (let index = 0; index < conte_form.length-1; index++) {
            let res = conte_form.children[index].value;
           if(res != "")arr.push(res);
           else arr.push(res);
       }
       dataLocalS(arr); 
    });
}/* validando y enviando los datos al  */
const dataLocalS = (val)=>{
    if(val[0] && val[1] && val[2] && val[3] != ""){
        let arr = [];
          for (let i = 1; i < cantidadUser; i++) {
                let valo = localStorage.getItem("KEY_"+i);
                arr.push(valo.split(","))
            }
            let valor = arr.filter(i => i[3] == val[3]);
            if(valor.length > 0){
                alert("ya estas registrado")
            }else{
                localStorage.setItem(opc,val); 
                conte_form.action="index.html";
            }
    }else{
        alert("Llena todos los campos");
    }
}


