import { addClass, removeClass } from '@syncfusion/ej2-base';

let target: HTMLElement;
let slide: HTMLElement;

const slideTransition: Function = (index: number, direction: string) => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    target = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    slide = slides[index];
    if (direction === 'previous') {
        slide.classList.add('e-carousel-item-prev');
        slide.offsetHeight;
        target.classList.add('e-carousel-item-end');
        slide.classList.add('e-carousel-item-end');
    } else {
        slide.classList.add('e-carousel-item-next');
        slide.offsetHeight;
        target.classList.add('e-carousel-item-start');
        slide.classList.add('e-carousel-item-start');
    }
};

document.getElementById('previous').onclick = () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    target = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    const index: number = (slides.indexOf(target) - 1) % slides.length;
    slide = slides[index < 0 ? slides.length - 1 : index];
    slideTransition(index < 0 ? slides.length - 1 : index, 'previous');
};

document.getElementById('next').onclick = () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    target = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    slideTransition((slides.indexOf(target) + 1) % slides.length, 'next');
};

document.querySelector('.e-carousel-items').addEventListener('transitionend', () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    removeClass(slides, ['e-carousel-item-end', 'e-carousel-item-prev', 'e-carousel-item-start', 'e-carousel-item-next']);
    addClass([slide], 'e-active');
    removeClass([target], 'e-active');
});

document.querySelectorAll('.btn-indicator').forEach((indicator: Element) => {
    indicator.addEventListener('click', (e: Event) => {
        const prevIndex = parseInt((document.querySelector('.e-carousel-item.e-active') as HTMLElement).dataset.index, 10);
        const index: number = parseInt((e.target as HTMLElement).id.replace('#', ''));
        if (index !== prevIndex) {
            slideTransition(index, index > prevIndex ? 'next' : 'previous')
        }
    });
});
