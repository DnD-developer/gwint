"use strict";
import {sliders} from "./modules/sliders.js";
import {tabsCategoriesCard} from "./modules/tabsCategoriesCard";
import {filter} from "./modules/db";
import {init} from "./services/services";
import {scroll} from "./modules/scroll";



document.addEventListener('DOMContentLoaded', () =>{
    init();
    scroll( );
    filter.init();
    sliders();
    filter.moveCard();
    zeroFilter();

    document.querySelectorAll('.slider-fraction__btn').forEach((item)=>{
        item.addEventListener("click", (el)=>{
            zeroFilter();
        });
    });

    document.querySelectorAll('.slider-gamer__btn').forEach((item)=>{
        item.addEventListener("click", (el)=>{
            zeroFilter();
        });
    });


    function zeroFilter() {
        tabsCategoriesCard(".all-cards__tabs-trigger li", ".all-cards__tabs-content h4");
        tabsCategoriesCard(".deck-cards__tabs-trigger li", ".deck-cards__tabs-content h4");
        filter.changeAkcent();
        filter.renderCard(document.querySelector(".all-cards__tabs-trigger li:first-child"));
        filter.renderCard(document.querySelector(".deck-cards__tabs-trigger li:first-child"));
    }

    document.querySelector(".random-cards__bigcard-btn").addEventListener("click",()=>{
        filter.randomaizer();
    });

    
});