const codigo = document.getElementById("codigo");
const tablaDataUsuarios = document.getElementById("datos_usuario");
const tablaDataVehiculos = document.getElementById("datos_vehiculo");
/* convirtiendo los datos del local storage en un array */
let dataTodosUsers = localStorage.length;
const ingresoCodigo = ()=>{
    let arr =[];
    for(let index = 0; index < dataTodosUsers;index++) {
       val = localStorage.getItem("KEY_"+index);
       arr.push(JSON.parse(val))
    }   
   recibiendoDatos(arr);
}
codigo.addEventListener("change", ingresoCodigo);
/* recibiendo el array y filtrando la info para buscar el codigo de barras */
let recibiendoDatos =(arr)=>{
    let dataCode = [];
    for (const key in arr) {
        let ultimoArr = arr[key];
        dataCode.push(ultimoArr);
    }
    mostrandoInfo(dataCode);
}
/* fecha */
const fecha = ()=>{
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getMonth()+1;
    const year = fecha.getFullYear();
    return `${day}/${month}/${year}`;
}
/* hora */
const hora =()=>{
    let _hora;
    const $hora = new Date();
    const hora = $hora.getHours();
    const minutos = $hora.getMinutes();
    if(hora > 11)_hora = " p.m.";
    else _hora = " a.m.";
    
    return `${hora}:${minutos}${_hora}`;
}

/* mostrando la info recibida por los datos filtrados y validando*/
let arr = [];
const mostrandoInfo = (dataCode)=>{
    let res = dataCode.filter(i => i.includes(codigo.value));
    if(res[0] != undefined){
        if(res[0][3] == codigo.value){
            if(res[0][1] != "Moto" && res[0][1] != "Vehiculo"){
                infoDataUsers(res);  
            }else{
                infoDataVehiculos(res);
            }
            arr.push(codigo.value);
        }
    }else{
        alert("no esta registrado/a");
        arr.splice(codigo.value);
    } 
    codigo.value= "";
}
/* asignando cada dato a la tabla y si no se repite el valor re incerta en el dom y llevando la data al sessionstorage*/
let registroDeTabla = sessionStorage.length;

const infoDataUsers = (res)=>{
        let arreglo = [];
      if(arreglo.includes(codigo.value)){
        tablaDataUsuarios.innerHTML += ""; 
      }else{
        for (let i = 0; i < registroDeTabla; i++) {
            let ret = sessionStorage.getItem("TABLA_"+i)
            arreglo.push(JSON.parse(ret));
        }
        let retorno = [];
        for (const key in arreglo){
            retorno.push(arreglo[key][4]);
        }
        if(retorno.includes(codigo.value)){
        mostrarContenido(arreglo);
        }else{
        let registro = [fecha(),hora(),res[0][0],res[0][1]+" "+res[0][2],res[0][3]]
        sessionStorage.setItem("TABLA_"+registroDeTabla++, JSON.stringify(registro));}
    }
}
const infoDataVehiculos = (res,vehiculos)=>{
    if(arr.includes(codigo.value)){
        tablaDataVehiculos.innerHTML += "";    
    }else{
        vehiculos = `
        <tr>         
        <td>${res[0][0]}</td>
        <td>${res[0][1]}</td>
        <td>${res[0][2]}</td>
        <td>${res[0][3]}</td>
        </tr>`;
        tablaDataVehiculos.innerHTML += vehiculos;   
    }
}
const mostrarContenido = (arreglo)=>{
    let users;
    for (let i = 0; i < arreglo.length; i++) {
        users += `
            <tr>
                <td>${arreglo[i][0]}</td>
                <td>${arreglo[i][1]}</td>
                <td>${arreglo[i][2]}</td>
                <td>${arreglo[i][3]}</td>
                <td>${arreglo[i][4]}</td>
            </tr>`;
        }     
        tablaDataUsuarios.innerHTML = users; 
}