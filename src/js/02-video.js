import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

updateVideoTime();

//відслідковуємо поновлення часу перегляду на включеному відео кожну секунду
player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem(LOCALSTORAGE_KEY, e.seconds);
  }, 100)
);

//якщо у сховищі є такий ключ, то плеєру встановлюємо поточний час
function updateVideoTime() {
  let time = localStorage.getItem(LOCALSTORAGE_KEY);
  player.setCurrentTime(time || 0);
}
