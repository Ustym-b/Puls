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
    return +str.replace(/px/g, '');
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

// tabs

const lincBack = document.querySelectorAll('.catalog-item__back'),
    lincMore = document.querySelectorAll('.catalog-item__link'),
    tabs = document.querySelectorAll('.catalog__tab'),
    tabsContent = document.querySelectorAll('.catalog__content'),
    tabsParent = document.querySelector('.catalog__tabs');

function hideTabContent(){
    tabsContent.forEach(item => item.classList.remove('catalog__content_active'));

    tabs.forEach(tab => tab.classList.remove('catalog__tab_active'));
}

function showTabContent(i = 0){
    tabsContent[i].classList.add('catalog__content_active');
    tabs[i].classList.add('catalog__tab_active');
}

tabsParent.addEventListener('click', (e)=>{
    const target = e.target.parentElement;
    console.log(target);
    if(target && target.classList.contains('catalog__tab')){
        tabs.forEach((item, i) => {
            if(item == target){
                hideTabContent();
                showTabContent(i);       
            }
        })
    }
})

hideTabContent();
showTabContent();

lincMore.forEach(item=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        e.target.parentElement.classList.remove('catalog-item__content_active');
        e.target.parentElement.nextElementSibling.classList.add('catalog-item__list_active');
    })
})

lincBack.forEach(item=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        e.target.parentElement.classList.remove('catalog-item__list_active');
        e.target.parentElement.previousElementSibling.classList.add('catalog-item__content_active');
    })
})

// lincMore.addEventListener('click', (e)=>{
//     e.preventDefault();
//     mainContent.classList.remove('catalog-item__content_active');
//     descrContent.classList.add('catalog-item__list_active');
// })

// lincBack.addEventListener('click', (e)=>{
//     e.preventDefault();
//     descrContent.classList.remove('catalog-item__list_active');
//     mainContent.classList.add('catalog-item__content_active');
// })