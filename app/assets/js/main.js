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
    parseDbFraction("https://gwint.mamp:8890/dbProduction.json")
        .then((frac) => {
            dbFractions.dbLocal = JSON.parse(JSON.stringify(frac.dbFraction))
        })
        .then(() => {
            parseDbFraction("https://gwint.mamp:8890/dbProduction.json").then((gamer) => {
                dbGamers.dbLocal = JSON.parse(JSON.stringify(gamer.dbGamers))
            })
        })
        .then(() => {
            parseDbFraction("https://gwint.mamp:8890/dbProduction.json").then((card) => {
                dbCards.dbLocal = JSON.parse(JSON.stringify(card.dbCards))
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
        filter.classLocal.randomaizer()
        putDbFraction("https://gwint.mamp:8890/dbProduction.json", JSON.parse(JSON.stringify({ dbCards: dbCards.dbLocal, dbFraction: dbCards.dbLocal, dbGamers: dbGamers.dbLocal }))).finally(() => (preloader.style.display = "none"))
    })
})
