/* ingreso de codigo de Barras */
const codigo = document.getElementById("codigo");
/* opcion de ingreso o salida */
const salida = document.getElementById("salida");
const ingreso = document.getElementById("ingreso");
salida.checked="true";
/* tabla activa */
let tablaActiva = document.getElementById("tablaActiva");
/* 1ro 2do 3ro TURNO de la (tabla #1) de usuarios*/
const primerTurnoTablaUsers = document.getElementById("primer_turno_u");
const segundoTurnoTablaUsers = document.getElementById("segundo_turno_u");
const tercerTurnoTablaUsers = document.getElementById("tercer_turno_u");
/* 1ro 2do 3ro TURNO de la (tabla #1) de vehiculos*/
const primerTurnoTablaVeh = document.getElementById("primer_turno_v");
const segundoTurnoTablaVeh = document.getElementById("segundo_turno_v");
const tercerTurnoTablaVeh = document.getElementById("tercer_turno_v");
/* 1ro 2do 3ro TURNO de la (tabla #1) de ingreso*/
const datosIngreso = document.getElementById("datos_ingreso");
const datosIngreso1 = document.getElementById("datos_ingreso_1");
const datosIngreso2 = document.getElementById("datos_ingreso_2");
/* 1ro 2do 3ro TURNO de la (tabla #2) de usuarios*/
const primerTurnoTablaUsers1 = document.getElementById("primer_turno1_u");
const segundoTurnoTablaUsers1 = document.getElementById("segundo_turno1_u");
const tercerTurnoTablaUsers1 = document.getElementById("tercer_turno1_u");
/* 1ro 2do 3ro TURNO de la (tabla #2) de vehiculos*/
const primerTurnoTablaVeh1 = document.getElementById("primer_turno1_v");
const segundoTurnoTablaVeh1 = document.getElementById("segundo_turno1_v");
const tercerTurnoTablaVeh1 = document.getElementById("tercer_turno1_v");
/* 1ro 2do 3ro TURNO de la (tabla #2) de ingreso*/
const datosIngreso_ = document.getElementById("datos_ingreso1");
const datosIngreso_1 = document.getElementById("datos_ingreso1_1");
const datosIngreso_2 = document.getElementById("datos_ingreso1_2");
/* convirtiendo los datos del local storage en un array */
let dataTodosUsers = localStorage.length;




/* let buscando = localStorage.key("key");
console.log(buscando.length) */




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
/* turno */
let turno;
let colorTurno;
/* eligiendo tabla */
const elegirTabla = ()=>{
    if(tablaActiva_ == "false" && msj_eliminar_tabla.innerHTML.includes("Mañana")){
        if(hora >= 21 || hora < 6){
            turno = "PRIMERO";
            colorTurno = "#922003";
            keyUsuario = "PRIMER_TURNO_U_";
            keyVehiculos = "PRIMER_TURNO_V_";
            tablaUsuarios = primerTurnoTablaUsers;
            tablaVehiculos = primerTurnoTablaVeh;
        }else if(hora < 13){
            turno = "SEGUNDO";
            colorTurno = "#999900";
            keyUsuario = "SEGUNDO_TURNO_U_";
            keyVehiculos = "SEGUNDO_TURNO_V_";
            tablaUsuarios = segundoTurnoTablaUsers;
            tablaVehiculos = segundoTurnoTablaVeh;
        }else if(hora < 21){
            turno = "TERCERO";
            colorTurno = "#092274";
            keyUsuario = "TERCER_TURNO_U_";
            keyVehiculos = "TERCER_TURNO_V_";
            tablaUsuarios = tercerTurnoTablaUsers;
            tablaVehiculos = tercerTurnoTablaVeh;
        }
    }else{
        if(hora < 8 || hora >= 23){
            turno = "PRIMERO";
            colorTurno = "#922003";
            keyUsuario = "PRIMER_TURNO_U_1";
            keyVehiculos = "PRIMER_TURNO_V_1";
            tablaUsuarios = primerTurnoTablaUsers1;
            tablaVehiculos = primerTurnoTablaVeh1;
        }else if(hora < 15){
            turno = "SEGUNDO";
            colorTurno = "#999900";
            keyUsuario = "SEGUNDO_TURNO_U_1";
            keyVehiculos = "SEGUNDO_TURNO_V_1";
            tablaUsuarios = segundoTurnoTablaUsers1;
            tablaVehiculos = segundoTurnoTablaVeh1;
        }else if(hora < 23){
            turno = "TERCERO";
            colorTurno = "#092274";
            keyUsuario = "TERCER_TURNO_U_1";
            keyVehiculos = "TERCER_TURNO_V_1";
            tablaUsuarios = tercerTurnoTablaUsers1;
            tablaVehiculos = tercerTurnoTablaVeh1;
        }
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
    }else if(codigo.value == "Ingreso.2022."){
        salida.checked = false;
        ingreso.checked = true; 
    }else{
        mensajes("no esta registrado/a");
        arr.splice(codigo.value);
    } 
    codigo.value= ""; codigo.focus();
}
// contenido de usuarios y vehiculos que se van a mostrar en el DOM;
let datosI = [];
let dataTotal = [];
 /* DATOS DE INGRESO */
 let fechaIngreso = fecha();
 let HoraIngreso = horas();
