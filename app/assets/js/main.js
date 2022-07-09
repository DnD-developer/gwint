"use strict"
import { sliders } from "./modules/sliders.js"
import { filter } from "./modules/db"
import { init } from "./services/services"
import { scroll } from "./modules/scroll"
import { zeroFilter } from "./services/services"

document.addEventListener("DOMContentLoaded", () => {
    init()
    scroll()
    filter.init()
    sliders()
    filter.moveCard()
    zeroFilter()

    document.querySelector(".random-cards__bigcard-btn").addEventListener("click", () => {
        filter.randomaizer()
    })
})
