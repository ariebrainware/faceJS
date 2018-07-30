'use strict';
const resultField = $('#result-field')
const formAdd = $('#form-add')

const makePrimaryKey = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Class definition

class People {
  constructor(primaryKey, firstname, lastname, address = "", phoneNumber = "", email = "") {
    this.primaryKey = primaryKey
    this.firstname = firstname
    this.lastname = lastname
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

class ContactAction extends People {
  constructor(addContact, deleteContact, updateContact, searchContact) {
    super({
      firstname,
      lastname,
      address,
      phoneNumber,
      email
    });
    this.addContact = addContact;
    this.deleteContact = deleteContact;
    this.updateContact = updateContact;
    this.searchContact = searchContact;
  }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Function definition

const getFromLocalStorage = () => {
  const data = window.localStorage.getItem('People')

  if (data) return JSON.parse(data)
  else return []
}

const save = (data) => {
  window.localStorage.setItem('People', JSON.stringify(data))
}

const showData = () => {
  const dataPeople = window.localStorage.getItem('People')
  const data = JSON.parse(dataPeople) || []
  resultField.html("")

  data.forEach(person => {
    let personInfo = ''
    const resultFieldDivChild = resultField.html('<div></div>')
    for (let key in person) {
      personInfo += `${key}: ${person[key]}<br>`
    }
    //resultFieldDivChild.append(cardTemplate())
  });
}

const saveToLocalStorage = () => {
  const primaryKey = makePrimaryKey()
  const firstName = $('#first-name').val()
  const lastName = $('#last-name').val()
  const address = $('#address').val()
  const phoneNumber = $('#phone-number').val()
  const email = $('#email').val()

  const dataPeople = new People(primaryKey, firstName, lastName, address, phoneNumber, email)
  console.log(dataPeople)
  save(dataPeople)
  showData()
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//Form validation [Bootstrap 4] & Event Listener

window.addEventListener(
  "load",
  function () {
    var forms = document.getElementsByClassName("needs-validation");
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            saveToLocalStorage();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);