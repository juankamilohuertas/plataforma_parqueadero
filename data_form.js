const codigo = document.getElementById("codigo");
const tablaDataUsuarios = document.getElementById("datos_usuario");
const tablaDataVehiculos = document.getElementById("datos_vehiculo");
const tablaDataUsuarios1 = document.getElementById("datos_usuario1");
const tablaDataVehiculos1 = document.getElementById("datos_vehiculo1");
const datosIngreso = document.getElementById("datos_ingreso");
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
const $fecha = new Date();
const fecha = ()=>{
    const day = $fecha.getDate();
    const month = $fecha.getMonth()+1;
    const year = $fecha.getFullYear();
    return `${day}/${month}/${year}`;
}
/* hora */
const hora = $fecha.getHours();
const minutos = $fecha.getMinutes();
const horas =()=>{
    let _hora;
    if(hora > 11)_hora = " p.m.";
    else _hora = " a.m.";
    return `${hora}:${minutos}${_hora}`;
}


/* mostrando la info recibida por los datos filtrados y validando*/
let arr = [];
let keyUsuario;
let keyVehiculos;
let tablaUsuarios;
let tablaVehiculos;
/* eligiendo tabla */
const elegirTabla = ()=>{
    if(msj_eliminar_tabla.innerHTML.includes("Mañana")){
        keyUsuario = "USUARIO_";
        keyVehiculos = "VEHICULOS_";
        tablaUsuarios = tablaDataUsuarios;
        tablaVehiculos = tablaDataVehiculos;
    }else{
        keyUsuario = "USUARIO_1";
        keyVehiculos = "VEHICULOS_1";
        tablaUsuarios = tablaDataUsuarios1;
        tablaVehiculos = tablaDataVehiculos1;
    }
}
const mostrandoInfo = (dataCode)=>{
    elegirTabla();
    let res = dataCode.filter(i => i.includes(codigo.value));
    if(res[0] != undefined){
        if(res[0][3] == codigo.value){
            if(res[0][1] != "Moto" && res[0][1] != "Vehiculo"){
                infoDataUsers(res,keyUsuario,tablaUsuarios,5);   
            }else{
                infoDataUsers(res,keyVehiculos,tablaVehiculos,3);
            }
            arr.push(codigo.value);
        }
    }else{
        mensajes("no esta registrado/a");
        arr.splice(codigo.value);
    } 
    codigo.value= ""; codigo.focus();
}
/* turno */
let turno;
let colorTurno;
const turnos = ()=>{
    if(hora < 8 || hora >= 23){
        turno = "PRIMERO";
        colorTurno = "#922003";
    }else if(hora < 15){
        turno = "SEGUNDO";
        colorTurno = "#999900";
    }else if(hora < 23){
        turno = "TERCERO";
        colorTurno = "#092274";
    }
}
// contenido de usuarios y vehiculos que se van a mostrar en el DOM;
let datosI = [];
let dataTotal = [];
 /* DATOS DE INGRESO */
 let fechaIngreso = fecha();
 let HoraIngreso = horas();
const infoDataUsers = (res,users,tabla,inid)=>{
    if(res == undefined) tabla.innerHTML += "";
    else{let dataTipo;turnos();
        if(users == keyUsuario){
            if(tablaDataVehiculos.children.length >= tablaDataUsuarios.children.length){
              dataTipo = `
              <tr class= "filasUsuarios">
                  <td style="background-color: ${colorTurno};">${turno}</td>
                  <td>${fecha()}</td>
                  <td>${horas()}</td>
                  <td>${res[0][0]}</td>
                  <td>${res[0][1]} ${res[0][2]}</td>
                  <td>${res[0][3]}</td>
              </tr>`;
            }else{  
              dataTipo = "";
              mensajes("AL USUARIO LE FALTA EL VEHICULO"); 
            }
        }else if(users == keyVehiculos){
            if(tablaDataUsuarios.children.length >= tablaDataVehiculos.children.length){
                dataTipo = `
                <tr class ="filasVehiculos">
                    <td>${res[0][0]}</td><td>${res[0][1]}</td>
                    <td>${res[0][2]}</td><td>${res[0][3]}</td>
                </tr>`; 
            }else{
                dataTipo = "";
                mensajes("AL VEHICULO LE FALTA EL USUARIO"); 
            }
        }filaRepetida(users,tabla,inid,dataTipo);
    }codigo.focus();  
}

