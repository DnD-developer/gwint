import SimpleBar from "simplebar";

export function scroll(){
    new SimpleBar(document.querySelector(".all-cards__content"),{
        autoHide: false,
        scrollbarMaxSize: 45,
    });
    new SimpleBar(document.querySelector(".deck-cards__content"),{
        autoHide: false,
        scrollbarMaxSize: 45,
    });
}
