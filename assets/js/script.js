//Funcionalidad abrir y cerrar login 
const contenedor = document.querySelector(".contenedorLogReg"),
    loginHeader = document.querySelector(".form-box h2")
    registroHeader = document.querySelector(".form-box h2")

registroHeader.addEventListener('click', () => {
    contenedor.classList.add('active')
})
loginHeader.addEventListener('click', () => {
    contenedor.classList.remove('active')
})

//cambio de login a registro
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLoginPopup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=>{
    contenedorLogReg.classList.add('active')
})
loginLink.addEventListener('click', ()=>{
    contenedorLogReg.classList.remove('active')
})
btnPopup.addEventListener('click', ()=>{
    contenedorLogReg.classList.add('active-popup')
})
iconClose.addEventListener('click', ()=>{
    contenedorLogReg.classList.remove('active-popup')
})

//Variables globales necesarias en el proyecto
let saldo = ''
let intentosFallidos = 0
let correoUsuario = ''
const contenedorLogReg = document.getElementById('contenedorLogReg')
const opciones = document.getElementById('main-menu')
const checkBalanceBtn = document.getElementById('check-balance')
const withdrawBtn = document.getElementById('withdraw')
const transferBtn = document.getElementById('transfer')
const depositBtn = document.getElementById('deposit')
const showTransactionsBtn = document.getElementById('show-transactions')
const saldoContainer = document.getElementById('saldo-container')
const volverMainMenuBtn = document.getElementById('volver-main-menu')
const retiro = document.getElementById('retiro-real')
const retiroAmountInput = document.getElementById('retiro-amount')
const realizarRetiroBtn = document.getElementById('realizar-retiro')
const cancelarRetiroBtn = document.getElementById('cancelar-retiro')
const comprobanteRetiro = document.getElementById('comprobante-retiro')

const transfer = document.getElementById('transfer-div')
const realizarTransferenciaBtn = document.getElementById('realizar-transferencia')
const cancelarTransferenciaBtn = document.getElementById('cancelar-transferencia')
const comprobanteTransferenciaDiv = document.getElementById('comprobante-transferencia')

const destinatarioSpan = document.getElementById('destinatario')
const montoTransferidoSpan = document.getElementById('monto-transferido')
const volverMainMenuComprobanteBtn = document.getElementById('volver-main-menu-comprobante')
const historialContainer = document.getElementById('historial-container')
const volverMenuHistorial = document.getElementById('volver-main-menu-historial')

const consignarDiv = document.getElementById('consignar-div');
const realizarConsignacionBtn = document.getElementById('realizar-consignacion')
const cancelarConsignacionBtn = document.getElementById('cancelar-consignacion')
const montoConsignacionInput = document.getElementById('monto-consignacion')
const comprobanteConsignacion = document.getElementById('comprobante-consignacion')

const usuariosRegistrados = JSON.parse(localStorage.getItem('usuario')) || []

const userRegistrationRegex =
{
    username: /^[ A-Za-z]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z]).{8,}$/
}

//funcion para iniciar sesion
function iniciarSesion() {
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'block'
}

//funcion para cerrar sesion
function cerrarSesion() {
    contenedorLogReg.style.display = 'block'
    opciones.style.display = 'none'
}
//funcion para limpiar los input del login
function limpiarLogin() {
    document.getElementById('user').value = ''
    document.getElementById('pass').value = ''
}
//funcion para limpiar los input del registro
function limpiarRegistro() {
    document.getElementById('name-user').value = ''
    document.getElementById('email-registro').value = ''
    document.getElementById('pass-registro').value = ''
    document.getElementById('pass-confirmacion').value = ''
    document.getElementById('monto-apertura').value = ''
}

