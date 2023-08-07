'use strict';

// Slider

const slides = document.querySelectorAll('.slide__offer'), // 
    sliderPrev = document.querySelector('.slider__prev'),
    sliderNext = document.querySelector('.slider__next'),
    sliderWraper = document.querySelector('.slider__wrapper'),	
    slidesField = document.querySelector('.slider__offer-iner');

let offset = 0, // variable indicating the number of pixels by which the slider should be moved
    slideIndex = 1, //variable indicating the number of the active slide
    width = window.getComputedStyle(sliderWraper).width; 

slidesField.style.width = 100 * slides.length + '%';
sliderWraper.style.overflow = 'hidden';

const slideWidth = slideArr => slideArr.forEach(slide => slide.style.width = width);

slideWidth(slides);

const deleteNotDigits = str =>{
    return +str.replace(/\D/g, '');
}

const indicator = document.createElement('ol'),
    dots = [];

indicator.classList.add('slider__indicator');
sliderWraper.append(indicator);
indicator.style.cssText = `
    position: absolute;
    display: flex;
    width: 100%;
    justify-content: center;
    bottom: 0;
    `
for(let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i+1);

    dot.style.cssText = `
        margin-left: 5px;
        margin-right: 5px;
        width: 40px;
        height: 10px;
        background-color: #c70101;
        cursor: pointer;
        transition: opacity 0.6s ease;
        `;
    i == 0 ? dot.style.opacity = 1: dot.style.opacity = '0.5';
    indicator.append(dot);
    dots.push(dot);
}

const dotsOpasity = (arr)=>{
    arr.forEach(item => item.style.opacity = '.5');
    arr[slideIndex-1].style.opacity = 1;
}

sliderNext.addEventListener('click', ()=>{
    if(offset == deleteNotDigits(width) * (slides.length - 1)){
        offset = 0;
    } else {
        offset += deleteNotDigits(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex == slides.length ? slideIndex = 1 : slideIndex++;
    dotsOpasity(dots);
})

sliderPrev.addEventListener('click', ()=>{
    if(offset == 0 ){
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width)
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    slideIndex == 1 ? slideIndex = slides.length : slideIndex--;
    dotsOpasity(dots);
})

dots.forEach(dot => {
    dot.addEventListener('click', e =>{
        slideIndex = e.target.getAttribute('data-slide-to');
         
        offset = (slideIndex - 1) * deleteNotDigits(width);

        slidesField.style.transform = `translateX(-${offset}px)`;
        dotsOpasity(dots);
    })
})

// slider adaptability
window.addEventListener(`resize`, () => {
    width = window.getComputedStyle(sliderWraper).width;
    slideWidth(slides);
    if(offset == 0){
        slidesField.style.transform = `translateX(-${offset}px)`;
    } else{
        offset = deleteNotDigits(window.getComputedStyle(slides[0]).width)*(slideIndex - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
});