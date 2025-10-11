const userForm = document.getElementById('myForm');
const content = document.getElementById('content');
const formCard = document.getElementById('formCard');

function onSubmit(event) {
    event.preventDefault;

    let fullName = document.getElementById('fname').value + " " + document.getElementById('lname').value;
    let username = document.getElementById('username').value;
    let DoB = document.getElementById('DoB').value;

    const user_data = { fullName, username, DoB };
    localStorage.setItem('userData', JSON.stringify(user_data));
}

function getAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    return age;
}

userForm.addEventListener('submit', onSubmit);

const savedData = JSON.parse(localStorage.getItem('userData'));

if (savedData){
    formCard.classList.add('hidden');
    formCard.classList.remove('flex');
    content.classList.add('flex');   
    content.classList.remove('hidden');   
}