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
// link: https://random.dog/woof.json

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
    let image = await AJAX('https://random.dog/woof.json');
    if(image.slice(-3) === 'mp4') {
        image = await AJAX('https://random.dog/woof.json');
        i.src = image;} else{
            i.src = image;
        }
};

images.forEach((img) => getImage1(img));
console.log(images);