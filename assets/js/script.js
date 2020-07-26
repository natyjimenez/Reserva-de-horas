const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

// Expresiones regulares para validación
const expresiones = {
    rut: /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/, // Valida formato rut
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Valida que solo acepte letras campo nombre y apellido
    edad: /^[0-9]{1,3}$/, // Valida que el campo edad solo acepte números y como máximo 3 dígitos
    email: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, // Valida que el formato de email sea el correcto
    fecha: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ // Valida que la fecha sea ingresada en formato dd-mm-yyyy
}
// Variables para Validar que todos los campos esten correctamente llenados
const campos = {
    rut: false,
    nombre: false,
    edad: false,
    email: false,
    fecha: false
}
// Función para validar cada campo con expesiones regulares
const validar = (e) => {
    switch (e.target.name) {
        case "rut":
            validarCampo(expresiones.rut, e.target, 'rut');
            break;

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido');
            break;

        case "edad":
            validarCampo(expresiones.edad, e.target, 'edad');
            break;

        case "email":
            validarCampo(expresiones.email, e.target, 'email');
            break;

        case "fecha":
            validarCampo(expresiones.fecha, e.target, 'fecha');
            break;
    }
}
// Función Global para aplicar a la validación de cada campo
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}
// Función para "escuchar" los carácteres que se tipean, para luego validar
inputs.forEach((input) => {
    input.addEventListener('keyup', validar);
    input.addEventListener('blur', validar);
});
// Validación del Formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.rut && campos.nombre && campos.apellido && campos.edad && campos.email && campos.fecha) {
        formulario.reset();
        //alert("Estimado(a) " + rut.value + " " + apellido.value + ", su hora para " + especialidad.value + " ha sido reservada para el día " + fecha.value + " a las " + hora.value + ". \n Además, se le envió un mensaje a su correo " + email.value + " con el detalle de su cita. \n Gracias por preferirnos.");
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});