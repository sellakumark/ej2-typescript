import { addClass, removeClass } from '@syncfusion/ej2-base';
import { AnimationEffect, ArrowState, Carousel, SlideChangedEventArgs } from '@syncfusion/ej2-navigations';

/** Default Carousel */
const defaultObj: Carousel = new Carousel({
    animation: {
        effect: 'None'
    },
    items: [
        { template: '<img src="images/bird.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/nature.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/night-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/sea-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/snowfall.jpg" alt="image" width="100%" height="300" />' }
    ],
    showPlayButton: true
});
defaultObj.appendTo(document.getElementById('carousel'));

document.getElementById('animation').onchange = (e: Event) => {
    defaultObj.animation.effect = (e.target as HTMLSelectElement).value as AnimationEffect;
    defaultObj.dataBind();
};

document.getElementById('showArrow').onchange = (e: Event) => {
    defaultObj.showArrows = (e.target as HTMLSelectElement).value as ArrowState;
    defaultObj.dataBind();
};

document.getElementById('showIndicators').onchange = (e: Event) => {
    defaultObj.showIndicators = (e.target as HTMLSelectElement).value === 'true';
    defaultObj.dataBind();
};
document.getElementById('showPlayButton').onchange = (e: Event) => {
    defaultObj.showPlayButton = (e.target as HTMLSelectElement).value === 'true';
    defaultObj.dataBind();
};

document.getElementById('themeChange').onchange = (e: Event) => {
    const links: HTMLElement[] = [].slice.call(document.getElementsByTagName('link'));
    for (const link of links) {
        const hrefValue: string = link.getAttribute('href');
        if (hrefValue.indexOf('./css/') !== -1) {
            link.setAttribute('href', `./css/${(e.target as HTMLSelectElement).value}.css`);
        }
    }
};

/** Carousel Animations */
const animationObj: Carousel = new Carousel({
    animation: {
        customEffect: 'zoom'
    },
    cssClass: 'ca-carousel',
    items: [
        { cssClass: 'animate__animated animate__jackInTheBox', template: '<img src="images/bird.jpg" alt="image" width="100%" height="300" />' },
        { cssClass: 'animate__animated animate__jackInTheBox', template: '<img src="images/nature.jpg" alt="image" width="100%" height="300" />' },
        { cssClass: 'animate__animated animate__jackInTheBox', template: '<img src="images/night-view.jpg" alt="image" width="100%" height="300" />' },
        { cssClass: 'animate__animated animate__jackInTheBox', template: '<img src="images/sea-view.jpg" alt="image" width="100%" height="300" />' },
        { cssClass: 'animate__animated animate__jackInTheBox', template: '<img src="images/snowfall.jpg" alt="image" width="100%" height="300" />' }
    ]
});
animationObj.appendTo(document.getElementById('carouselAnimations'));

document.getElementById('animateEffects').onchange = (e: Event) => {
    const effectName: string = (e.target as HTMLSelectElement).value;
    if (effectName === 'none') {
        return;
    }
    const items: HTMLElement[] = [].slice.call(animationObj.element.querySelectorAll('.e-carousel-item'));
    const animationEffects: string[] = ['animate__animated', 'animate__bounceIn', 'animate__flipInY', 'animate__jackInTheBox'];
    removeClass(items, animationEffects);
    addClass(items, ['animate__animated', effectName]);
};

document.getElementById('customEffects').onchange = (e: Event) => {
    const effectName: string = (e.target as HTMLSelectElement).value;
    if (effectName === 'none') {
        return;
    }
    removeClass(animationObj.element.querySelectorAll('.e-carousel-item'), ['animate__animated', 'animate__bounceIn', 'animate__flipInY', 'animate__jackInTheBox']);
    animationObj.animation.customEffect = effectName;
    animationObj.dataBind();
};