const infoDataUsers = (res,users,tabla,inid)=>{
    if(res == undefined) tabla.innerHTML += "";
    else{let dataTipo;
    /*++++++++++++++++++++++++++++++  TABLA #0 ++++++++++++++++++++++++++++++*/
        if(users == "PRIMER_TURNO_U_" || users == "SEGUNDO_TURNO_U_" || users == "TERCER_TURNO_U_"){
            if(tablaVehiculos.children.length >= tablaUsuarios.children.length){
              dataTipo = `
              <tr class= ${turno}>
                  <td style="background-color: ${colorTurno};">${turno}</td>
                  <td>${fecha()}</td><td>${horas()}</td><td>${res[0][0]}</td>
                  <td>${res[0][1]} ${res[0][2]}</td><td>${res[0][3]}</td>
              </tr>`;
            }else{dataTipo = "";mensajes("AL USUARIO LE FALTA EL VEHICULO");}
        }else if(users == "PRIMER_TURNO_V_" || users == "SEGUNDO_TURNO_V_" || users == "TERCER_TURNO_V_"){
            if(tablaUsuarios.children.length >= tablaVehiculos.children.length){
                dataTipo = `
                <tr class =${turno}>
                    <td>${res[0][0]}</td><td>${res[0][1]}</td>
                    <td>${res[0][2]}</td><td>${res[0][3]}</td>
                </tr>`;
            if(tablaVehiculos == primerTurnoTablaVeh){
                localStorage.setItem("CANTIDAD_DE_VEHICULOS", tablaVehiculos.children.length)
            }else if(tablaVehiculos == segundoTurnoTablaVeh){
                localStorage.setItem("CANTIDAD_DE_VEHICULOS_1", tablaVehiculos.children.length)
            }else if(tablaVehiculos == tercerTurnoTablaVeh){
                localStorage.setItem("CANTIDAD_DE_VEHICULOS_2", tablaVehiculos.children.length)
            } 
            }else{dataTipo = "";mensajes("AL VEHICULO LE FALTA EL USUARIO");}
        }
    /*++++++++++++++++++++++++++++++  TABLA #2 ++++++++++++++++++++++++++++++*/
        if(users == "PRIMER_TURNO_U_1" || users == "SEGUNDO_TURNO_U_1" || users == "TERCER_TURNO_U_1"){
            if(tablaVehiculos.children.length >= tablaUsuarios.children.length){
              dataTipo = `
              <tr class =${turno}>
                  <td style="background-color: ${colorTurno};">${turno}</td>
                  <td>${fecha()}</td><td>${horas()}</td><td>${res[0][0]}</td>
                  <td>${res[0][1]} ${res[0][2]}</td><td>${res[0][3]}</td>
              </tr>`;
            }else{dataTipo = "";mensajes("AL USUARIO LE FALTA EL VEHICULO");}
        }else if(users == "PRIMER_TURNO_V_1" || users == "SEGUNDO_TURNO_V_1" || users == "TERCER_TURNO_V_1"){
            if(tablaUsuarios.children.length >= tablaVehiculos.children.length){
                dataTipo = `
                <tr class =${turno}>
                    <td>${res[0][0]}</td><td>${res[0][1]}</td>
                    <td>${res[0][2]}</td><td>${res[0][3]}</td>
                </tr>`;
                if(tablaVehiculos == primerTurnoTablaVeh1){
                    localStorage.setItem("CANTIDAD_DE_VEHICULOS_", tablaVehiculos.children.length)
                }else if(tablaVehiculos == segundoTurnoTablaVeh1){
                    localStorage.setItem("CANTIDAD_DE_VEHICULOS_1_1", tablaVehiculos.children.length)
                }else if(tablaVehiculos == tercerTurnoTablaVeh1){
                    localStorage.setItem("CANTIDAD_DE_VEHICULOS_2_2", tablaVehiculos.children.length)
                }
            }else{dataTipo = "";mensajes("AL VEHICULO LE FALTA EL USUARIO");}
        }filaRepetida(users,tabla,inid,dataTipo);
    }codigo.focus();  
}
/* cantidad de vehiculos ingresados en el DOM (tabla #1) */
let cantidadDeVehiculos = localStorage.getItem("CANTIDAD_DE_VEHICULOS");
let converNumbreCantidadV = parseInt(cantidadDeVehiculos);
let cantidadDeVehiculos1 = localStorage.getItem("CANTIDAD_DE_VEHICULOS_1");
let converNumbreCantidadV1 = parseInt(cantidadDeVehiculos1);
let cantidadDeVehiculos2 = localStorage.getItem("CANTIDAD_DE_VEHICULOS_2");
let converNumbreCantidadV2 = parseInt(cantidadDeVehiculos2);
/* cantidad de vehiculos ingresados en el DOM (tabla #2) */
let cantidadDeVehiculos_ = localStorage.getItem("CANTIDAD_DE_VEHICULOS_");
let converNumbreCantidadV_ = parseInt(cantidadDeVehiculos_);
let cantidadDeVehiculos1_1 = localStorage.getItem("CANTIDAD_DE_VEHICULOS_1_1");
let converNumbreCantidadV1_1 = parseInt(cantidadDeVehiculos1_1);
let cantidadDeVehiculos2_2 = localStorage.getItem("CANTIDAD_DE_VEHICULOS_2_2");
let converNumbreCantidadV2_2 = parseInt(cantidadDeVehiculos2_2);
/* INGRESO DE VEHICULOS (HORA) (tabla #1)*/
let contCatualizado = localStorage.getItem("CONTEO");
localStorage.setItem("CONTEO", contCatualizado);
if(contCatualizado == 0){
    datosIngreso.style.display="none";
    localStorage.setItem("INGRESO_HORA", JSON.stringify([null]))
}
let contCatualizado1 = localStorage.getItem("CONTEO_1");
localStorage.setItem("CONTEO_1", contCatualizado1);
if(contCatualizado1 == 0){
    datosIngreso1.style.display="none";
    localStorage.setItem("INGRESO_HORA_1", JSON.stringify([null]))
}
let contCatualizado2 = localStorage.getItem("CONTEO_2");
localStorage.setItem("CONTEO_2", contCatualizado2);
if(contCatualizado2 == 0){
    datosIngreso2.style.display="none";
    localStorage.setItem("INGRESO_HORA_2", JSON.stringify([null]))
}

