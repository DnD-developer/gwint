import { changeCards } from "../services/services";

export class Filter {
    constructor(db, dblocal, dbGamers) {
        this.dbFraction = db;
        this.dbFractionlocal = dblocal;
        this.dbGamers = dbGamers;
    }

    changeAkcent() {
        let akcent = document.querySelector(".slider-fraction .swiper-slide-active").dataset.fraction;
        document.querySelectorAll(".svg-shadow").forEach((item) => {
            item.style.fill = this.dbFractionlocal[akcent].color;
        });

        document.querySelectorAll(".svg-tab-shadow").forEach((item) => {
            item.style.fill = this.dbFractionlocal[akcent].color;
        });

        document.querySelector(".random-cards__bigcard-cercle").style.backgroundColor = this.dbFractionlocal[akcent].color;

        document.querySelector(".random-cards__bigcard-btn").style.color = this.dbFractionlocal[akcent].colorText;

        document.querySelectorAll(".random-cards__bigcard-btn path").forEach((item) => {
            item.style.fill = this.dbFractionlocal[akcent].colorText;
        });
    }

    init() {
        let createSlides = (element, param, item, wrap = "", triggerBigCard = false, fracTitle = false, gamer = false) => {
            if (triggerBigCard) {
                let cardFront = document.createElement("div"),
                    cardBack = document.createElement("div");
                cardFront.classList.add("random-cards__bigcard-front", "card-bg");
                cardBack.classList.add("random-cards__bigcard-back", "card-bg");
                cardFront.style.backgroundImage = this.dbFractionlocal[item][param];
                cardBack.style.backgroundImage = this.dbFractionlocal[item][param];
                element.dataset.fraction = item;
                element.appendChild(cardFront);
                element.appendChild(cardBack);
            } else if (fracTitle) {
                element.classList.add("slider-title");
                element.textContent = this.dbFractionlocal[item][param];
            } else if (gamer) {
                element.classList.add("slider-title");
                element.textContent = this.dbGamers[item];
                element.dataset.gamer = this.dbGamers[item];
            } else {
                element.style.backgroundImage = this.dbFractionlocal[item][param];
            }
            if (!gamer) {
                element.dataset.fraction = item;
            }
            element.classList.add("swiper-slide");
            document.querySelector(`${wrap} .swiper-wrapper`).appendChild(element);
        };

        for (let frac in this.dbFractionlocal) {
            let wrapperBgCopy = document.createElement("div"),
                logoBgCopy = document.createElement("div"),
                bigCardBgCopy = document.createElement("div"),
                fracTitle = document.createElement("h2");
            createSlides(wrapperBgCopy, "bg", frac, ".wrapper-slider");
            createSlides(logoBgCopy, "logo", frac, ".slider-logo");
            createSlides(bigCardBgCopy, "bgBack", frac, ".random-cards__bigcard-slider", true);
            createSlides(fracTitle, "nameText", frac, ".slider-fraction", false, true);
        }

        for (let gamer in this.dbGamers) {
            let gamerElement = document.createElement("h2");
            createSlides(gamerElement, "nameText", gamer, ".slider-gamer", false, false, true);
        }

        changeCards(".cards", ".card-item__front", ".card-item__back");
    }

    totalDeckCards() {
        let fraction = document.querySelector(".slider-fraction .swiper-slide-active").dataset.fraction,
            gamer = document.querySelector(".slider-gamer .swiper-slide-active").dataset.gamer,
            total = 0,
            totalUnit = 0,
            totalSpecial = 0;

        for (let group in this.dbFraction[fraction]) {
            for (let card in this.dbFraction[fraction][group]) {
                if (this.dbFraction[fraction][group][card].gamers[gamer]) {
                    total += 1;
                    if (group == "special") {
                        totalSpecial += 1;
                    } else if (group != "leaders") {
                        totalUnit += 1;
                    }
                }
            }
        }

        document.querySelector(".random-cards__info-total p").textContent = total;
        document.querySelector(".random-cards__info-unit p").textContent = totalUnit;
        document.querySelector(".random-cards__info-special p").textContent = totalSpecial;
    }

    randomaizer() {
        let gamerActive = document.querySelector(".slider-gamer .swiper-slide-active").dataset.gamer,
            fraction = document.querySelector(".slider-fraction .swiper-slide-active").dataset.fraction,
            totalCard = 0,
            totalFreeCard = [],
            i = 0;

        for (let group in this.dbFraction[fraction]) {
            for (let card in this.dbFraction[fraction][group]) {
                if (!this.dbFraction[fraction][group][card].gamers[gamerActive]) {
                    totalFreeCard[i] = card;
                    i += 1;
                }
                totalCard += 1;
            }
        }

        let random = (totalFreeCard) => {
            let randomCard = Math.floor(Math.random() * totalFreeCard.length),
                zeroCSS = () => {
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-back").classList.remove("rotate-card-back");
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-front").classList.remove("rotate-card-front");
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-back").style.backgroundImage = this.dbFractionlocal[fraction].bgBack;
                    document.querySelector(".random-cards__bigcard-cercle").style.display = "block";
                    document.querySelector(".random-cards__bigcard-btn").style.display = "block";
                };

            for (let group in this.dbFraction[fraction]) {
                if (this.dbFraction[fraction][group][totalFreeCard[randomCard]]) {
                    this.dbFraction[fraction][group][totalFreeCard[randomCard]].gamers[gamerActive] = true;
                    document.querySelector(".random-cards__bigcard-cercle").style.display = "none";
                    document.querySelector(".random-cards__bigcard-btn").style.display = "none";
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-front").classList.add("rotate-card-front");
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-back").style.backgroundImage = this.dbFraction[fraction][group][totalFreeCard[randomCard]].bg;
                    document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-back").classList.add("rotate-card-back");

                    if ("ontouchstart" in window) {
                        document.querySelector("body").addEventListener(
                            "touchstart",
                            (e) => {
                                if (!(e.target.classList.contains("random-cards__bigcard") || e.target.closest(".random-cards__bigcard"))) {
                                    zeroCSS();
                                }
                            },
                            1,
                        );
                    } else {
                        document.querySelector(".random-cards__bigcard-slider .swiper-slide-active .random-cards__bigcard-back").addEventListener(
                            "mouseout",
                            () => {
                                zeroCSS();
                            },
                            1,
                        );
                    }

                    this.renderCard(document.querySelector(`.all-cards__tabs-trigger li.active-tab`));
                    this.renderCard(document.querySelector(`.deck-cards__tabs-trigger li.active-tab`));
                    break;
                }
            }
        };

        if (totalFreeCard.length != 0) {
            random(totalFreeCard);
        } else {
            alert("Доступных карт нет");
        }
    }

