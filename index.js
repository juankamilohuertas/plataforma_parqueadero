const dataUsuarios = {
    gr :[],
    nombreYapellido :[],
    placa :[]
}; 
/* agrego los datos del local storague al objeto dataUsuarios */
let arrUsuarios = [];
const registrado = (valor)=>{
    dataUsuarios.gr.push(valor[2]);
    dataUsuarios.nombreYapellido.push(valor[0].concat(" "+valor[1]))
    dataUsuarios.placa.push(valor[3]);
} 
/* me traigo los datos de local storage */
 let cargandoLocalSt = ()=>{
    for (let i = 1; i <= localStorage.length; i++) {
        const datos = localStorage.getItem(`USER_${i}`);
        arrUsuarios.push(datos);
        let val = arrUsuarios[i-1];
        registrado(val.split(","));
    }
} 
const ingresoCode = document.querySelector(".ingreso_code");
const mostrandoInfo = document.querySelector(".mostrandoInfo");
/* ingresando placa de usuario y retornando un objeto con la informacion del usuario*/
const ingreso =()=>{
    cargandoLocalSt();
    const data = dataUsuarios.placa.filter(v => v == ingresoCode.value);
    prevInfo(data); 
    ingresoCode.value=""; 

}

ingresoCode.addEventListener("change", ingreso);
/* inicializando y declarando las variables de fecha y hora */
const hora = new Date();
    const $dia = hora.getDate();
    const $mes = hora.getMonth()+1;
    const $año = hora.getFullYear();
    const $hora = hora.getHours();
    const $minuto = hora.getMinutes();
/* funcion que retorna la hora si es am o pm */
const horaAmOpm = ()=>{
    if($hora > 11) return `${$hora}:${$minuto} p.m.`;
    else return `${$hora}:${$minuto} a.m.`;
}
/* mostrado la info de usuario en el dom */
const prevInfo = (info)=>{
    if(info == ""){
        alert("usuario no encontrado");
    }else{
        const posicion = dataUsuarios.placa.indexOf(info[0])
        mostrandoInfo.children[0].innerHTML += `
        <tbody>
            <tr>
                <td>${$dia}/${$mes}/${$año}</td>
                <td>${horaAmOpm()}</td>
                <td>${dataUsuarios.gr[posicion]}</td>
                <td>${dataUsuarios.nombreYapellido[posicion]}</td>
                <td>${dataUsuarios.placa[posicion]}</td>
            </tr>
        </tbody>`;    
    }
};  