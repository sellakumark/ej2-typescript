import { Animation } from '@syncfusion/ej2-base';

document.getElementById('previous').onclick = () => {
    const slides: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-carousel-item'));
    const target: HTMLElement = document.querySelector('.e-carousel-item.e-active') as HTMLElement;
    const index: number = (slides.indexOf(target) - 1) % slides.length;
    const slide: HTMLElement = slides[index < 0 ? slides.length - 1 : index];
    slide.classList.add('e-active');

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