    renderCard(trigger) {
        let fraction = document.querySelector(".slider-fraction .swiper-slide-active").dataset.fraction,
            group = trigger.dataset.group,
            activeGamer = document.querySelector(".slider-gamer .swiper-slide-active").dataset.gamer,
            gamerTrigger;
        let wrapper;
        if (trigger.closest(".all-cards")) {
            wrapper = document.querySelector(".all-cards__content .simplebar-content");
            gamerTrigger = false;
        } else if (trigger.closest(".deck-cards")) {
            wrapper = document.querySelector(".deck-cards__content .simplebar-content");
            gamerTrigger = true;
        }
        wrapper.innerHTML = "";
        for (let card in this.dbFraction[fraction][group]) {
            if ((!this.dbFraction[fraction][group][card].gamers[activeGamer] && !gamerTrigger) || (this.dbFraction[fraction][group][card].gamers[activeGamer] && gamerTrigger)) {
                let cardItem = this.createCard(fraction, group, card, gamerTrigger);
                wrapper.appendChild(cardItem);
            }
        }
        this.totalDeckCards();
    }

    createCard(fraction, group, card, gamerTrigger) {
        let cardItem = document.createElement("article"),
            cardItemFront = document.createElement("div"),
            cardItemBack = document.createElement("div"),
            svgWrapper = document.createElement("div");

        let svgIconAdd = `<svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 15L0 15L0 19H32V15Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            <path d="M14 0L14 11L18 11V0L14 0Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            <path d="M14 19L14 34H18V19H14Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            </svg>`;

        let svgIconDelete = `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.5536 1.00449L0.131348 29.1501L2.97357 31.9647L31.3958 3.81905L28.5536 1.00449Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            <path d="M32.7419 29.2491L19.2413 15.8799L16.3991 18.6945L29.8997 32.0637L32.7419 29.2491Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            <path d="M14.1781 10.5546L3.51978 0L0.677555 2.81457L11.3359 13.3692L14.1781 10.5546Z" fill="${this.dbFractionlocal[fraction].colorText}"/>
            </svg>`;

        cardItem.classList.add("card-item");

        cardItemFront.classList.add("card-item__front", "card-bg");
        cardItemFront.style.backgroundImage = this.dbFraction[fraction][group][card].bg;

        cardItemBack.classList.add("card-item__back", "card-bg");
        cardItemBack.style.backgroundImage = this.dbFractionlocal[fraction].bgBack;

        if (!gamerTrigger) {
            svgWrapper.classList.add("add-svg");
            svgWrapper.innerHTML = svgIconAdd;
        } else {
            svgWrapper.classList.add("delete-svg");
            svgWrapper.innerHTML = svgIconDelete;
        }
        svgWrapper.classList.add("move-card-svg");
        cardItemBack.appendChild(svgWrapper);
        cardItem.appendChild(cardItemFront);
        cardItem.appendChild(cardItemBack);
        cardItem.dataset.id = this.dbFraction[fraction][group][card].name;
        return cardItem;
    }

    moveCard() {
        const wrapperAllCardsDomElement = document.querySelector(".all-cards__content"),
            wrapperDeckCardsDomElement = document.querySelector(".deck-cards__content");

        let changeGamersCard = (e, nameCardsContent, gamerTrigger) => {
            if (e.target && (e.target.classList.contains("move-card-svg") || e.target.closest(".move-card-svg"))) {
                let fraction = document.querySelector(".slider-fraction .swiper-slide-active").dataset.fraction,
                    activeGamer = document.querySelector(".slider-gamer .swiper-slide-active").dataset.gamer,
                    group = document.querySelector(`.${nameCardsContent}__tabs-trigger li.active-tab`).dataset.group;
                for (let card in this.dbFraction[fraction][group]) {
                    if (this.dbFraction[fraction][group][card].name == e.target.closest(".card-item").dataset.id) {
                        this.dbFraction[fraction][group][card].gamers[activeGamer] = gamerTrigger;
                    }
                }
                this.renderCard(document.querySelector(`.all-cards__tabs-trigger li.active-tab`));
                this.renderCard(document.querySelector(`.deck-cards__tabs-trigger li.active-tab`));
            }
        };

        wrapperAllCardsDomElement.addEventListener("click", (e) => {
            changeGamersCard(e, "all-cards", true);
        });

        wrapperDeckCardsDomElement.addEventListener("click", (e) => {
            changeGamersCard(e, "deck-cards", false);
        });
    }
}
