import { select } from "./utils.js";

const $formContact = select("#contacto article form")
const $email = select("#email")
const $phone = select("#phone")
const $mensaje = select("#mensaje")
const $errorEmail = select("#error-email")
const $errorPhone = select("#error-phone")
const $errorMensaje = select("#error-mensaje")

$formContact.addEventListener("submit", (evento) => {
    evento.preventDefault()
    if($email.value.trim().length == 0){
        return $errorEmail.innerHTML = "Completá el email."
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test($email.value.trim())){
        return $errorEmail.innerHTML = "Tu correo no es válido."
    }
    $errorEmail.innerHTML = null
    if($phone.value.trim().length == 0){
        return $errorPhone.innerHTML = "Completá el teléfono."
    }
    if($phone.value.trim().length <= 10){
        return $errorPhone.innerHTML = "Ingrese un número válido."
    }
    if(!String($phone.value).trim().startsWith("+54")){
        return $errorPhone.innerHTML = "Tu teléfono debe empezar con +54."
    }
    $errorPhone.innerHTML = null
    if($mensaje.value.trim().length == 0){
        return $errorMensaje.innerHTML = "Completá el mensaje."
    }
    if($mensaje.value.trim().length <= 120){
        return $errorMensaje.innerHTML = "Tu mensaje debe contener mínimo 120 caracteres."
    }
    if($mensaje.value.trim().length >= 240){
        return $errorMensaje.innerHTML = "Tu mensaje debe contener máximo 240 caracteres."
    }
    $errorMensaje.innerHTML = null
    alert("¡Mensaje enviado con éxito!")
    return $formContact.reset()
})