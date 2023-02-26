// Menu burger
let body = document.body;
let menu = document.querySelector('.menu');
let menuBurger = document.querySelector('.menu-burger');

menuBurger.addEventListener('click', () => {
    body.classList.toggle('_lock');
    menu.classList.toggle('_active');
    menuBurger.classList.toggle('_active');
});


let lastScroll = 0;
let headerContainer = document.querySelector('.header');

let scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
let hideHeader = () => headerContainer.classList.contains('_hide');

window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !hideHeader()) {
        let headerHeight = headerContainer.offsetHeight;
        headerContainer.style.top = `-${headerHeight}px`;
        headerContainer.classList.add('_hide');
    }

    else if (scrollPosition() < lastScroll && hideHeader()) {
        headerContainer.style.top = `0px`;
        headerContainer.classList.remove('_hide');
    }

    lastScroll = scrollPosition();

});

// swiper normalization

window.addEventListener('load', () => {

    new Swiper('.blog__slider', {
        navigation: {
            nextEl: '.blog__swiper-button-next',
            prevEl: '.blog__swiper-button-prev'
        },
        pagination: {
            el: '.blog__swiper-pagination',
            clickable: true,
        },
        simulateTouch: false,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        autoHeight: true,
        loop: true,
        spaceBetween: 15,
    });

    new Swiper('.slider-quotes', {
        slidesPerView: 1,
        spaceBetween: 20,
        watchSlidesProgress: true,
        pagination: {
            el: '.slider-quotes__swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
            pageUpDown: true,
        },
        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            861: {
                slidesPerView: 2,
                spaceBetween: 64,
            },
        },
        autoHeight: true,
    });

});






// Spoilers

let spoilerBody = document.querySelector('.questions__body');

spoilerBody.addEventListener('click', (event) => {

    if (event.target.closest('.questions__ask')) {
        let spoilerTitle = event.target.closest('.questions__ask');
        startSpoiler(spoilerTitle);
    }

});

function startSpoiler(title) {

    let spoilerTitle = title;
    let spoilerPage = spoilerTitle.nextElementSibling;
    let currentHeightPage = spoilerPage.offsetHeight;
    let maxHeightPage = spoilerPage.scrollHeight;
    let conditionOpening = spoilerPage.classList.contains('_open');
    let arrow = spoilerTitle.querySelector('.questions__arrow');

    if (currentHeightPage >= 0 && !conditionOpening && currentHeightPage !== maxHeightPage) {
        spoilerPage.classList.add('_open');
        spoilerTitle.classList.add('_active');
        spoilerPage.style.height = maxHeightPage + 'px';
        arrow.style.transform = 'rotate(-180deg)';
    }

    else if (currentHeightPage <= maxHeightPage && conditionOpening && currentHeightPage !== 0) {
        spoilerPage.classList.remove('_open');
        spoilerTitle.classList.remove('_active');
        spoilerPage.style.height = 0;
        arrow.style.transform = 'rotate(0deg)';
    }

}






// Placeholder

let inputNewsletter = document.querySelector('#newsletterButton');
let placeholderNewsletter = inputNewsletter.getAttribute('placeholder');

inputNewsletter.addEventListener('focus', () => {
    inputNewsletter.placeholder = '';
});

inputNewsletter.addEventListener('blur', () => {
    inputNewsletter.placeholder = placeholderNewsletter;
});






// Pop-up

let popUp = document.querySelector('.pop-up');
let header = document.querySelector('.header');
let popUpBody = document.querySelector('.pop-up__body');
let sectionWebsite = document.querySelectorAll('section');
let imagePopUp = document.querySelectorAll('.pop-up__image');
let imageSectionBlog = document.querySelectorAll('.content-blog__image');
let widthScroll = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

for (let index = 0; index < imageSectionBlog.length; index++) {
    imageSectionBlog[index].addEventListener('click', function () {

        /*-------- open pop up ----------*/
        popUp.style.opacity = 1;
        popUp.style.visibility = 'visible';
        popUpBody.classList.add('_active');
        let changeImage = imageSectionBlog[index].getAttribute('value');
        imagePopUp[changeImage].classList.add('_active');

        /*------- hidding scroll --------*/
        body.classList.add('_lock');
        header.style.paddingRight = widthScroll;
        for (let j = 0; j < sectionWebsite.length; j++) {
            sectionWebsite[j].style.paddingRight = widthScroll;
        }
    });
}

popUp.addEventListener('click', function (event) {
    if (!event.target.closest('.pop-up__image')) {

        /*-------- close pop up ----------*/
        popUp.style.opacity = 0;
        popUp.style.visibility = 'hidden';
        popUpBody.classList.remove('_active');
        for (let item = 0; item < imagePopUp.length; item++) {
            imagePopUp[item].classList.remove('_active');
        }

        /*------- showing scroll --------*/
        header.style.paddingRight = 0;
        body.classList.remove('_lock');
        for (let j = 0; j < sectionWebsite.length; j++) {
            sectionWebsite[j].style.paddingRight = 0;
        }
    }
});







// scroll animation

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    // Функция, для присвоения 
    // элементам классов
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            // анимация начинается, при пересечении
            // 1/4 высоты элемента
            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            // Если элемент большой, то анимация начинается
            // при пересечении 1/4 высоты окна браузера
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
            else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }


    // Получаем координаты элемента
    function offset(el) {
        // Получаем в переменную
        // размеры объекта
        // и его координаты
        const rect = el.getBoundingClientRect(),

            // Определяем колличество
            // прокрученных пикселей
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Получаем координаты 
        // положения объекта
        return { top: rect.top + scrollTop }
    }


    // Устанавливаем задержку
    // для анимации
    setTimeout(() => {
        animOnScroll();
    }, 300);
}






// parallax

let blocks = document.querySelectorAll('.parallax-container');

for (let block of blocks) {
    block.addEventListener('mousemove', coordMouse);
    block.addEventListener('mouseleave', stopParalax);
}

function getParalaxElements(element) {

    let idParalaxContainer = element.getAttribute('id');
    let parallaxElements = document.querySelectorAll(`#${idParalaxContainer} .parallax-element`);
    return parallaxElements;

}

function coordMouse(event) {

    let parallaxElements = getParalaxElements(this);

    let clientX = event.clientX;
    let clientY = event.clientY;

    let parallaxLeftOffset = this.getBoundingClientRect().left;
    let parallaxTopOffset = this.getBoundingClientRect().top;

    let coordX = clientX - parallaxLeftOffset - 0.5 * this.offsetWidth;
    let coordY = clientY - parallaxTopOffset - 0.5 * this.offsetHeight;

    parallaxElements.forEach((element) => {
        let speed = element.dataset.speed;
        x = - (coordX * speed).toFixed(2);
        y = - (coordY * speed).toFixed(2);
        element.style.transform = `translate(${x}px, ${y}px)`;
    });

}

function stopParalax() {

    let parallaxElements = getParalaxElements(this);

    parallaxElements.forEach((element) => {
        element.style.transform = `translate(0px, 0px)`;
    });

}