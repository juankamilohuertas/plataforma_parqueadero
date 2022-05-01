const btn_eliminar_todo = document.getElementById("btn_eliminar_todo");
const btn_eliminar_todo1 = document.getElementById("btn_eliminar_todo1");
const msj_eliminar_tabla = document.getElementById("msj_time_eliminar_data");
let btnEliminarFila = document.querySelectorAll(".btn_eliminar");
if(primerTurnoTablaUsers.children.length != 0 || primerTurnoTablaVeh.children.length != 0 ||
    segundoTurnoTablaUsers.children.length != 0 || segundoTurnoTablaVeh.children.length != 0 ||
    tercerTurnoTablaUsers.children.length != 0 || tercerTurnoTablaVeh.children.length != 0){
        // eliminando todas las tablas #0 dando click en el Boton ELIMINAR TODO
    btn_eliminar_todo.addEventListener("click", ()=>{
        let tablas = document.querySelectorAll(".tablaUser");
        for (let i = 0; i < tablas.length; i++) {
            tablas[i].style.backgroundColor="red";}
        setTimeout(()=>{
            const preguntarBorar = confirm("Ya descargaste esta tabla () veces deseas Borarla");
            if(preguntarBorar){
            localStorage.removeItem("PRIMER_TURNO_U_");
            localStorage.removeItem("SEGUNDO_TURNO_U_");
            localStorage.removeItem("TERCER_TURNO_U_");
            localStorage.removeItem("PRIMER_TURNO_V_");
            localStorage.removeItem("SEGUNDO_TURNO_V_");
            localStorage.removeItem("TERCER_TURNO_V_");
            localStorage.removeItem("INGRESO");
            localStorage.setItem("FECHA", fechaActual);
            localStorage.setItem("CONTEO", 0);
            localStorage.setItem("CONTEO_1", 0);
            localStorage.setItem("CONTEO_2", 0);
            localStorage.setItem("INGRESO_NOVEDAD", JSON.stringify(["S/N"]));
            localStorage.setItem("INGRESO_NOVEDAD_1", JSON.stringify(["S/N"]));
            localStorage.setItem("INGRESO_NOVEDAD_2", JSON.stringify(["S/N"]));
            localStorage.setItem("CANTIDAD_DE_VEHICULOS", 0);
            localStorage.setItem("CANTIDAD_DE_VEHICULOS_1", 0);
            localStorage.setItem("CANTIDAD_DE_VEHICULOS_2", 0);
            localStorage.setItem("TABLA_2_ACTIVA", true);
            }
            codigo.focus();
            window.location.reload();
        },100)
    })
}

if(primerTurnoTablaUsers1.children.length != 0 || primerTurnoTablaVeh1.children.length != 0 ||
    segundoTurnoTablaUsers1.children.length != 0 || segundoTurnoTablaVeh1.children.length != 0 ||
    tercerTurnoTablaUsers1.children.length != 0 || tercerTurnoTablaVeh1.children.length != 0){
    // eliminando todas las tablas #1 dando click en el Boton ELIMINAR TODO
    btn_eliminar_todo1.addEventListener("click", ()=>{
        let tablas1 = document.querySelectorAll(".tablaUser1");
        for (let i = 0; i < tablas1.length; i++) {
            tablas1[i].style.backgroundColor="red";}
        setTimeout(()=>{
            const preguntarBorar = confirm("Ya descargaste esta tabla () veces deseas Borarla");
            if(preguntarBorar){
            localStorage.removeItem("PRIMER_TURNO_U_1");
            localStorage.removeItem("SEGUNDO_TURNO_U_1");
            localStorage.removeItem("TERCER_TURNO_U_1");
            localStorage.removeItem("PRIMER_TURNO_V_1");
            localStorage.removeItem("SEGUNDO_TURNO_V_1");
            localStorage.removeItem("TERCER_TURNO_V_1");
            localStorage.removeItem("INGRESO");
            localStorage.setItem("CONTEO_", 0);
            localStorage.setItem("CONTEO_1_1", 0);
            localStorage.setItem("CONTEO_2_1", 0);
            localStorage.setItem("INGRESO_NOVEDAD_", JSON.stringify(["S/N"]));
            localStorage.setItem("INGRESO_NOVEDAD_1_1", JSON.stringify(["S/N"]));
            localStorage.setItem("INGRESO_NOVEDAD_2_2", JSON.stringify(["S/N"]));
            localStorage.setItem("CANTIDAD_DE_VEHICULOS_", 0);
            localStorage.setItem("CANTIDAD_DE_VEHICULOS_1_1", 0);
            localStorage.setItem("CANTIDAD_DE_VEHICULOS_2_1", 0); 
            localStorage.setItem("TABLA_2_ACTIVA", false);
            }
            window.location.reload();
            codigo.focus();
        },100)
    })
}


