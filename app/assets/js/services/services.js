import { tabsCategoriesCard } from "../modules/tabsCategoriesCard"

function init() {
    if ("ontouchstart" in window) {
        document.querySelector(".random-cards__bigcard").addEventListener("touchstart", () => {
            document.querySelector(".random-cards__bigcard-cercle").classList.add("random-cards__bigcard-cercle--active")
        })

        document.querySelector(".random-cards__bigcard").addEventListener("touchend", () => {
            document.querySelector(".random-cards__bigcard-cercle").classList.remove("random-cards__bigcard-cercle--active")
        })
    } else {
        document.querySelector(".random-cards__bigcard").addEventListener("mouseover", () => {
            document.querySelector(".random-cards__bigcard-cercle").classList.add("random-cards__bigcard-cercle--active")
        })

        document.querySelector(".random-cards__bigcard").addEventListener("mouseout", () => {
            document.querySelector(".random-cards__bigcard-cercle").classList.remove("random-cards__bigcard-cercle--active")
        })
    }
}

function changeCards(cardsWrapper, cardFrontClass, cardBackClass) {
    const cardsWrapperDomElement = document.querySelectorAll(cardsWrapper)

    cardsWrapperDomElement.forEach((wrapper) => {
        wrapper.addEventListener("mouseover", (e) => {
            if (e.target && (e.target.classList.contains("card-item") || e.target.closest(".card-item"))) {
                let cardItemWrapperDomElement = e.target.closest(".card-item")
                cardItemWrapperDomElement.querySelector(cardBackClass).classList.add("rotate-card-back")
                cardItemWrapperDomElement.querySelector(cardFrontClass).classList.add("rotate-card-front")
            }
        })

        wrapper.addEventListener("mouseout", (e) => {
            if (e.target && (e.target.classList.contains("card-item") || e.target.closest(".card-item"))) {
                let cardItemWrapperDomElement = e.target.closest(".card-item")
                cardItemWrapperDomElement.querySelector(cardBackClass).classList.remove("rotate-card-back")
                cardItemWrapperDomElement.querySelector(cardFrontClass).classList.remove("rotate-card-front")
            }
        })
    })
}

function zeroFilter() {
    tabsCategoriesCard(".all-cards__tabs-trigger li", ".all-cards__tabs-content h4", filter.class)
    tabsCategoriesCard(".deck-cards__tabs-trigger li", ".deck-cards__tabs-content h4", filter.class)
    filter.class.changeAkcent()
    filter.class.renderCard(document.querySelector(".all-cards__tabs-trigger li:first-child"))
    filter.class.renderCard(document.querySelector(".deck-cards__tabs-trigger li:first-child"))
}

async function parseDbFraction(url) {
    let res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
}

async function putDbFraction(url, db) {
    let res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(db)
    })
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
}

function zeroFilter() {
    tabsCategoriesCard(".all-cards__tabs-trigger li", ".all-cards__tabs-content h4")
    tabsCategoriesCard(".deck-cards__tabs-trigger li", ".deck-cards__tabs-content h4")
    filter.changeAkcent()
    filter.renderCard(document.querySelector(".all-cards__tabs-trigger li:first-child"))
    filter.renderCard(document.querySelector(".deck-cards__tabs-trigger li:first-child"))
}

export { init }
export { changeCards }
export { parseDbFraction }
export { putDbFraction }
export { zeroFilter }
export let filter = {
        get classLocal() {
            return this.class
        },
        set classLocal(object) {
            this.class = object
        }
    },
    dbFractions = {
        get dbLocal() {
            return this.fractions
        },
        set dbLocal(object) {
            this.fractions = object
        }
    },
    dbCards = {
        get dbLocal() {
            return this.cards
        },
        set dbLocal(object) {
            this.cards = object
        }
    },
    dbGamers = {
        get dbLocal() {
            return this.gamers
        },
        set dbLocal(object) {
            this.gamers = object
        }
    }