//funcion para crear nuevos usuarios y agregarlos a "Base de datos"
document.getElementById('registro').addEventListener('submit', function registroUsuario() {
    const nombreUsuario = document.getElementById('name-user').value
    const correoRegistro = document.getElementById('email-registro').value
    const passRegistro = document.getElementById('pass-registro').value
    const passConfirmacion = document.getElementById('pass-confirmacion').value
    const montoApertura = parseFloat(document.getElementById('monto-apertura').value)

    if (correoRegistro && passRegistro && passConfirmacion) {
        let todasLasCondicionesCumplidas = true
        if (!userRegistrationRegex.username.test(nombreUsuario)) {
            alert('El nombre de usuario debe contener solo letras y no debe contener números.');
            todasLasCondicionesCumplidas = false
        } else if (!userRegistrationRegex.email.test(correoRegistro)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            todasLasCondicionesCumplidas = false
        } else if (passRegistro.length < 8 || !userRegistrationRegex.password.test(passRegistro)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.');
            todasLasCondicionesCumplidas = false
        } else if (passRegistro !== passConfirmacion) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            todasLasCondicionesCumplidas = false
        }
        if (todasLasCondicionesCumplidas) {
            const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoRegistro)
            if (usuarioExistente) {
                alert('Correo electrónico ya registrado')
                limpiarRegistro()
            } if (montoApertura >= 100000) {
                const nuevoUsuario = {
                    correoRegistro,
                    passRegistro,
                    nombreUsuario,
                    saldo: montoApertura,
                    historialMovimientos: []
                }
                usuariosRegistrados.push(nuevoUsuario);
                localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados))
                alert('Bienvenido ' + nombreUsuario + ', inicia sesión para acceder a tu cuenta')
                limpiarRegistro()
            } else {
                alert('La apertura de cuenta requiere un mínimo de 100,000. Tu saldo actual es insuficiente.')
            }
        }
    } else {
        alert('Por favor, complete todos los campos.')
    }
})

//funcion para inicio de session 
document.getElementById('login').addEventListener('submit', function loginUsuario() {
    correoUsuario = document.getElementById('user').value
    const passUsuario = document.getElementById('pass').value

    if (correoUsuario && passUsuario) {
        if (!userRegistrationRegex.email.test(correoUsuario)) {
            alert('Por favor, ingrese un correo electrónico válido.')
        }
        if (!userRegistrationRegex.password.test(passUsuario)) {
            alert('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula.')
        }
        const usuario = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario && usuario.passRegistro === passUsuario)
        if (usuario) {
            iniciarSesion()
            limpiarLogin()
            correoUsuario = correoUsuario;
            saldoUsuarioActual = usuario.saldo
        } else {
            intentosFallidos++
            if (intentosFallidos > 3) {
                alert("Has alcanzado el máximo de intentos fallidos. El formulario se bloqueará.")
                document.getElementById('user').disabled = true
                document.getElementById('pass').disabled = true
                document.getElementById('btnIniciar').disabled = true
            } else {
                alert("Credenciales incorrectas. Intento fallido #" + intentosFallidos)
            }
            limpiarLogin()
        }
    } else {
        alert("Por favor, complete todos los campos.")
    }
})
//Consultar saldo 
function consultarSaldo() {
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'none'

    const usuarioActual = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario)

    if (usuarioActual) {
        const nombreUsuario = usuarioActual.nombreUsuario;
        const saldoActual = usuarioActual.saldo;
        document.getElementById('nombre-usuario').textContent = ` ${nombreUsuario}`
        document.getElementById('saldo-actual').textContent = ` $${saldoActual}`

        agregarMovimiento("Consulta de Saldo", saldoActual, usuarioActual)

        document.getElementById('saldo-container').style.display = 'block'
    } else {
        console.error('No se pudo encontrar al usuario actual.')
    }
}
checkBalanceBtn.addEventListener('click', function () {
    consultarSaldo();
});

volverMainMenuBtn.addEventListener('click', function () {
    document.getElementById('saldo-container').style.display = 'none'
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'block'
})

