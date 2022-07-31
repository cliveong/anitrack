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
        container.className = "a" + items[i].id;
        const img = new Image();
        img.src = items[i].coverImage.extraLarge;
        container.appendChild(img);
        const viewBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        viewBtn.className = "hover view";
        viewBtn.textContent = "View"
        deleteBtn.className = "hover delete";
        deleteBtn.textContent = "Delete"
        
        deleteBtn.addEventListener("click", () => {
            deleteListing(container.className);
        });

        container.appendChild(viewBtn);
        container.appendChild(deleteBtn);

        const unfinishedIdList = unfinished.map(element => element.id);
        if (unfinishedIdList.includes(items[i].id)) {
            const markAsFinishBtn = document.createElement("button");
            markAsFinishBtn.className = "hover read";
            if(items[i].type === 'ANIME') {
                markAsFinishBtn.textContent = "Mark as watched";
            } else {
                markAsFinishBtn.textContent = "Mark as read";
            }
            
            markAsFinishBtn.addEventListener("click", () => {
                markAsFinishListing(container.className);
            })

            container.appendChild(markAsFinishBtn);
        }

        listing.appendChild(container);
    }
}

//Remove item from watchlist and delete dom element
const deleteListing = (listingId) => {
    console.log(listingId);
    const listing = document.querySelector(`.${listingId}`);
    listing.parentElement.removeChild(listing);
    for(let i = 0; i < finished.length; i++) {
        if (finished[i].id === Number(listingId.substring(1))) {
            finished.splice(i, 1);
        }
    }
    for(let j = 0; j < unfinished.length; j++) {
        if (unfinished[j].id === Number(listingId.substring(1))) {
            unfinished.splice(j, 1);
        }
    }
    for(let k = 0; k < both.length; k++) {
        if (both[k].id === Number(listingId.substring(1))) {
            both.splice(k, 1);
        }
    }
}

//Mark item as read watchlist and update dom element
const markAsFinishListing = (listingId) => {
    if (mode === 0) {
        const listing = document.querySelector(`.${listingId}`);
        listing.parentElement.removeChild(listing);
    } else {
        const listing = document.querySelector(`.${listingId} > .read`);
        listing.parentElement.removeChild(listing);
    }
    for(let j = 0; j < unfinished.length; j++) {
        if (unfinished[j].id === Number(listingId.substring(1))) {
            finished.push(unfinished[j]);
            unfinished.splice(j, 1);
        }
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

//Adds event listener to Go button and invokes immediately
(function() {
    const goBtn = document.querySelector("#go");
    goBtn.addEventListener("click", () => {
        filterLogic(mode);
    })
}())

//Finds matching data based on user selected filters
//Activates on "Go"
const filterLogic = (mode) => {
    let copy = null;

    //Sets the tempcopy to filter
    //Note this only makes a shallow copy
    if (mode === 0) {
        copy = unfinished;
    } else if (mode === 1) {
        copy = finished;
    } else {
        copy = both;
    }
    const arrayOfFilters =  document.querySelectorAll("input[type=checkbox]");
    
    //Filter by Anime/Manga
    if (arrayOfFilters[0].checked && arrayOfFilters[1].checked) {
        //no need filter
    } else if (arrayOfFilters[0].checked) {
        copy = copy.filter(element => element.type === "ANIME");
    } else {
        copy = copy.filter(element => element.type === "MANGA");
    }
    
    //Check if any item in 1 list exist in another
    const anyInList = (objectGenres, listOfGenres) => {
        for(let i = 0; i < objectGenres.length; i++) {
            if (listOfGenres.includes(objectGenres[i])) {
                return true;
            }
        }
        return false;
    }

    //Filter by genres
    let allGenresChosen = [];
    if (arrayOfFilters.length > 2) {
        for(let i = 0; i < arrayOfFilters.length; i++) {
            if (!allGenresChosen.includes(arrayOfFilters[i].id) &&
                arrayOfFilters[i].checked) {
                allGenresChosen.push(arrayOfFilters[i].id);
            }
        }

        copy = copy.filter(element => anyInList(element.genres, allGenresChosen));
        console.log(copy);
        console.log(unfinished);
    }

    renderWatchList(copy);

}


renderWatchList(unfinished);
renderFilter(unfinished);
tabs();