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