/** Datasource Binding Carousel */
const carouselItems: Record<string, string | number>[] = [
    {
        ID: 1,
        Title: 'Birds',
        Content: 'Birds are a group of warm-blooded vertebrates constituting the class Aves, characterized by feathers, toothless beaked jaws, the laying of hard-shelled eggs, a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton. Birds live worldwide and range in size from the 5.5 cm (2.2 in) bee hummingbird to the 2.8 m (9 ft 2 in) ostrich. There are about ten thousand living species, more than half of which are passerine, or "perching" birds.',
        ImgPath: 'images/bird.jpg'
    }, {
        ID: 2,
        Title: 'Nature',
        Content: 'Nature, in the broadest sense, is the natural, physical, material world or universe. "Nature" can refer to the phenomena of the physical world, and also to life in general. The study of nature is a large, if not the only, part of science. Although humans are part of nature, human activity is often understood as a separate category from other natural phenomena.',
        ImgPath: 'images/nature.jpg'
    }, {
        ID: 3,
        Title: 'Twin Towers',
        Content: 'The Twin Towers Correctional Facility, also referred to in the media as Twin Towers Jail, is a complex in Los Angeles, California.[1] The facility is located at 450 Bauchet Street, in Los Angeles, California and is operated by the Los Angeles County Sheriffs Department. The facility consists of two towers, a medical services building, and the Los Angeles County Medical Center Jail Ward.',
        ImgPath: 'images/night-view.jpg'
    }, {
        ID: 4,
        Title: 'Sea View',
        Content: 'The sea, connected as the world ocean or simply the ocean, is the body of salty water that covers approximately 71 percent of the Earth surface. The word sea is also used to denote second-order sections of the sea, such as the Mediterranean Sea, as well as certain large, entirely landlocked, saltwater lakes, such as the Caspian Sea.',
        ImgPath: 'images/sea-view.jpg'
    }, {
        ID: 5,
        Title: 'Snowfall',
        Content: 'Snow comprises individual ice crystals that grow while suspended in the atmosphere—usually within clouds—and then fall, accumulating on the ground where they undergo further changes.[2] It consists of frozen crystalline water throughout its life cycle, starting when, under suitable conditions, the ice crystals form in the atmosphere, increase to millimeter size, precipitate and accumulate on surfaces, then metamorphose in place, and ultimately melt, slide or sublimate away.',
        ImgPath: 'images/snowfall.jpg'
    }
];

const datasourceObj: Carousel = new Carousel({
    animation: { effect: 'Fade' },
    cssClass: 'ds-carousel',
    dataSource: carouselItems,
    height: 425,
    itemTemplate: '#datasourceTemplate',
    showPlayButton: false
});
datasourceObj.appendTo(document.getElementById('datasourceCarousel'));

/** Template Carouse */
const templateObj: Carousel = new Carousel({
    animation: { effect: 'None' },
    items: [
        { template: '#itemTemplate' },
        { template: '<img src="images/nature.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/night-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/sea-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/snowfall.jpg" alt="image" width="100%" height="300" />' }
    ],
    cssClass: 'tmpl-carousel',
    showPlayButton: true,
    selectedIndex: 2,
    showIndicators: true,
    arrowsTemplate: '#arrowsTemplate',
    indicatorsTemplate: '#indicatorTemplate',
    playButtonTemplate: '#playButtonTemplate',
    slideChanged: (args: SlideChangedEventArgs) => {
        const indicators: Element = templateObj.element.querySelector('.e-carousel-indicators');
        removeClass(indicators.querySelectorAll('.indicator'), 'active');
        addClass([indicators.querySelector('[indicator-index="' + args.currentIndex + '"]')], 'active');
    }
});
templateObj.appendTo(document.getElementById('templateCarousel'));

document.getElementById('play-button').onclick = (e: Event) => {
    if ((e.currentTarget as HTMLElement).querySelector('.play-hide')) {
        removeClass([(e.currentTarget as HTMLElement).querySelector('.play')], 'play-hide');
        addClass([(e.currentTarget as HTMLElement).querySelector('.pause')], 'pause-hide');
        templateObj.pause();
    } else {
        addClass([(e.currentTarget as HTMLElement).querySelector('.play')], 'play-hide');
        removeClass([(e.currentTarget as HTMLElement).querySelector('.pause')], 'pause-hide');
        templateObj.play();
    }
};

/** Carouse Public Methods */
const publicMethodObj: Carousel = new Carousel({
    cssClass: 'pm-carousel',
    items: [
        { template: '<img src="images/bird.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/nature.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/night-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/sea-view.jpg" alt="image" width="100%" height="300" />' },
        { template: '<img src="images/snowfall.jpg" alt="image" width="100%" height="300" />' }
    ],
    showPlayButton: true
});
publicMethodObj.appendTo(document.getElementById('publicCarousel'));

document.getElementById('previous_btn').onclick = () => {
    publicMethodObj.prev();
};

document.getElementById('next_btn').onclick = () => {
    publicMethodObj.next();
};

document.getElementById('play_btn').onclick = () => {
    publicMethodObj.play();
};

document.getElementById('pause_btn').onclick = () => {
    publicMethodObj.pause();
};

const links: HTMLElement[] = [].slice.call(document.querySelectorAll('.nav a'));
const sections: HTMLElement[] = [].slice.call(document.querySelectorAll('.section'));
links.forEach((link: HTMLElement) => {
    link.onclick = (e: Event) => {
        e.preventDefault();
        removeClass(links.concat(sections), 'active');
        const target: HTMLElement = e.target as HTMLElement;
        const section: HTMLElement = document.getElementById(target.getAttribute('href').replace('#', '')) as HTMLElement;
        addClass([target, section], 'active');

    };
});