/* INGRESO DE VEHICULOS (HORA)*/
let contCatualizado = localStorage.getItem("CONTEO");
localStorage.setItem("CONTEO", contCatualizado);
if(contCatualizado == 0){
    datosIngreso.style.display="none";
    localStorage.setItem("INGRESO_HORA", JSON.stringify([null]))
}
const tablaIngresoHora = (valor)=>{
    for (let i = 0; i < tablaDataVehiculos.children.length; i++) {
        if(tablaDataVehiculos.children[i].children[3].textContent.includes(valor)){
            if(converHora[i] == null || converHora[i] == "SIN INGRESO"){
                converHora[i] = HoraIngreso; 
                localStorage.setItem("INGRESO_HORA", JSON.stringify(converHora))
            }
        }     
    }
    localStorage.setItem("CONTEO", 1);
}
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */







/* INGRESO DE VEHICULOS (NOVEDAD)*/

setTimeout(()=>{
    let novedades = [];
    for (let i = 0; i < datosIngreso.children.length; i++) {
        novedades.push(converNovedad[i]);
        let novedad = datosIngreso.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD", JSON.stringify(novedades))
        })  
    }
},100);


/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */







/* MOSTRANDO EL INGRESO DE VEHICULOS EN EL DOM*/
let infoHora = localStorage.getItem("INGRESO_HORA");
let converHora = JSON.parse(infoHora);
let dataNovedad = localStorage.getItem("INGRESO_NOVEDAD");
let converNovedad = JSON.parse(dataNovedad);
if(converHora != null){
    for (let i = 0; i < converHora.length; i++) {
        if(converHora[i] == null)converHora[i] = "SIN INGRESO";
        if(converNovedad[i] == null)converNovedad[i] = "S/N";
        
        datosIngreso.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora[i]}</td>
            <td><input type="text" value="${converNovedad[i]}"></td>
        </tr>`; 
    }
}


/* asignando cada dato a la tabla y si no se repite el valor se incerta en el DOM
LO QUE EJECUTA LA FUNCION infoDataUsers y llevando la data al localstorague*/
let validacion = [];
const filaRepetida = (users,tabla,inid,dataTipo)=>{
    const filasTabla = tabla.children;
    let fila = [];
     if(filasTabla.length == 0){
        localStorage.setItem(users, JSON.stringify(tabla.innerHTML += dataTipo));
        window.location.reload();
    }else{
        for (let i = 0; i < filasTabla.length; i++) {
            fila.push(filasTabla[i].children[inid].textContent);}
        if(fila.includes(codigo.value)){
         /* mensajes("¡..YA HA SIDO AGREGADO ESTE USUARIO..!");  */
         if(users == "VEHICULOS_"){
            tablaIngresoHora(codigo.value,0)
            window.location.reload();
         }
        }else{localStorage.setItem(users, JSON.stringify(tabla.innerHTML += dataTipo));}  
    }   
}
let use = localStorage.getItem("USUARIO_");
let prevUser = JSON.parse(use)
tablaDataUsuarios.innerHTML = prevUser; 
let veh = localStorage.getItem("VEHICULOS_");
let prevVehiculo = JSON.parse(veh)
tablaDataVehiculos.innerHTML = prevVehiculo;


let use1 = localStorage.getItem("USUARIO_1");
let prevUser1 = JSON.parse(use1)
tablaDataUsuarios1.innerHTML = prevUser1; 
let veh1 = localStorage.getItem("VEHICULOS_1");
let prevVehiculo1 = JSON.parse(veh1)
tablaDataVehiculos1.innerHTML = prevVehiculo1;
