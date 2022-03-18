import Swiper, { Navigation, Controller, EffectFade } from 'swiper';
import {zeroFilter} from "../services/services";

export function sliders(){
   
    Swiper.use([Navigation, Controller, EffectFade ]);

    const swiperFractionBg = new Swiper(".wrapper-slider", {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        centeredSlides: false,
        slidesPerView: 1,
        speed: 500,
        simulateTouch: false,
        allowTouchMove: false,
        navigation: {
            prevEl: ".slider-fraction__prev",
            nextEl: ".slider-fraction__next",
          },
    });

    const swiperlogoBg = new Swiper(".slider-logo", {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        centeredSlides: false,
        slidesPerView: 1,
        speed: 500,
        simulateTouch: false,
        allowTouchMove: false,
        navigation: {
            prevEl: ".slider-fraction__prev",
            nextEl: ".slider-fraction__next",
          },
    });

    const swiperBigCardBg = new Swiper(".random-cards__bigcard-slider ", {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        centeredSlides: false,
        slidesPerView: 1,
        speed: 500,
        simulateTouch: false,
        allowTouchMove: false,
        navigation: {
            prevEl: ".slider-fraction__prev",
            nextEl: ".slider-fraction__next",
          },
    });

    const swiperFraction = new Swiper(".slider-fraction", {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        speed: 500,
        simulateTouch: false,
        allowTouchMove: false,
        navigation: {
            prevEl: ".slider-fraction__prev",
            nextEl: ".slider-fraction__next",
          },
    });

    swiperFraction.on('slideChange', function () {
        setTimeout(()=>zeroFilter(), 1);
        
    });

    const swiperGamer = new Swiper(".slider-gamer", {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween : 20,
        speed: 500,
        simulateTouch: false,
        allowTouchMove: false,

        navigation: {
            prevEl: ".slider-gamer__prev",
            nextEl: ".slider-gamer__next",
          },
    });

    swiperGamer.on('slideChange', function () {
        setTimeout(()=>zeroFilter(), 1);
        
    });
    
}