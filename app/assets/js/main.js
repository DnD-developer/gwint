"use strict"

import { sliders } from "./modules/sliders.js"
import { init } from "./services/services"
import { scroll } from "./modules/scroll"
import { Filter } from "./modules/filter"
import { parseDbFraction } from "./services/services"
import { putDbFraction } from "./services/services"
import { zeroFilter } from "./services/services"
import { filter, dbFractions, dbCards, dbGamers } from "./services/services"

document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".popup-preloader")
    preloader.style.display = "flex"
    init()
    scroll()
    parseDbFraction("http://localhost:3000/dbFraction")
        .then((frac) => {
            dbFractions.dbLocal = JSON.parse(JSON.stringify(frac))
        })
        .then(() => {
            parseDbFraction("http://localhost:3000/dbGamers").then((gamer) => {
                dbGamers.dbLocal = JSON.parse(JSON.stringify(gamer))
            })
        })
        .then(() => {
            parseDbFraction("http://localhost:3000/dbCards").then((card) => {
                dbCards.dbLocal = JSON.parse(JSON.stringify(card))
                filter.classLocal = new Filter(dbCards.dbLocal, dbFractions.dbLocal, dbGamers.dbLocal)
                filter.classLocal.init()
                sliders()
                filter.classLocal.moveCard()
                zeroFilter()
            })
        })
        .finally(() => (preloader.style.display = "none"))

    document.querySelector(".random-cards__bigcard-btn").addEventListener("click", () => {
        preloader.style.display = "flex"
        console.log(filter.classLocal)
        filter.classLocal.randomaizer()
        putDbFraction("http://localhost:3000/dbCards", JSON.parse(JSON.stringify(dbCards.dbLocal))).finally(() => (preloader.style.display = "none"))
    })
})
