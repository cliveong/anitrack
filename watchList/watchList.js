import { allList } from "../IndividualDummyData.js";

const unfinished = [allList[0], allList[1], allList[2], allList[5]];
const finished = [allList[3], allList[4]];
const both = unfinished.concat(finished);
let mode = 0;

//Render thumbnails in the watchlist based on list of "items"
const renderWatchList = (items) => {

    //Remove all current thumbnails
    const listing = document.querySelector(".watchListThumbNail");
    while(listing.hasChildNodes()) {
        listing.removeChild(listing.lastChild);
    }

    //Generate thumbnails based on list and add onhover buttons
    //TODO: Add eventlistener for buttons
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
}

//Switchable tabs based on watch/read status 
//(finished, unfinished, all etc)
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

    //Renders the appropriate list and filters
    //Changes styling to highlight selected
    toFinishBtn.addEventListener("click", () => {
        renderWatchList(unfinished);
        renderFilter(unfinished);
        mode = 0;
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
        renderWatchList(finished);
        renderFilter(finished);
        mode = 1;
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
        renderWatchList(both);
        renderFilter(both);
        mode = 2;
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


//Populate the filter panel base on 
//whats currently in the generated list
const renderFilter = (items) => {
    filterYear(items);
    filterGenres(items); 
}

//Finds all years avail for filtering
const filterYear = (items) => {
    
    //Remove existing options
    const yearsAvail = document.querySelector("#yearSelect");
    yearsAvail.length = 0;
    
    //Adds an all option
    const tempDiv = document.createElement('option');
    tempDiv.textContent = "All";
    tempDiv.value = "All";
    yearsAvail.appendChild(tempDiv);
    

    //Finds list of years avail, prevents duplicates
    let tempYearList = [];
    for (let i = 0; i < items.length; i++) {
        if(!(items[i].seasonYear === null)) {
            if (!tempYearList.includes(items[i].seasonYear)) {
                tempYearList.push(items[i].seasonYear);
            }           
        }
    }

    //sort by year then added as options
    tempYearList.sort();
    for (let j = 0; j < tempYearList.length; j++) {
        const tempDiv = document.createElement('option');
        tempDiv.textContent = tempYearList[j];
        tempDiv.value = tempYearList[j];
        yearsAvail.appendChild(tempDiv);  
    }
}

//Finds all genres avail for filtering
const filterGenres = (items) => {

    //Remove all current options
    const genresAvail = document.querySelector(".genreSelectors");
    while(genresAvail.hasChildNodes()) {
        genresAvail.removeChild(genresAvail.lastChild);
    }
    
    //Finds list of genres avail, prevents duplicates
    let tempGenreList = [];
    for (let i = 0; i < items.length; i++) {
        if(!(items[i].genres === null) || (items[i].genres.length > 0)) {
            for (let k = 0; k < items[i].genres.length; k++) {
                if (!tempGenreList.includes(items[i].genres[k])) {
                    tempGenreList.push(items[i].genres[k]);
                }           
            }
        }
    }
    
    //Sort by year then added as options with checkbox
    // and label
    tempGenreList.sort();
    for (let j = 0; j < tempGenreList.length; j++) {
        const tempDiv = document.createElement('div');
        const tempInput = document.createElement('input');
        const tempLabel = document.createElement('label');
        tempInput.type = "checkbox";
        tempInput.name = tempGenreList[j];
        tempInput.id = tempGenreList[j];
        tempLabel.htmlFor = tempGenreList[j];
        tempLabel.textContent = tempGenreList[j];

        tempDiv.appendChild(tempInput);
        tempDiv.appendChild(tempLabel);
        genresAvail.appendChild(tempDiv);  
    }
}

const filterLogic = (mode) => {

}


renderWatchList(unfinished);
renderFilter(unfinished);
tabs();