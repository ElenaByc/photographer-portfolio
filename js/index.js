import { content_en_ru } from './translate.js'


/*------ Images Caching ------*/

const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadPortfolioImages() {
  seasons.forEach(season => {
    for(let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${season}/${i}.jpg`;
    }
  })
}

preloadPortfolioImages();


/*------ Get language and theme from local storage ------*/
window.addEventListener('load', getLangAndTheme);

function getLangAndTheme() {
  const currentLang = localStorage.getItem('lang');
  const currentTheme = localStorage.getItem('theme');

  if(currentLang === 'ru') {
    const lngBtns = document.getElementsByClassName('header-switch-lng')[0].getElementsByTagName('input');
    for(let i = 0; i < lngBtns.length; i++) {
      if(lngBtns[i].checked) {
        lngBtns[i].checked = false;
      } else {
        lngBtns[i].checked = true;
      }
    }
    const textData = document.querySelectorAll('[data-i18n]');
    textData.forEach(elem => {
      ['input', 'textarea'].includes(elem.localName) 
        ? elem.placeholder = content_en_ru[currentLang][elem.dataset.i18n] 
        : elem.textContent = content_en_ru[currentLang][elem.dataset.i18n];
    })
    changeSkillItemsHeight('ru');
  } 

  if(currentTheme === 'light') {
    toggleLightTheme();
  }
}

/*------ Burger menu ------*/

const menu = document.getElementsByClassName('header-nav-menu')[0];
menu.addEventListener('click', toggleMenu);
const links = document.getElementsByClassName('header-nav-link');
for(let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', toggleMenu);
}

function toggleMenu() {
  const menu = document.getElementsByClassName('header-nav-menu')[0];
  menu.classList.toggle('active');
  const nav = document.getElementsByClassName('header-nav')[0];
  nav.classList.toggle('active');
}

/*------ Translate ------*/

const lngBtns = document.getElementsByClassName('header-switch-lng')[0].getElementsByTagName('input');
for(let i = 0; i < lngBtns.length; i++) {
  lngBtns[i].addEventListener('click', getTranslate);
}

function getTranslate() {
  const lang = this.value;
  const currentLang = localStorage.getItem('lang');
  if(lang !== currentLang) {
    localStorage.setItem('lang', lang);
    const textData = document.querySelectorAll('[data-i18n]');
    textData.forEach(elem => {
      ['input', 'textarea'].includes(elem.localName) 
        ? elem.placeholder = content_en_ru[lang][elem.dataset.i18n] 
        : elem.textContent = content_en_ru[lang][elem.dataset.i18n];
    });
    changeSkillItemsHeight(lang);
  }
}

function changeSkillItemsHeight(lang) {
  const skillItems = document.getElementsByClassName('skill-item');
  if(lang === 'ru') {
    for(let i = 0; i < skillItems.length; i++) {
      skillItems[i].style.height = '280px';
    }
  } else {
    for(let i = 0; i < skillItems.length; i++) {
      skillItems[i].style.height = '240px';
    }
  }
}

/*------ Portfolio ------*/

const seasonBtnsContainer = document.getElementsByClassName('portfolio-btns')[0];
const seasonBtns= seasonBtnsContainer.getElementsByTagName('button');
const portfolioImages = document.getElementsByClassName('portfolio-item');
for(let i = 0; i < seasonBtns.length; i++) {
  seasonBtns[i].addEventListener('click', changeSeason);
}

function changeSeason() {
  const clickedBtn = this;
  const activeBtn = seasonBtnsContainer.getElementsByClassName('gold')[0];
  activeBtn.classList.remove('gold');
  clickedBtn.classList.add('gold');
  for(let i = 0; i < portfolioImages.length; i++) {
    portfolioImages[i].style.backgroundImage = `url('./assets/img/${clickedBtn.id}/${i + 1}.jpg')`;
  }
}

/*------ Light Theme ------*/

const themeSwitcher = document.getElementsByClassName('header-sun-moon')[0];
themeSwitcher.addEventListener('click', toggleLightTheme);

const lightElements = [
  themeSwitcher,
  document.getElementsByTagName('body')[0],
  document.getElementsByClassName('header-nav')[0],
  document.getElementsByClassName('header-nav-menu')[0],
  document.getElementsByClassName('skills')[0],
  document.getElementsByClassName('portfolio')[0],
  document.getElementsByClassName('video')[0],
  document.getElementsByClassName('price')[0],
  ...document.getElementsByClassName('section-title'),
  ...portfolioImages,
  ...seasonBtns
];

function toggleLightTheme() {
  if(themeSwitcher.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
  
  lightElements.forEach(elem => elem.classList.toggle('light-theme'));
}


/*------ Video Player ------*/

const player = document.querySelector('.video-player');
const poster = player.querySelector('.video-poster');
const video = player.querySelector('.video-viewer');
const playBtn = player.querySelector('.video-button');
const controls = player.querySelector('.video-controls');
const playBtn2 = controls.querySelector('.play');
const progress = controls.querySelector('.video-progress');
const volumeBtn = controls.querySelector('.volume');
const volumeLvl = controls.querySelector('.video-volume-lvl');
const skipBtn1 = controls.querySelector('.rewind');
const skipBtn2 =  controls.querySelector('.forward');
const currentTime = controls.querySelector('.current');
const totalTime = controls.querySelector('.total');

const gold = '#bdae82';
const gray = '#c8c8c8';


function hidePoster() {
  poster.classList.add('hide');
  playBtn.classList.add('hide');
  playBtn2.classList.add('pause');
  video.play();
  const duration = Math.round(video.duration);
  totalTime.innerHTML = Math.floor(duration/60) + ':' + (duration % 60); 
}

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  playBtn.classList.toggle('hide');
  playBtn2.classList.toggle('pause');
}

function toggleMute() { 
  video.muted = !video.muted;
  volumeBtn.classList.toggle('mute');
}

function handleProgressUpdate() {
  video.currentTime = (this.value * video.duration) /100;
  handleProgress();
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  if (percent > 2.0) {
  progress.style.backgroundImage = 'linear-gradient( to right, ' 
    + gold + ' 0%, ' + gold + ' ' + percent + '%, ' 
    + gray + ' ' + percent + '%,' + gray + ' 100%)';
  } else {
    progress.style.backgroundImage = 'linear-gradient( to right, ' 
    + gold + ' 0%, ' + gold + ' ' + 2 + '%, ' 
    + gray + ' ' + 2 + '%,' + gray + ' 100%)';
  }
  progress.value =  Math.floor(percent);
  const time = Math.round(video.currentTime);
  const min = Math.floor(time / 60);
  let sec = '00';
  if (time % 60 === 0) {
    sec = '00';
  } else if (time % 60 < 10) {
    sec = '0' + (time % 60).toString();
  } else {
    sec = (time % 60).toString();
  }
  currentTime.innerHTML = min + ':' + sec;
  if (video.currentTime === video.duration) {
    playBtn.classList.remove('hide');
    playBtn2.classList.remove('pause');
  }
}

function handleVolumeUpdate() {
  video.volume = this.value / 100;
  volumeLvl.style.backgroundImage = 'linear-gradient( to right, ' 
  + gold + ' 0%, ' + gold + ' ' + this.value + '%, ' 
  + gray + ' ' + this.value + '%,' + gray + ' 100%)';  
  if (video.volume === 0 && !video.muted) {
    toggleMute();
  }
  if (video.volume !==0 && video.muted) {
    toggleMute();
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  if(video.currenTime === video.duration) {
    playBtn.classList.remove('hide');
    playBtn2.classList.remove('pause');
  }
}

playBtn.addEventListener('click', hidePoster);
video.addEventListener('click', togglePlay);
playBtn2.addEventListener('click', togglePlay);
volumeBtn.addEventListener('click', toggleMute);

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('change', handleProgressUpdate);
// progress.addEventListener('mousemove', handleProgressUpdate);

volumeLvl.addEventListener('change', handleVolumeUpdate);
// volumeLvl.addEventListener('mousemove', handleVolumeUpdate);


skipBtn1.addEventListener('click', skip);
skipBtn2.addEventListener('click', skip);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


/*------ Self Estimation ------*/

console.log(`
1. Вёрстка +10
   ° вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, 
     прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5  ✔
   ° в футере приложения есть ссылка на гитхаб автора приложения, 
     год создания приложения, логотип курса со ссылкой на курс +5 ✔

2. Кнопка Play/Pause на панели управления +10
   ° при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5  ✔
   ° внешний вид и функционал кнопки изменяется в зависимости от того, 
     проигрывается ли видео в данный момент +5  ✔
  
3. Прогресс-бар отображает прогресс проигрывания видео. 
   При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. 
   Разный цвет прогресс-бара до и после ползунка +10  ✔

4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. 
   Разный цвет регулятора громкости звука до и после ползунка +10  ✔

5. При клике по кнопке Volume/Mute можно включить или отключить звук. 
   Одновременно с включением/выключением звука меняется внешний вид кнопки. 
   Также внешний вид кнопки меняется, если звук включают или выключают 
   перетягиванием регулятора громкости звука от нуля или до нуля +10  ✔

6. Кнопка Play/Pause в центре видео +10
   ° есть кнопка Play/Pause в центре видео при клике по которой 
     запускается видео и отображается панель управления +5  ✔
   ° когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, 
     когда видео останавливается, кнопка снова отображается +5  ✔

7. Дополнительный не предусмотренный в задании функционал +10 
   ° добавлены текущее время и общее время видео  ✔
   ° добавлена возможность перемотать видео вперед или назад на 10 секунд  ✔

_____________________
    Итого: 70 баллов
`);
