


export function tabsCategoriesCard(triggers, contents, filter) {
    
    const tabsTriggersDomElements = document.querySelectorAll(triggers),
        tabsContentsDomElelements = document.querySelectorAll(contents);

       function hiddenAll() {
            tabsContentsDomElelements.forEach(el => {
                el.style.display = "none";
            });

            tabsTriggersDomElements.forEach(el => {
                let colorTriggers = el.querySelectorAll(".svg-tab");
                colorTriggers.forEach((el)=>{
                    el.closest("li").classList.remove("active-tab");
                    el.style.fill = "#846653";
                });
            });
       }

        function showCurrent(triggerNum) {
            let colorTriggers = tabsTriggersDomElements[triggerNum].querySelectorAll(".svg-tab");
            tabsContentsDomElelements[triggerNum].style.display = "block";
            colorTriggers.forEach((el)=>{
                el.closest("li").classList.add("active-tab");
                el.style.fill = "#ffffff";
            });
            
       }

       

       tabsTriggersDomElements.forEach((el, i) => {
            el.addEventListener("click",(e)=>{
                hiddenAll();
                showCurrent(i);
                filter.renderCard(el);
            }); 
       });

       hiddenAll();
       showCurrent(0);

}