//Retirar dinero de la cuenta 
document.getElementById('withdraw').addEventListener('click', function () {
    retiro.style.display = 'block'
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'none'
});
realizarRetiroBtn.addEventListener('click', function () {
    const cantidadRetiro = parseFloat(retiroAmountInput.value);

    if (isNaN(cantidadRetiro) || cantidadRetiro < 10000 || cantidadRetiro > saldoUsuarioActual || saldoUsuarioActual - cantidadRetiro < 10000) {
        alert("Recuerde que el retiro debe ser igual o superior a 10000 y no puede superar el saldo actual ni dejar un saldo menor a 10000");
    }else {
        saldoUsuarioActual -= cantidadRetiro;
        document.getElementById('monto-retirado').textContent = cantidadRetiro;
        comprobanteRetiro.style.display = 'block';
        retiro.style.display = 'none';

        const usuarioActual = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario);

        if (usuarioActual) {
            usuarioActual.saldo = saldoUsuarioActual;
            localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados));
        }
        agregarMovimiento("Retiro", -cantidadRetiro, usuarioActual);
        document.getElementById('retiro-amount').value = '';
    }
})
document.getElementById('volver-main-menu-comprobante-retiro').addEventListener('click', function () {
    retiro.style.display = 'none';
    contenedorLogReg.style.display = 'none';
    opciones.style.display = 'block';
    comprobanteRetiro.style.display = 'none';
})
// Evento para cancelar el retiro
cancelarRetiroBtn.addEventListener('click', function () {
    retiro.style.display = 'none'
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'block'
    retiroAmountInput.value = ''
})

transferBtn.addEventListener('click', function () {
    transfer.style.display = 'block'
    comprobanteTransferenciaDiv.style.display = 'none'
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'none'
});

// Evento para realizar la transferencia
realizarTransferenciaBtn.addEventListener('click', function () {
    const destinatario = document.getElementById('destinatario-input').value
    const montoTransferido = parseFloat(document.getElementById('monto-transferido-input').value)
    const usuarioRemitente = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario)
    const usuarioDestinatario = usuariosRegistrados.find(usuario => usuario.correoRegistro === destinatario)

    if (isNaN(montoTransferido) || montoTransferido < 10000) {
        alert("Recuerde que la transferencia debe ser igual o superior a 10000 y no puede superar el saldo actual ni dejar un saldo menor a 10000")
    } if (!usuarioDestinatario) {
        alert("El destinatario no está registrado.")
    }else if (saldoUsuarioActual - montoTransferido < 10000) {
        alert("Fondos insuficientes para la transferencia.")
    } else {
    
        usuarioRemitente.saldo -= montoTransferido
        usuarioDestinatario.saldo += montoTransferido

        localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados))

        alert("Transferencia exitosa.")

        agregarMovimiento("Transferencia realizada a " + destinatario, -montoTransferido, usuarioRemitente)
        agregarMovimiento("Transferencia recibida de " + correoUsuario, montoTransferido, usuarioDestinatario)

        destinatarioSpan.textContent = destinatario
        montoTransferidoSpan.textContent = montoTransferido
        comprobanteTransferenciaDiv.style.display = 'block'
        transfer.style.display = 'none'

        document.getElementById('destinatario-input').value = ''
        document.getElementById('monto-transferido-input').value = ''
    }
})
// Evento para cancelar la transferencia
cancelarTransferenciaBtn.addEventListener('click', function () {
    transfer.style.display = 'none'
    contenedorLogReg.style.display = 'none'
    opciones.style.display = 'block'

    document.getElementById('destinatario').value = '';
    document.getElementById('monto-transferido').value = '';
})

volverMainMenuComprobanteBtn.addEventListener('click', function () {
    comprobanteTransferenciaDiv.style.display = 'none'
    containcontenedorLogReger.style.display = 'none'
    opciones.style.display = 'block'
})
depositBtn.addEventListener('click', function () {
    consignarDiv.style.display = 'block'
    opciones.style.display = 'none'
});