/* +++++++++++++++++++++  PENDIENTE +++++++++++++++++++++++ */



/* activando el botton de eliminar */
localStorage.setItem("ACTIVAR_BORRAR_TABLA_1", false);
localStorage.setItem("ACTIVAR_BORRAR_TABLA_2", false);




/* activando la tabla 2 para usar */
let tablaActiva_ = localStorage.getItem("TABLA_2_ACTIVA");
if(tablaActiva_ == "true"){
    tablaActiva.checked=tablaActiva_;
}
   
let btnEliminar = document.body.getElementsByTagName("button");
for (let i = 0; i < btnEliminar.length; i++) {
    btnEliminar[i].addEventListener("click", ()=>{
        codigo.focus();
    }) 
} 
codigo.focus();
/* borrando toda la data despues de dos dias*/
const dias = new Date();
let fechaActual = dias.getDate();
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* desabilitando btn de tabla#1 para no borar */
if(dias.getHours() > 23 || dias.getHours() < 8){
    btn_eliminar_todo.setAttribute("disabled","true");
    btn_eliminar_todo.title="Puedes Borar la Tabla a Partir de las 8:00 a.m";
    btn_eliminar_todo1.setAttribute("disabled","true");
    btn_eliminar_todo1.title="Puedes Borar la Tabla a Partir de las 8:00 a.m";
}else{
    btn_eliminar_todo.title="";
}




let trayendoFecha = localStorage.getItem("FECHA");
if(trayendoFecha < fechaActual || trayendoFecha > fechaActual){
    msj_eliminar_tabla.innerHTML = `Recuerda que hoy se borra a las <b>12:00 a.m</b> la tabla que creaste ayer, ¡--DESCARGALA--!`;
    if(dias.getHours() == 0){
        localStorage.removeItem("PRIMER_TURNO_U_");
        localStorage.removeItem("SEGUNDO_TURNO_U_");
        localStorage.removeItem("TERCER_TURNO_U_");
        localStorage.removeItem("PRIMER_TURNO_V_");
        localStorage.removeItem("SEGUNDO_TURNO_V_");
        localStorage.removeItem("TERCER_TURNO_V_");
        localStorage.removeItem("INGRESO");
        localStorage.setItem("FECHA", fechaActual);
        localStorage.setItem("CONTEO", 0);
        localStorage.setItem("CONTEO_1", 0);
        localStorage.setItem("CONTEO_2", 0);
        localStorage.setItem("INGRESO_NOVEDAD", JSON.stringify(["S/N"]));
        localStorage.setItem("INGRESO_NOVEDAD_1", JSON.stringify(["S/N"]));
        localStorage.setItem("INGRESO_NOVEDAD_2", JSON.stringify(["S/N"]));
        localStorage.setItem("CANTIDAD_DE_VEHICULOS", 0);
        localStorage.setItem("CANTIDAD_DE_VEHICULOS_1", 0);
        localStorage.setItem("CANTIDAD_DE_VEHICULOS_2", 0);
        localStorage.setItem("TABLA_2_ACTIVA", true);
    }
}else{
    msj_eliminar_tabla.innerHTML = `Mañana las <b>23:00 p.m</b> se borra la tabla que creaste hoy, ¡--DESCARGALA--!`;
}
/* CREAR NUEVA TABLA */
