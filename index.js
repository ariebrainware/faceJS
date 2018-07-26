const formAdd = document.getElementById('form-add')
let dataPeoples = [] //Set empty array to handle user data input

//Form validation [Bootstrap 4]
// (function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                }else{
                    addToDOM()
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
// })();



//Function to call the data from local data storage
const showPeoples = () =>{
    const localStoragePeoples = window.localStorage.getItem('peoples')
    dataPeoples = JSON.parse(localStoragePeoples) || []
    dataPeoples.forEach(people => {
        
        let divChild = document.createElement('div')
        let divChildInner = '';
        for (var key in people) {
            divChildInner += `${key}: ${people[key]}<br>`
        }
        divChild.innerHTML = `<b>People</b><br> ${divChildInner}`
        let div = document.getElementById('result-field');
        div.appendChild(divChild)  
    })
}

//DOM Function 
const addToDOM = () => {
    const peoples = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phone-number').value,
        email: document.getElementById('email').value
    }
    dataPeoples.push(peoples)
    const result= JSON.stringify(dataPeoples)
    
    // console.log(dataPeoples)
    window.localStorage.setItem('peoples',result)
    showPeoples()    
}
showPeoples()