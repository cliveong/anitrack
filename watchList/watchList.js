import { allList } from "../IndividualDummyData.js";

const renderWatchList = (items) => {
    const listing = document.querySelector(".watchListThumbNail");
    while(listing.hasChildNodes()) {
        listing.removeChild(listing.lastChild);
    }

    for(let i = 0; i < allList.length; i++) {
        const container = document.createElement('div');
        const img = new Image();
        img.src = allList[i].coverImage.extraLarge;
        container.appendChild(img);
        const readBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        const markAsFinishBtn = document.createElement("button");
        readBtn.className = "hover view";
        readBtn.textContent = "View"
        deleteBtn.className = "hover delete";
        deleteBtn.textContent = "Delete"
        markAsFinishBtn.className = "hover read";
        if(allList[i].type === 'ANIME') {
            markAsFinishBtn.textContent = "Mark as watched";
        } else {
            markAsFinishBtn.textContent = "Mark as read";
        }

        container.appendChild(readBtn);
        container.appendChild(deleteBtn);
        container.appendChild(markAsFinishBtn);
        listing.appendChild(container);
    }


}
renderWatchList(allList);