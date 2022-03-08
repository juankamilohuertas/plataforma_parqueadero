const codigo = document.getElementById("codigo");
const tablaDataUsuarios = document.getElementById("datos_usuario");
const tablaDataVehiculos = document.getElementById("datos_vehiculo");
/* convirtiendo los datos del local storage en un array */
let dataTodosUsers = localStorage.length+1;
const ingresoCodigo = ()=>{
    let val;
    let arr =[];
    for(let index = 1; index < dataTodosUsers;index++) {
       val = localStorage.getItem("KEY_"+index);
       arr.push(val)
    }   
   recibiendoDatos(arr);
}
codigo.addEventListener("change", ingresoCodigo);
/* recibiendo el array y filtrando la info para buscar el codigo de barras */
let recibiendoDatos =(arr)=>{
    let dataCode = [];
    for (const key in arr) {
        let ultimoArr = arr[key].split(",");
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
const hora =()=>{
    let _hora;
    const $hora = new Date();
    const hora = $hora.getHours();
    const minutos = $hora.getMinutes();
    if($hora > 11)_hora = "p.m.";
    else _hora = "a.m.";
    
    return `${hora}:${minutos}${_hora}`;
}

/* mostrando la info recibida por los datos filtrados */
const mostrandoInfo = (dataCode)=>{
    let res = dataCode.filter(i => i.includes(codigo.value));
    if(res[0] != undefined){
        if(res[0][3] == codigo.value){
            let users;
            if(res[0][1] != "MOTO" && res[0][1] != "VEHICULO"){
                users = `
                <tr>
                <td>${fecha()}</td>
                <td>${hora()}</td>
                <td>${res[0][0]}</td>
                <td>${res[0][1]} ${res[0][2]}</td>
                <td>${res[0][3]}</td>
                </tr>`;
                tablaDataUsuarios.innerHTML += users;   
            }else{
                users = `
                <tr>         
                <td>${res[0][0]}</td>
                <td>${res[0][1]}</td>
                <td>${res[0][2]}</td>
                <td>${res[0][3]}</td>
                </tr>`;
                tablaDataVehiculos.innerHTML += users;   
            }
        }
    }else{
        alert("no esta registrado/a");
    }
    
}
