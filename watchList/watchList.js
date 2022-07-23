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
    toFinishBtn.addEventListener("click", () => {
        renderWatchList(unfinished);
    });

    const finishedBtn = document.querySelector(".completed");
    finishedBtn.addEventListener("click", () => {
        renderWatchList([]);
    });

    const bothBtn = document.querySelector(".all");
    bothBtn.addEventListener("click", () => {
        const tempArrayAll = unfinished.concat(finished);
        renderWatchList(tempArrayAll);
    });
}

renderWatchList(unfinished);
tabs();