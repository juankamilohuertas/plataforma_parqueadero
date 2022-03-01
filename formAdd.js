const btnAddNuvUser = document.querySelector(".btnAddNuvUser");
const conteForUserAdd = document.querySelector(".conteForUserAdd");
/* formulrio de registar el usuario */
const addUser = ()=>{
    let form = `
    <input type="text" placeholder="Nombres">
    <input type="text" placeholder="Apellidos">
    <input type="text" placeholder="Grado">
    <input type="text" placeholder="Placa">
    <input class="btnRegistro" type="submit" value="Registrar">
`;
conteForUserAdd.innerHTML = form;
ingresoInfoArr();
}
btnAddNuvUser.addEventListener("click", addUser);
/* leyendo los datos de entrada */
const ingresoInfoArr = ()=>{
    let dataUser = [];
    const itemsInput = document.querySelectorAll(".conteForUserAdd")[0].children;
    const btnRegistro = document.querySelector(".btnRegistro");
    btnRegistro.addEventListener("click", ()=>{
        for ( i in itemsInput) {
            if(i < 4){
                let usuario = itemsInput[i].value;
                dataUser.push(usuario);
            }
        }
        info(dataUser);
        location.reload("index.html");
    });
}
/* guardando los datos en local storague (el usuario ya estaria registrado)*/
let registrar;
let cantidadUser = localStorage.length;
const info = (dataUser)=>{
    cantidadUser += 1;
    registrar += localStorage.setItem(`USER_${cantidadUser}`, dataUser);
    localStorage.getItem(`USER_${cantidadUser}`);
    conteForUserAdd.innerHTML = "";
}