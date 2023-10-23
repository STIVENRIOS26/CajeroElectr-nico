const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLoginPopup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active')
})
loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active')
})
btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup')
})
iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup')
})

//login

function inicioSesion(){
    let username=document.getElementById("user").value;
    let password=document.getElementById("pass").value;

    if (username=="Deiby" && password =="Hola123"){
        window.location.href="Bienvenido.html";
    }else{
        alert("Datos incorrectos")
    }
}


/* const logout =()=>{
    sessionStorage.removeItem('token')
    window.location='index.html'
}

const logoutButton = document.querySelector('')
logoutButton.addEventListener('click', logout) */
//funciones

// Saldo inicial
let saldo = 100000;

// Función para consultar el saldo
function consultarSaldo() {
    alert(`Saldo actual: $${saldo}`);
}

// Función para retirar dinero
function retirarDinero() {
    const monto = parseFloat(prompt("Ingrese la cantidad a retirar:"));
    if (!isNaN(monto) && monto <= saldo) {
        saldo -= monto;
        alert(`Se retiraron $${monto}. Saldo restante: $${saldo}`);
    } else {
        alert("Monto inválido o insuficiente saldo.");
    }
}

// Función para transferir dinero
function transferir() {
    const monto = parseFloat(prompt("Ingrese la cantidad a transferir:"));
    if (!isNaN(monto) && monto <= saldo) {
        const cuentaDestino = prompt("Ingrese la cuenta de destino:");
        alert(`Se transfirieron $${monto} a la cuenta ${cuentaDestino}`);
        saldo -= monto;
    } else {
        alert("Monto inválido o insuficiente saldo.");
    }
}

// Función para consignar dinero
function consignarDinero() {
    const monto = parseFloat(prompt("Ingrese la cantidad a consignar:"));
    if (!isNaN(monto) && monto >= 10000) {
        saldo += monto;
        alert(`Se consignaron $${monto}. Saldo actual: $${saldo}`);
    } else {
        alert("Monto inválido o insuficiente.");
    }
}
