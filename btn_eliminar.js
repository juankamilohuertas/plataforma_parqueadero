const btn_eliminar_todo = document.getElementById("btn_eliminar_todo");
const msj_eliminar_tabla = document.getElementById("msj_time_eliminar_data");
let btnEliminarFila = document.querySelectorAll(".btn_eliminar");
// eliminando todas las tablas dando click en el Boton ELIMINAR TODO
if(tablaDataUsuarios.children.length != 0){
    btn_eliminar_todo.addEventListener("click", ()=>{
        const preguntarBorar = confirm("Ya descargaste esta tabla () veces deseas descargarla");
        if(preguntarBorar){
        localStorage.removeItem("USUARIO_");
        localStorage.removeItem("VEHICULOS_");
        window.location.reload();
        codigo.focus();
        }
    })
}
btn_eliminar_todo.addEventListener("click", ()=>{
    codigo.focus();
}) 
codigo.focus();

/* borrando toda la data despues de dos dias*/
const dias = new Date();
let fechaActual = dias.getDate();
let trayendoFecha = localStorage.getItem("FECHA");
    msj_eliminar_tabla.innerHTML = `Mañana a las <b>23:00 p.m</b> se borra la tabla que creaste hoy, ¡--DESCARGALA--!`;
    if(trayendoFecha < fechaActual){
    msj_eliminar_tabla.innerHTML = `Recuerda que hoy se borra a las <b>23:00 p.m</b> la tabla que creaste ayer, ¡--DESCARGALA--!`;
    if(dias.getHours() == 23){
        localStorage.removeItem("USUARIO_");
        localStorage.removeItem("VEHICULOS_");
        localStorage.removeItem("FECHA");
        localStorage.setItem("FECHA", fechaActual);}
    }
