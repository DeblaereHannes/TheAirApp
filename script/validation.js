// globale variabelen
let email = {};

const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
   return !fieldValue || !fieldValue.length;
};


const getDOMElements = function() {
    email.field = document.querySelector('.js-email-field');
    email.errorMessage = document.querySelector('.js-email-error-message');
    email.input = document.querySelector('.js-email-input');

    console.log(email);
};

const addErrors = function(formField, errorField, errorMessage){
    console.log(formField);
    console.log(errorField);
    console.log(errorMessage);
    email.errorMessage.classList.add('has-error');
    formField.classList.add('has-error');
    errorField.style.display = 'block';
    errorField.innerHTML = errorMessage;
}

const removeErrors = function(formField, errorField){
    formField.classList.remove('has-error');
    email.errorMessage.classList.remove('has-error');
    errorField.style.display = 'none';

}

const doubleCheckEmailAddress = function(){
    if (!isEmpty(email.input.value) && isValidEmailAddress(email.input.value)){
        removeErrors(email.field, email.errorMessage);
        email.input.removeEventListner('input', doubleCheckEmailAddress);
    } else {
        addErrors(email.field, email.errorMessage, 'the email is incorrect')
    }
}


// Todo: Maak een functie enableListeners.
const enableListeners = function(){
    // Hierin komen er drie listeners: blur listeners voor de e-mail- en wachtwoordvelden en een click-event van de knop.
    // Todo: Maak een blur-event (Koppelingen naar een externe site.) voor het e-mail- en wachtwoordveld1.
    // Todo: Maak een click-listener voor de button2.
    email.input.addEventListener('blur', function() {
        if (isEmpty(email.input.value) && !isValidEmailAddress(email.input.value)) {
            addErrors(email.field, email.errorMessage, 'This field is required');

            // zet geen ronde haakles achter een named event function
            email.input.addEventListener('input', doubleCheckEmailAddress);
        } else {
            if (isEmpty(email.input.value)){
                removeErrors(email.field, email.errorMessage);
                //als het veld leeg is doen we checks weg
                email.input.removeEventListner('input', doubleCheckEmailAddress);
            }
  
        }
    });
}


// Todo: We gaan twee helper-functies gebruiken. Bekijk ze, voeg ze toe en probeer te snappen wat er gebeurt.
// Todo: Maak zelf nog een helper-functie isValidPassword. Deze functie kijkt of een string die als argument meegegeven wordt groter is dan 1 karakter.

//werkt de file, word het ingeladen
document.addEventListener('DOMContentLoaded', function(){
    console.info('yeety');
    getDOMElements();
    enableListeners();
});