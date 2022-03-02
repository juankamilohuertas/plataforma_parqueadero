const btnAddNuvUser = document.querySelector(".btnAddNuvUser");
const conteForUserAdd = document.querySelector(".conteForUserAdd");
/* formulrio de registar el usuario */
const addUser = (val, val2)=>{
    let form = `
    <input type="text" placeholder="Nombres">
    <input type="text" placeholder="Apellidos">
    <input type="text" placeholder="Grado">
    <input type="text" placeholder="Placa">
    <button class="btnRegistro">Registrar</button>
`;
conteForUserAdd.innerHTML = form;
ingresoInfoArr();
    let prev = document.querySelectorAll(".conteForUserAdd")[0].children;
    if(val != 3 && val2 != undefined){
        prev[0].value = val2[0];
        prev[1].value = val2[1];
        prev[2].value = val2[2];
        prev[3].value = val2[3];
    }else{
        conteForUserAdd.innerHTML = form;
        ingresoInfoArr();
    }
}
btnAddNuvUser.addEventListener("click", addUser);
/* leyendo los datos de entrada */
const ingresoInfoArr = ()=>{
    const itemsInput = document.querySelectorAll(".conteForUserAdd")[0].children;
    let dataUser = [];
    const btnRegistro = document.querySelector(".btnRegistro");
    btnRegistro.addEventListener("click", ()=>{
        for ( i in itemsInput) {
            if(i < 4){
                usuario = itemsInput[i].value;
                dataUser.push(usuario);
            }
        }
        info(dataUser);
    });
}
/* guardando los datos en local storague (el usuario ya estaria registrado)*/
let registrar;
let cantidadUser = localStorage.length;
const info = (dataUser)=>{
let res = [];   
for(let i = 1; i < dataUser.length; i++){
    if(dataUser[i] == ""){
        res.pop(dataUser)
    }else{
        res.push(i);
    }
}
    if(res.length == 3){
        cantidadUser += 1;
        registrar += localStorage.setItem(`USER_${cantidadUser}`,dataUser);
        localStorage.getItem(`USER_${cantidadUser}`);
    }else{
        alert("llena todos los campos");
        addUser(res.length,dataUser);
    } 
  
}
