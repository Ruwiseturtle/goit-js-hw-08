import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input[name=email]');
const inputMessage = document.querySelector('textarea[name=message]');
const LOCALSTORAGE_KEY = 'feedback - form - state';

readWebStorageData();
const data = { email: '', message: '' };


//якщо в сховищі є дані, то считуємо їх і заповнюємо ними поля для ввода
function readWebStorageData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedData !== null) {
    const parseData = JSON.parse(savedData);

    inputEmail.value = parseData.email;
    inputMessage.textContent = parseData.message;
  }
}

//при кожному наборі тексту в текстові поля, записуємо в обект
//дані полів і в записуємо в сховище сам обект з даними
form.addEventListener('input', throttle(updateData, 500));

function updateData(e) {
  
  const { email, message } = e.currentTarget.elements;
  data.email = email.value;
  data.message = message.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  
}

//при натисканні на кнопку, очищаємо сховище и текстові поля
form.addEventListener('submit', e => {
  
  if (e.currentTarget.elements.email.value === '') {
    alert('Заповніть обовязкове поле email!');
  } else {
    localStorage.clear();
    inputEmail.textContent = '';
    inputMessage.textContent = '';
  }
});
