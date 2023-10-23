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


logout.addEventListener("click", () => {
        // Cierra la sesión (limpia los datos de sesión o tokens de autenticación, si es necesario)
        
        // Redirige al usuario a la página de inicio
        window.location.href = "index.html"; // Reemplaza "index.html" con la URL correcta de tu página de inicio
    });
