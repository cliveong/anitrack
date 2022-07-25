import { allList } from "../IndividualDummyData.js";

const unfinished = allList;
const finished = [];

const renderWatchList = (items) => {
    const listing = document.querySelector(".watchListThumbNail");
    while(listing.hasChildNodes()) {
        listing.removeChild(listing.lastChild);
    }

    for(let i = 0; i < items.length; i++) {
        const container = document.createElement('div');
        const img = new Image();
        img.src = items[i].coverImage.extraLarge;
        container.appendChild(img);
        const readBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const markAsFinishBtn = document.createElement("button");
        readBtn.className = "hover view";
        readBtn.textContent = "View"
        deleteBtn.className = "hover delete";
        deleteBtn.textContent = "Delete"
        markAsFinishBtn.className = "hover read";
        if(items[i].type === 'ANIME') {
            markAsFinishBtn.textContent = "Mark as watched";
        } else {
            markAsFinishBtn.textContent = "Mark as read";
        }

        container.appendChild(readBtn);
        container.appendChild(deleteBtn);
        container.appendChild(markAsFinishBtn);
        listing.appendChild(container);
    }

    console.log(123);

}

const tabs = () => {
    const toFinishBtn = document.querySelector(".toFinish");
    const finishedBtn = document.querySelector(".completed");
    const bothBtn = document.querySelector(".all");
    const largeText = "1.8rem";
    const normalText = "1.3rem";
    const largePadding = "10px 10px";
    const normalPadding = "16px 16px";
    const largeBgColor = "gray";
    const normBgColor = "#2C2C2C";

    toFinishBtn.addEventListener("click", () => {
        renderWatchList(unfinished);
        toFinishBtn.style.fontSize = largeText;
        toFinishBtn.style.padding = largePadding;
        toFinishBtn.style.backgroundColor = largeBgColor;
        finishedBtn.style.fontSize = normalText;
        finishedBtn.style.padding = normalPadding;
        finishedBtn.style.backgroundColor = normBgColor;
        bothBtn.style.fontSize = normalText;
        bothBtn.style.padding = normalPadding;
        bothBtn.style.backgroundColor = normBgColor;

    });

    finishedBtn.addEventListener("click", () => {
        renderWatchList([]);
        toFinishBtn.style.fontSize = normalText;
        toFinishBtn.style.padding = normalPadding;
        toFinishBtn.style.backgroundColor = normBgColor;
        finishedBtn.style.fontSize = largeText;
        finishedBtn.style.padding = largePadding;
        finishedBtn.style.backgroundColor = largeBgColor;
        bothBtn.style.fontSize = normalText;
        bothBtn.style.padding = normalPadding;
        bothBtn.style.backgroundColor = normBgColor;
    });

    bothBtn.addEventListener("click", () => {
        const tempArrayAll = unfinished.concat(finished);
        renderWatchList(tempArrayAll);
        toFinishBtn.style.fontSize = normalText;
        toFinishBtn.style.padding = normalPadding;
        toFinishBtn.style.backgroundColor = normBgColor;
        finishedBtn.style.fontSize = normalText;
        finishedBtn.style.padding = normalPadding;
        finishedBtn.style.backgroundColor = normBgColor;
        bothBtn.style.fontSize = largeText;
        bothBtn.style.padding = largePadding;
        bothBtn.style.backgroundColor = largeBgColor;
    });
}

renderWatchList(unfinished);
tabs();