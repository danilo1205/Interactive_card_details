const form = document.querySelector('form');
const btn_continue = document.querySelector('.continue-btn');
const response = document.querySelector('.response');
const inputs = document.querySelectorAll('input');
const number_input = document.getElementById('form-number');
const alphabet = /^[A-Z a-z]+$/;
const notNumber = /^[0-9 ]+$/;
const onlySpaces = /^[ ]+$/;
const number = document.querySelector('.number');
const nameCard = document.querySelector('.name')
const month = document.querySelector('.month');
const year = document.querySelector('.year')
const cvc = document.querySelector('.cvc');

inputs.forEach( input => {
    const className = input.getAttribute('name');
    switch(className) {
        case 'form-name':
            input.addEventListener('input', (e) => {
                nameCard.innerText = e.target.value;
            });
            break;
        case 'form-number':
            input.addEventListener('input', (e) => {
                number.innerText = e.target.value;
            });
            break;
        case 'form-month':
            input.addEventListener('input', (e) => {
                month.innerText = e.target.value;
            });
            break;
        case 'form-year':
            input.addEventListener('input', (e) => {
                year.innerText = e.target.value;
            });
            break;
        case 'form-cvc':
            input.addEventListener('input', (e) => {
                cvc.innerText = e.target.value;
            });
            break;
    }
});

function error_message(input, text) {
    const error = input.nextElementSibling;
    error.innerText = text;
    error.style.display = 'block';
    input.style.borderColor = 'var(--Red)';
}

function valid(input){
    const error = input.nextElementSibling;
    error.style.display = 'none';
    input.style.borderColor = 'var(--Very-dark-violet)';
    input.setAttribute('class','valid');
}

function validate() {
    for(const input of inputs){
        if(!input.classList.contains('valid')){
            return false;
        }
    }
    return true;
}

function check_input(input) {
    if(input.value === ''){
        const text = 'Esse campo não pode ficar em branco';
        error_message(input, text);
        return;
    }

    const className = input.getAttribute('name');
    let text = '';
    let validInput = true;

    switch(className) {
        case 'form-name':
            if(!alphabet.test(input.value) || onlySpaces.test(input.value)){
                text = 'Formato inválido. Digite somente letras!';
                error_message(input, text);  
                validInput = false;
            }
            break;
        case 'form-number':
            if(!notNumber.test(input.value) || onlySpaces.test(input.value)){
                text = 'Formato inválido. Digite somente números!';
                error_message(input, text);   
                validInput = false; 
            }
            else if(input.value.length != 19) {
                text = 'Quantidade de caracteres inválida!';
                error_message(input, text);   
                validInput = false; 
            }
            break;
        case 'form-month':
            if(!notNumber.test(input.value)){
                text = 'Formato inválido. Digite somente números!';
                error_message(input, text);  
                validInput = false;  
            }
            else if(input.value.length != 2) {
                text = 'Quantidade de caracteres inválida!';
                error_message(input, text);   
                validInput = false; 
            }
            break;
        case 'form-year':
            if(!notNumber.test(input.value)){
                text = 'Formato inválido. Digite somente números!';
                error_message(input, text); 
                validInput = false;   
            }
            else if(input.value.length != 2) {
                text = 'Quantidade de caracteres inválida!';
                error_message(input, text);   
                validInput = false; 
            }
            break;
        case 'form-cvc':
            if(!notNumber.test(input.value)){
                text = 'Formato inválido. Digite somente números!';
                error_message(input, text);  
                validInput = false;  
            }
            else if(input.value.length != 3) {
                text = 'Quantidade de caracteres inválida!';
                error_message(input, text);   
                validInput = false; 
            }
            break;
    }

    if(validInput) {
        valid(input);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputs.forEach(input => {
        check_input(input);
    });
    if(validate()){
        form.style.transform = 'scaleX(0)';
        setInterval(() => {
            form.style.display = 'none';
        }, 1000);      
        setInterval(() => {
            response.style.height = '100%';
            response.style.transform = 'scaleX(100%)';
        }, 1000);      
    }
});

number_input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
});