/* INGRESO DE VEHICULOS (HORA) (tabla #2)*/
let contCatualizado_ = localStorage.getItem("CONTEO_");
localStorage.setItem("CONTEO_", contCatualizado_);
if(contCatualizado_ == 0){
    datosIngreso_.style.display="none";
    localStorage.setItem("INGRESO_HORA_", JSON.stringify([null]))
}
let contCatualizado_1 = localStorage.getItem("CONTEO_1_1");
localStorage.setItem("CONTEO_1_1", contCatualizado_1);
if(contCatualizado_1 == 0){
    datosIngreso_1.style.display="none";
    localStorage.setItem("INGRESO_HORA_1_1", JSON.stringify([null]))
}
let contCatualizado_2 = localStorage.getItem("CONTEO_2_1");
localStorage.setItem("CONTEO_2_1", contCatualizado_2);
if(contCatualizado_2 == 0){
    datosIngreso_2.style.display="none";
    localStorage.setItem("INGRESO_HORA_2_1", JSON.stringify([null]))
}




const tablaIngresoHora = (valor,fila)=>{
    if(salida.checked === true){
        
    }else{
        if(fila.includes(codigo.value)){
            for (let i = 0; i < primerTurnoTablaVeh.children.length; i++) {
                if(primerTurnoTablaVeh.children[i].children[3].textContent.includes(valor)){
                    if(converHora[i] == null || converHora[i] == "SIN INGRESO"){
                        converHora[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA", JSON.stringify(converHora))
                        localStorage.setItem("CONTEO", parseInt(contCatualizado) + 1);
                    }
                }
            }
            for (let i = 0; i < segundoTurnoTablaVeh.children.length; i++) {
                if(segundoTurnoTablaVeh.children[i].children[3].textContent.includes(valor)){
                    if(converHora1[i] == null || converHora1[i] == "SIN INGRESO"){
                        converHora1[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA_1", JSON.stringify(converHora1))
                        localStorage.setItem("CONTEO_1", parseInt(contCatualizado1) + 1);
                    }
                }
            }  
            for (let i = 0; i < tercerTurnoTablaVeh.children.length; i++) {
                if(tercerTurnoTablaVeh.children[i].children[3].textContent.includes(valor)){
                    if(converHora2[i] == null || converHora2[i] == "SIN INGRESO"){
                        converHora2[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA_2", JSON.stringify(converHora2))
                        localStorage.setItem("CONTEO_2", parseInt(contCatualizado2) + 1);
                    }
                }
            }
            /* +++++++++++++++++++++++++++++++++++++++++++++++++ */
            for (let i = 0; i < primerTurnoTablaVeh1.children.length; i++) {
                if(primerTurnoTablaVeh1.children[i].children[3].textContent.includes(valor)){
                    if(converHora_[i] == null || converHora_[i] == "SIN INGRESO"){
                        converHora_[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA_", JSON.stringify(converHora_))
                        localStorage.setItem("CONTEO_", parseInt(contCatualizado_) + 1);
                    }
                }
            }
            for (let i = 0; i < segundoTurnoTablaVeh1.children.length; i++) {
                if(segundoTurnoTablaVeh1.children[i].children[3].textContent.includes(valor)){
                    if(converHora1_1[i] == null || converHora1_1[i] == "SIN INGRESO"){
                        converHora1_1[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA_1_1", JSON.stringify(converHora1_1))
                        localStorage.setItem("CONTEO_1_1", parseInt(contCatualizado_1) + 1);
                    }
                }
            }  
            for (let i = 0; i < tercerTurnoTablaVeh1.children.length; i++) {
                if(tercerTurnoTablaVeh1.children[i].children[3].textContent.includes(valor)){
                    if(converHora2_2[i] == null || converHora2_2[i] == "SIN INGRESO"){
                        converHora2_2[i] = HoraIngreso; 
                        localStorage.setItem("INGRESO_HORA_2_1", JSON.stringify(converHora2_2))
                        localStorage.setItem("CONTEO_2_1", parseInt(contCatualizado_2) + 1);
                    }
                }
            }
        }else{
            
        }    
    }
}
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
setTimeout(()=>{/* INGRESO DE VEHICULOS (NOVEDAD) (tabla #1)*/
    let novedades = [];
    for (let i = 0; i < datosIngreso.children.length; i++) {
        novedades.push(converNovedad[i]);
        let novedad = datosIngreso.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD", JSON.stringify(novedades))
        })  
    }
    let novedades1 = [];
    for (let i = 0; i < datosIngreso1.children.length; i++) {
        novedades1.push(converNovedad1[i]);
        let novedad = datosIngreso1.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades1[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD_1", JSON.stringify(novedades1))
        })  
    }
    let novedades2 = [];
    for (let i = 0; i < datosIngreso2.children.length; i++) {
        novedades2.push(converNovedad2[i]);
        let novedad = datosIngreso2.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades2[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD_2", JSON.stringify(novedades2))
        })  
    }/* INGRESO DE VEHICULOS (NOVEDAD) (tabla #2) */
    let novedades_ = [];
    for (let i = 0; i < datosIngreso_.children.length; i++) {
        novedades_.push(converNovedad_[i]);
        let novedad = datosIngreso_.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades_[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD_", JSON.stringify(novedades_))
        })  
    }
    let novedades_1 = [];
    for (let i = 0; i < datosIngreso_1.children.length; i++) {
        novedades_1.push(converNovedad_1[i]);
        let novedad = datosIngreso_1.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades_1[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD_1_1", JSON.stringify(novedades_1))
        })  
    }
    let novedades_2 = [];
    for (let i = 0; i < datosIngreso_2.children.length; i++) {
        novedades_2.push(converNovedad_2[i]);
        let novedad = datosIngreso_2.children[i].children[2].children[0];
        novedad.addEventListener("change", ()=>{
            novedades_2[i] = novedad.value;
            localStorage.setItem("INGRESO_NOVEDAD_2_2", JSON.stringify(novedades_2))
        })  
    }
},100);
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* MOSTRANDO EL INGRESO DE VEHICULOS EN EL DOM (tabla #1)*/
/* validando el ingreso de la hora */
let infoHora = localStorage.getItem("INGRESO_HORA");
let converHora = JSON.parse(infoHora);
let infoHora1 = localStorage.getItem("INGRESO_HORA_1");
let converHora1 = JSON.parse(infoHora1);
let infoHora2 = localStorage.getItem("INGRESO_HORA_2");
let converHora2 = JSON.parse(infoHora2);
/* MOSTRANDO EL INGRESO DE VEHICULOS EN EL DOM (tabla #2)*/
/* validando el ingreso de la hora */
let infoHora_ = localStorage.getItem("INGRESO_HORA_");
let converHora_ = JSON.parse(infoHora_);
let infoHora1_1 = localStorage.getItem("INGRESO_HORA_1_1");
let converHora1_1 = JSON.parse(infoHora1_1);
let infoHora2_2 = localStorage.getItem("INGRESO_HORA_2_1");
let converHora2_2 = JSON.parse(infoHora2_2);

/* validando el ingreso de novedad (tabla #1)*/
let dataNovedad = localStorage.getItem("INGRESO_NOVEDAD");
let converNovedad = JSON.parse(dataNovedad);
let dataNovedad1 = localStorage.getItem("INGRESO_NOVEDAD_1");
let converNovedad1 = JSON.parse(dataNovedad1);
let dataNovedad2 = localStorage.getItem("INGRESO_NOVEDAD_2");
let converNovedad2 = JSON.parse(dataNovedad2);

/* validando el ingreso de novedad (tabla #2)*/
let dataNovedad_ = localStorage.getItem("INGRESO_NOVEDAD_");
let converNovedad_ = JSON.parse(dataNovedad_);
let dataNovedad_1 = localStorage.getItem("INGRESO_NOVEDAD_1_1");
let converNovedad_1 = JSON.parse(dataNovedad_1);
let dataNovedad_2 = localStorage.getItem("INGRESO_NOVEDAD_2_2");
let converNovedad_2 = JSON.parse(dataNovedad_2);

/* mostrando las novedades en el DOM (tabla #1) */
if(converHora != null){
    for (let i = 0; i < converNumbreCantidadV; i++) {
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
if(converHora1 != null){
    for (let i = 0; i < converNumbreCantidadV1; i++) {
        if(converHora1[i] == null)converHora1[i] = "SIN INGRESO";
        if(converNovedad1[i] == null)converNovedad1[i] = "S/N";
        
        datosIngreso1.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora1[i]}</td>
            <td><input type="text" value="${converNovedad1[i]}"></td>
        </tr>`; 
    }
}
if(converHora2 != null){
    for (let i = 0; i < converNumbreCantidadV2; i++) {
        if(converHora2[i] == null)converHora2[i] = "SIN INGRESO";
        if(converNovedad2[i] == null)converNovedad2[i] = "S/N";
        
        datosIngreso2.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora2[i]}</td>
            <td><input type="text" value="${converNovedad2[i]}"></td>
        </tr>`; 
    }
}
/* mostrando las novedades en el DOM (tabla #2) */
if(converHora_ != null){
    for (let i = 0; i < converNumbreCantidadV_; i++) {
        if(converHora_[i] == null)converHora_[i] = "SIN INGRESO";
        if(converNovedad_[i] == null)converNovedad_[i] = "S/N";
        
        datosIngreso_.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora_[i]}</td>
            <td><input type="text" value="${converNovedad_[i]}"></td>
        </tr>`; 
    }
}
if(converHora1_1 != null){
    for (let i = 0; i < converNumbreCantidadV1_1; i++) {
        if(converHora1_1[i] == null)converHora1_1[i] = "SIN INGRESO";
        if(converNovedad_1[i] == null)converNovedad_1[i] = "S/N";
        
        datosIngreso_1.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora1_1[i]}</td>
            <td><input type="text" value="${converNovedad_1[i]}"></td>
        </tr>`; 
    }
}
if(converHora2_2 != null){
    for (let i = 0; i < converNumbreCantidadV2_2; i++) {
        if(converHora2_2[i] == null)converHora2_2[i] = "SIN INGRESO";
        if(converNovedad_2[i] == null)converNovedad_2[i] = "S/N";
        
        datosIngreso_2.innerHTML += `
        <tr>
            <td>${fecha()}</td>
            <td>${converHora2_2[i]}</td>
            <td><input type="text" value="${converNovedad_2[i]}"></td>
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
         console.log(users)
        localStorage.setItem(users, JSON.stringify(tabla.innerHTML += dataTipo));
        window.location.reload();
    }else{
        for (let i = 0; i < filasTabla.length; i++) {
            fila.push(filasTabla[i].children[inid].textContent);
        }
        if(fila.includes(codigo.value)){
         /* mensajes("¡..YA HA SIDO AGREGADO ESTE USUARIO..!");  */ 
         if(users == "PRIMER_TURNO_V_" || users == "SEGUNDO_TURNO_V_" || users == "TERCER_TURNO_V_"
         || users == "PRIMER_TURNO_V_1" || users == "SEGUNDO_TURNO_V_1" || users == "TERCER_TURNO_V_1"){
            tablaIngresoHora(codigo.value, fila);
            window.location.reload();
         }
        }else{
            localStorage.setItem(users, JSON.stringify(tabla.innerHTML += dataTipo));
        }       
    }   
}
/* mostrando el usuario y vehiculo en el DOM  (tabla #1) */
let primero_u = localStorage.getItem("PRIMER_TURNO_U_");
let prev_primero_User = JSON.parse(primero_u)
primerTurnoTablaUsers.innerHTML = prev_primero_User; 

let segundo_u = localStorage.getItem("SEGUNDO_TURNO_U_");
let prev_segundo_User = JSON.parse(segundo_u)
segundoTurnoTablaUsers.innerHTML = prev_segundo_User; 

let tercero_u = localStorage.getItem("TERCER_TURNO_U_");
let prev_tercero_User = JSON.parse(tercero_u)
tercerTurnoTablaUsers.innerHTML = prev_tercero_User; 


let primero_veh = localStorage.getItem("PRIMER_TURNO_V_");
let prev_primero_Veh = JSON.parse(primero_veh)
primerTurnoTablaVeh.innerHTML = prev_primero_Veh;

let segundo_veh = localStorage.getItem("SEGUNDO_TURNO_V_");
let prev_segundo_Veh = JSON.parse(segundo_veh)
segundoTurnoTablaVeh.innerHTML = prev_segundo_Veh;

let tercero_veh = localStorage.getItem("TERCER_TURNO_V_");
let prev_tercero_Veh = JSON.parse(tercero_veh)
tercerTurnoTablaVeh.innerHTML = prev_tercero_Veh;


/* mostrando el usuario y vehiculo en el DOM  (tabla #2) */
let primero_u_ = localStorage.getItem("PRIMER_TURNO_U_1");
let prev_primero_User_ = JSON.parse(primero_u_)
primerTurnoTablaUsers1.innerHTML = prev_primero_User_; 

let primero_u_1 = localStorage.getItem("SEGUNDO_TURNO_U_1");
let prev_primero_User_1 = JSON.parse(primero_u_1)
segundoTurnoTablaUsers.innerHTML = prev_primero_User_1;

let primero_u_2 = localStorage.getItem("TERCER_TURNO_U_1");
let prev_primero_User_2 = JSON.parse(primero_u_2)
tercerTurnoTablaUsers1.innerHTML = prev_primero_User_2;


let primero_veh1 = localStorage.getItem("PRIMER_TURNO_V_1");
let prev_primero_Veh1 = JSON.parse(primero_veh1)
primerTurnoTablaVeh1.innerHTML = prev_primero_Veh1;

let segundo_veh1 = localStorage.getItem("SEGUNDO_TURNO_V_1");
let prev_segundo_Veh1 = JSON.parse(segundo_veh1)
segundoTurnoTablaVeh1.innerHTML = prev_segundo_Veh1;

let tercer_veh1 = localStorage.getItem("TERCER_TURNO_V_1");
let prev_tercer_Veh1 = JSON.parse(tercer_veh1)
tercerTurnoTablaVeh1.innerHTML = prev_tercer_Veh1;