// Agregar evento al botón "Realizar Consignación"
realizarConsignacionBtn.addEventListener('click', function () {
    const montoConsignacion = parseFloat(montoConsignacionInput.value);

    if (isNaN(montoConsignacion) || montoConsignacion < 10000) {
        alert("La consignación debe ser igual o mayor a 10000.");
    } else {
        const usuarioActual = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario);

        if (usuarioActual) {
            usuarioActual.saldo += montoConsignacion;

            agregarMovimiento("Consignación", montoConsignacion, usuarioActual);

            localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados));
            alert(`Consignación exitosa. Nuevo saldo: ${usuarioActual.saldo}`);
            montoConsignacionInput.value = '';

            document.getElementById('monto-consignado').textContent = montoConsignacion;
            comprobanteConsignacion.style.display = 'block';

            consignarDiv.style.display = 'none';
        } else {
            alert('No se pudo encontrar al usuario actual.');
        }
    }
})
document.getElementById('volver-main-menu-comprobante-consignacion').addEventListener('click', function () {
    comprobanteConsignacion.style.display = 'none';
    contenedorLogReg.style.display = 'none';
    opciones.style.display = 'block';
})

// Agregar evento al botón Cancelar Consignación
cancelarConsignacionBtn.addEventListener('click', function () {
    consignarDiv.style.display = 'none'
    opciones.style.display = 'block'
})

// Función para agregar un movimiento al historial
function agregarMovimiento(tipo, valor, usuario) {
    const fecha = new Date();
    const movimiento = { fecha, tipo, valor };

    if (usuario) {
        if (!usuario.historialMovimientos) {
            usuario.historialMovimientos = [];
        }
        usuario.historialMovimientos.push(movimiento);

        // Guarda el usuario actual en el localStorage después de actualizar su historial
        localStorage.setItem('usuario', JSON.stringify(usuariosRegistrados));
    } else {
        console.error('No se pudo encontrar al usuario actual.')
    }
}
showTransactionsBtn.addEventListener('click', function mostrarHistorial() {
    const usuarioActual = usuariosRegistrados.find(usuario => usuario.correoRegistro === correoUsuario)

    if (usuarioActual) {
        const historial = usuarioActual.historialMovimientos;

        historialContainer.innerHTML = ''

        const tituloDiv = document.createElement('div')
        tituloDiv.classList.add('titulo-historial')

        const titulo = document.createElement('h2')
        titulo.textContent = 'Historial de Movimientos'
        tituloDiv.appendChild(titulo)
        historialContainer.appendChild(tituloDiv)

        // Recorrer el historial del usuario y mostrar cada movimiento
        historial.forEach(movimiento => {
            const item = document.createElement('div')
            item.textContent = `Fecha: ${movimiento.fecha}, Tipo: ${movimiento.tipo}, Valor: ${movimiento.valor}`
            item.style.marginBottom = '10px';
            historialContainer.appendChild(item)
        })

        // Mostrar el botón para volver al menú principal
        const botonVolver = document.createElement('button')
        botonVolver.textContent = 'Volver al Menú Principal'
        botonVolver.id = 'volver-main-menu-historial'
        botonVolver.classList.add('boton-historial')

        const contenedorBoton = document.createElement('div')
        contenedorBoton.classList.add('centrar-boton')

        contenedorBoton.appendChild(botonVolver);
        historialContainer.appendChild(contenedorBoton);

        // Asignar la función al botón de volver al menú principal
        botonVolver.addEventListener('click', volverMainMenuDesdeHistorial)

        historialContainer.style.display = 'block'
        contenedorLogReg.style.display = 'none'
        opciones.style.display = 'none'
    } else {
        console.error('No se pudo encontrar al usuario actual.')
    }
})
function volverMainMenuDesdeHistorial() {
    const historialContainer = document.getElementById('historial-container')
    const opciones = document.getElementById('main-menu')

    historialContainer.style.display = 'none'
    opciones.style.display = 'block'
}
//funcion para cerrar cession 
document.getElementById('logout').addEventListener('click', function () {
    cerrarSesion()
})
