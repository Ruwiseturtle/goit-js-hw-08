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

//кожні 500 мс відслідковуємо, що є в формі і записуємо в обект
//дані полів, а потім записуємо в сховище сам обект з даними
form.addEventListener('input', throttle(updateData, 500));

function updateData(e) {
  const { email, message } = form.elements;
  data.email = email.value;
  data.message = message.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

//при натисканні на кнопку, очищаємо сховище і текстові поля
form.addEventListener('submit', e => {
  e.preventDefault();

  if (
    e.currentTarget.elements.email.value === '' ||
    e.currentTarget.elements.message.value === ''
  ) {
    alert('Заповніть обовязков усі поля!');
  }
  else {
    console.log(data);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    inputEmail.textContent = '';
    inputMessage.textContent = '';
  }
});
