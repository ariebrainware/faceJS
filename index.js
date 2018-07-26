'use strict';

const formAdd = document.getElementById('form-add')
const resultField = document.getElementById('result-field');

const get = () => {
    // Get data from storage, or set empty data
    const PEOPLE = window.localStorage.getItem('PEOPLE')

    if (PEOPLE) return JSON.parse(PEOPLE)
    else return []
}

const set = (newData) => {
    window.localStorage.setItem('PEOPLE', JSON.stringify(newData))
}

let PEOPLE = get()

// Form validation [Bootstrap 4]

window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                addToStorage()
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

// Function to call the data from local data storage
const showPeople = () => {
    const PEOPLE_STORAGE = window.localStorage.getItem('PEOPLE');
    const PEOPLE = JSON.parse(PEOPLE_STORAGE) || [];

    resultField.innerHTML = ""

    PEOPLE.forEach(person => {
        const divChild = document.createElement('div')
        let personInfo = '';

        for (let key in person) {
            personInfo += `${key}: ${person[key]}<br>`
        }

        divChild.innerHTML = `<b>Person:</b><br> ${personInfo}`

        resultField.appendChild(divChild)
    })
}

// DOM Function 
const addToStorage = () => {
    const newPerson = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phone-number').value,
        email: document.getElementById('email').value
    }

    PEOPLE.push(newPerson)
    set(PEOPLE)
    showPeople()
}

showPeople()