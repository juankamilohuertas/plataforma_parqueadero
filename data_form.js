const codigo = document.getElementById("codigo");
const tablaDataUsuarios = document.getElementById("datos_usuario");
const tablaDataVehiculos = document.getElementById("datos_vehiculo");
/* convirtiendo los datos del local storage en un array */
let dataTodosUsers = localStorage.length;
const ingresoCodigo = ()=>{
    let arr =[];
    let registroNull = [];
    for(let index = 0; index < dataTodosUsers;index++) {
       val = localStorage.getItem("KEY_"+index);
       arr.push(JSON.parse(val))
    }   
    for (let i in arr) {
        if(arr[i] != null){
            registroNull.push(arr[i])
        }
    }
   recibiendoDatos(registroNull);
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
                infoDataUsers(res,"USUARIO_",tablaDataUsuarios,4);  
            }else{
                infoDataUsers(res,"VEHICULOS_",tablaDataVehiculos,3);
            }
            arr.push(codigo.value);
        }
    }else{
        alert("no esta registrado/a");
        arr.splice(codigo.value);
    } 
    codigo.value= "";
}
// contenido de usuarios y vehiculos que se van a mostrar en el DOM;
const infoDataUsers = (res,users,tabla,inid)=>{
    if(res == undefined) tabla.innerHTML += "";
    else{
        let dataTipo;
        if(users == "USUARIO_"){
            dataTipo = `<tr>
            <td>${fecha()}</td>
            <td>${hora()}</td>
            <td>${res[0][0]}</td>
            <td>${res[0][1]} ${res[0][2]}</td>
            <td>${res[0][3]}</td>`;
        }else{
            dataTipo = `
            <tr>
                <td>${res[0][0]}</td><td>${res[0][1]}</td>
                <td>${res[0][2]}</td><td>${res[0][3]}</td>
                <td><button>ELIMINAR</button></td></tr>
            </tr>`; 
        }
        filaRepetida(users,tabla,inid,dataTipo);
    }      
} 
/* asignando cada dato a la tabla y si no se repite el valor se incerta en el DOM
LO QUE EJECUTA LA FUNCION infoDataUsers y llevando la data al sessionstorage*/
const filaRepetida = (users,tabla,inid,dataTipo)=>{
    const filasTabla = tabla.children;
    let fila = [];
     if(filasTabla.length == 0){
        localStorage.setItem(users, tabla.innerHTML += dataTipo);
    }else{
        for (let i = 0; i < filasTabla.length; i++) {
            fila.push(filasTabla[i].children[inid].textContent);}
        if(fila.includes(codigo.value)){
            document.getElementById("error_Agregado_tabla").innerHTML = "¡..YA HA SIDO AGREGADO ESTE USUARIO..!";
            setInterval(()=>{
                document.getElementById("error_Agregado_tabla").innerHTML = "";
            },5000)
        }else localStorage.setItem(users, tabla.innerHTML += dataTipo);
    }   
}
let use = localStorage.getItem("USUARIO_");
tablaDataUsuarios.innerHTML = use; 


let veh = localStorage.getItem("VEHICULOS_");
tablaDataVehiculos.innerHTML = veh;
