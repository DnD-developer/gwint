import SimpleBar from "simplebar"

export function scroll() {
    function isTouchDevice() {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    }

    function hideCustomScroll() {
        if (isTouchDevice()) {
            document.querySelectorAll(".simplebar-vertical").forEach((item) => {
                item.style.display = "none"
            })
        }
    }

    new SimpleBar(document.querySelector(".all-cards__content"), {
        autoHide: false,
        scrollbarMaxSize: 45
    })

    new SimpleBar(document.querySelector(".deck-cards__content"), {
        autoHide: false,
        scrollbarMaxSize: 45
    })

    hideCustomScroll()
}
