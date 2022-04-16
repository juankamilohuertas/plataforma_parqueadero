const btn_eliminar_todo = document.getElementById("btn_eliminar_todo");
const btn_eliminar_todo1 = document.getElementById("btn_eliminar_todo1");
const msj_eliminar_tabla = document.getElementById("msj_time_eliminar_data");
let btnEliminarFila = document.querySelectorAll(".btn_eliminar");
/* mensaje de tiempo que le queda por descargar la tabla */
msj_eliminar_tabla.innerHTML = `Mañana a las <b>23:00 p.m</b> se borra la tabla que creaste hoy, ¡--DESCARGALA--!`;
if(tablaDataUsuarios.children.length != 0 || tablaDataVehiculos.children.length != 0){
    // eliminando todas las tablas #0 dando click en el Boton ELIMINAR TODO
    btn_eliminar_todo.addEventListener("click", ()=>{
        let tablas = document.querySelectorAll(".tablaUser");
        for (let i = 0; i < tablas.length; i++) {
            tablas[i].style.backgroundColor="red";}
        setTimeout(()=>{
            const preguntarBorar = confirm("Ya descargaste esta tabla () veces deseas Borarla");
            if(preguntarBorar){
            localStorage.removeItem("USUARIO_");
            localStorage.removeItem("VEHICULOS_");
            localStorage.removeItem("INGRESO");
            localStorage.setItem("FECHA", fechaActual);
            }
            codigo.focus();
            window.location.reload();
        },100)
    })
}
if(tablaDataUsuarios1.children.length != 0 || tablaDataVehiculos1.children.length != 0){
    // eliminando todas las tablas #1 dando click en el Boton ELIMINAR TODO
    btn_eliminar_todo1.addEventListener("click", ()=>{
        let tablas1 = document.querySelectorAll(".tablaUser1");
        for (let i = 0; i < tablas1.length; i++) {
            tablas1[i].style.backgroundColor="red";}
        setTimeout(()=>{
            const preguntarBorar = confirm("Ya descargaste esta tabla () veces deseas Borarla");
            if(preguntarBorar){
            localStorage.removeItem("USUARIO_1");
            localStorage.removeItem("VEHICULOS_1");
            localStorage.setItem("FECHA", fechaActual);
            }
            window.location.reload();
            codigo.focus();
        },100)
    })
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
let trayendoFecha = localStorage.getItem("FECHA");
if(trayendoFecha < fechaActual){
msj_eliminar_tabla.innerHTML = `Recuerda que hoy se borra a las <b>23:00 p.m</b> la tabla que creaste ayer, ¡--DESCARGALA--!`;
if(dias.getHours() == 23 ){
    localStorage.removeItem("USUARIO_");
    localStorage.removeItem("VEHICULOS_");
    localStorage.removeItem("FECHA");
    localStorage.setItem("FECHA", fechaActual);}
}

/* CREAR NUEVA TABLA */


