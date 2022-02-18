import { classList, removeClass } from '@syncfusion/ej2-base';

let slideDirection: string = 'next';
const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
slides[0].parentNode.addEventListener('transitionend', () => {
    removeClass(slides, 'e-slide-transition');
});

const changeSlides = (direction: string = 'next') => {
    const activeSlide: HTMLElement = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    const activeIndex: number = parseInt(activeSlide.dataset.index, 10);
    let currentIndex: number;
    if (direction === 'prev') {
        currentIndex = activeIndex - 1;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
    } else {
        currentIndex = activeIndex + 1;
        if (currentIndex === slides.length) {
            currentIndex = 0;
        }
    }
    let nextIndex = currentIndex + 1;
    let prevIndex = currentIndex - 1;
    if (nextIndex === slides.length) {
        nextIndex = 0;
    } else if (prevIndex < 0) {
        prevIndex = slides.length - 1;
    }
    const prevSlide = slides[prevIndex];
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];
    removeClass(slides, ['e-prev', 'e-active', 'e-next']);
    classList(nextSlide, ['e-next', 'e-slide-transition'], ['e-prev', 'e-active']);
    classList(prevSlide, ['e-prev', 'e-slide-transition'], ['e-active', 'e-next']);
    classList(currentSlide, ['e-active'], ['e-prev', 'e-next']);
};

setInterval(() => { changeSlides(slideDirection); }, 5000);

document.getElementById('previous').onclick = () => { slideDirection = 'prev'; };

document.getElementById('next').onclick = () => { slideDirection = 'next'; };


import { Animation } from '@syncfusion/ej2-base';

document.getElementById('previous').onclick = () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    const target: HTMLElement = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    const index: number = (slides.indexOf(target) - 1) % slides.length;
    const slide: HTMLElement = slides[index < 0 ? slides.length - 1 : index];
    slide.classList.add('e-active');
    target.classList.add('carousel-item-end');

    const previousAnimationObj: Animation = new Animation({
        name: 'SlideRightOut',
        duration: 1000,
        timingFunction: 'easeInOut',
        end: () => {
            target.classList.remove('e-active');
        }
    });
    previousAnimationObj.animate(target);

    const nextAnimationObj: Animation = new Animation({
        name: 'SlideLeftIn',
        duration: 1000,
        timingFunction: 'easeInOut'
    });
    nextAnimationObj.animate(slide);
};

document.getElementById('next').onclick = () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    const target: HTMLElement = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    const slide: HTMLElement = slides[(slides.indexOf(target) + 1) % slides.length];
    slide.classList.add('e-active');
    target.classList.add('carousel-item-start');

    const previousAnimationObj: Animation = new Animation({
        name: 'SlideLeftOut',
        duration: 1000,
        timingFunction: 'easeInOut',
        end: () => {
            target.classList.remove('e-active');
        }
    });
    previousAnimationObj.animate(target);

    const nextAnimationObj: Animation = new Animation({
        name: 'SlideRightIn',
        duration: 1000,
        timingFunction: 'easeInOut'
    });
    nextAnimationObj.animate(slide);
};
