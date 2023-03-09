// PRUEBA
/*
// Spinner

const clear = function(el){
    el.innerHTML = '';
    }
    
    const renderSpinner = function(el) {
        const markup = `
          <div class="spinner">
            <svg>
              <use href="./src/icons/spinner.svg"></use>
            </svg>
          </div>
        `;
        clear(el);
        el.insertAdjacentHTML('afterbegin', markup);
      }

const createSlide = async function(){
    let image = await AJAX('https://random.dog/woof.json');
    if(image.slice(-3) === 'mp4') {
        image = await AJAX('https://random.dog/woof.json');
        insertSlideElement(slider, image);} else{
            insertSlideElement(slider, image);
        }
};
createSlide();
*/

// Creating slides

const slidesContainer = document.querySelector('.slider');
const slidesQuantity = 4;

const insertSlideElement = function(el){
    el.insertAdjacentHTML('afterbegin', `
    <div class="slide">
            <img class="slide-img" src="" alt="image" />
          </div>
    `)
};

const createSlides = function(max){
    for(i=0;i<max;i++){
        insertSlideElement(slidesContainer);
    }
}
createSlides(slidesQuantity);

// Slider

const slider = function(){

const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".slide-prev");
const btnNext = document.querySelector(".slide-next");

let curSlide = 0;
const maxSlide = slides.length;

// Functions

const goToSlide = function (slide){
    slides.forEach(
        (s,i)=> (s.style.transform = `translateX(${100 * (i-slide)}%)`)
    );
};

// Next slide
const nextSlide = function(){
    if (curSlide === maxSlide-1){
        curSlide = 0;
    } else {
        curSlide++;
    }
    goToSlide(curSlide);
};

// Prev slide
const prevSlide = function(){
    if (curSlide === 0){
        curSlide = maxSlide-1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
};


// Event handlers
btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', prevSlide);

// Init
goToSlide(curSlide);

}
slider();

// Getting images from API
const imageLink1= 'https://random.dog/woof.json';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

const AJAX = async function(url){
try{
    const fetchData = await fetch(url);
    const res = await Promise.race([fetchData, timeout(5000)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`${res.status}`)
    return data.url;
}catch(err){
    throw err;
}
}

const images = document.querySelectorAll('.slide-img');

const getImage1 = async function(i){
    let image = await AJAX(imageLink1);
    if(image.slice(-3) === 'mp4') {
        image = await AJAX(imageLink1);
        i.src = image;} else{
            i.src = image;
        }
};

images.forEach((img) => getImage1(img));
// console.log(images);

// Getting facts from API

const factLink1 = 'https://dog-api.kinduff.com/api/facts';
// Link: 'https://dog-api.kinduff.com/api/facts?raw=true';

const imageLink2 = 'https://dog.ceo/api/breeds/image/random';

const AJAX2 = async function(url){
    try{
        const fetchData = await fetch(url);
        const res = await Promise.race([fetchData, timeout(5000)]);
        const data = await res.json();
    
        if(!res.ok) throw new Error(`${res.status}`)
        return data.facts[0];
    }catch(err){
        throw err;
    }
    }

const factText = document.querySelector('.fact-text');
const factBtn = document.querySelector('.fact-btn');
const factImg = document.querySelector('.curiosity-img');

const getFact = async function(){
    const fact = await AJAX2(factLink1);
    factText.textContent = fact;
};

// Get image 2

const AJAX3 = async function(url){
    try{
        const fetchData = await fetch(url);
        const res = await Promise.race([fetchData, timeout(5000)]);
        const data = await res.json();
    
        if(!res.ok) throw new Error(`${res.status}`)

        return data.message;
    }catch(err){
        throw err;
    }
    }

const getImage2 = async function(){
    const image = await AJAX3(imageLink2);
    factImg.src = image;
    };

getImage2();
getFact();

factBtn.addEventListener('click', ()=>{getImage2();getFact();});

