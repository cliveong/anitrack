//Generate poster image and banner image of selected anime
const renderTitle = (itemInfo) => {
    const picture = itemInfo.coverImage.extraLarge;
    let name = null;
    if (itemInfo.title.english) {
        name = itemInfo.title.english;
    } else if (itemInfo.title.romaji) {
        name = itemInfo.title.romaji;
    } else {
        name = itemInfo.title.native
    }

    const mainPic = document.querySelector(".titlePic");
    mainPic.src = picture;

    const backgroundPic = document.querySelector(".description");
    backgroundPic.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.8), 
    rgba(0, 0, 0, 0.8) ), url(${picture})`;

    const title = document.querySelector(".itemTitle");
    title.textContent = name;

    addBtnLogic(itemInfo);
}

const addBtnLogic = (itemInfo) => {
    const btn = document.querySelector(".addToWatchList");
    const unfinished = localStorage.getItem("unfinished");
    const finished = localStorage.getItem("finished");
    
    if (itemInfo.type === "ANIME") {
        btn.textContent = "Add to watchlist";
    } else {
        btn.textContent = "Add to readlist";
    }
    if(unfinished !== null) {
        const unfinishedList = JSON.parse(unfinished);
        for (let i = 0; i < unfinishedList.length; i++) {
            if (unfinishedList[i].id === itemInfo.id) {
                if (itemInfo.type === "ANIME") {
                    btn.textContent = "Added to watchlist";
                } else {
                    btn.textContent = "Added to readlist";
                }
            }
        }
    }

    if (finished !== null) {
        const finishedList = JSON.parse(finished);
        for (let i = 0; i < finishedList.length; i++) {
            if (finishedList[i].id === itemInfo.id) {
                if (itemInfo.type === "ANIME") {
                    btn.textContent = "Added to watchlist";
                } else {
                    btn.textContent = "Added to readlist";
                }
            }
        }
    }
    
    btn.addEventListener("click", () => {
        if (btn.textContent.substring(0,5) === "Added") {
            return;
        } 
        sessionStorage.setItem("toAdd", JSON.stringify(itemInfo));
        if (itemInfo.type === "ANIME") {
            btn.textContent = "Added to watchlist";
        } else {
            btn.textContent = "Added to readlist";
        }
    })
}


//Adds the synopsis of content
const renderInformation = (itemInfo) => {
    const summary =  itemInfo.description;
    const synopsis = document.querySelector(".synopsis");
    synopsis.innerHTML = summary;

    generateGenres(itemInfo);
    generateRelations(itemInfo);
}

//Adds the genres of content
const generateGenres = (itemInfo) => {
    const genreList =  itemInfo.genres;
    const genres = document.querySelector(".genres");

    for(let i = 0; i < genreList.length; i++) {
        const genreBars = document.createElement("div");
        genreBars.textContent = genreList[i];
        genreBars.className = "genreBars";
        genres.appendChild(genreBars);
    }
}

//Adds the relate manga/anime/source of content
const generateRelations = (itemInfo) => {
    const relationsList = itemInfo.relations.edges;
    const relations = document.querySelector(".relations");

    for(let i = 0; i < relationsList.length; i++) {
        const relationsTemp = document.createElement("div");
        relationsTemp.textContent = relationsList[i].node.title.english;
        relations.appendChild(relationsTemp);
    }
};

//Adds the misc info of content, content options changes
//based on type (anime, manga)
const renderScorebox = (itemInfo) => {
    const score = document.querySelector(".score");
    const ranked = document.querySelector(".ranked");
    const popularity = document.querySelector(".popularity");
    const episodes = document.querySelector(".episodes");
    const status = document.querySelector(".status");
    const aired = document.querySelector(".aired");
    const season = document.querySelector(".season");
    const format = document.querySelector(".format");
    const synonyms = document.querySelector(".synonyms");
    const volumes = document.querySelector(".volumes");
    const chapters = document.querySelector(".chapters");
    
    const itemScore = itemInfo.averageScore;
    let itemRanked = null;
    if (itemInfo.rankings.length > 0) {
        itemRanked = itemInfo.rankings[0].rank;
    } else {
        itemRanked = "Unknown";
    }
    const itemPopularity = itemInfo.popularity + " members";
    const itemEpisodes = itemInfo.episodes;
    const itemStatus = itemInfo.status;
    const itemStartDate = itemInfo.startDate.day + "-" 
    + itemInfo.startDate.month + "-" + itemInfo.startDate.year;
    const itemEndDate = itemInfo.endDate.day + "-" 
    + itemInfo.endDate.month  + "-" + itemInfo.endDate.year;
    const itemSeason = itemInfo.season + " " + itemInfo.seasonYear;
    const itemFormat = itemInfo.format;
    const itemVolumes = itemInfo.volumes;
    const itemChapters = itemInfo.chapters;

    if (itemInfo.type === "ANIME") {
        score.style.display = "block";
        ranked.style.display = "block";
        popularity.style.display = "block";
        episodes.style.display = "block";
        status.style.display = "block";
        aired.style.display = "block";
        season.style.display = "block";
        format.style.display = "block";
        volumes.style.display = "none";
        chapters.style.display = "none";
        synonyms.style.display = "block";

        score.textContent = "Score: " + itemScore;
        ranked.textContent = "Ranked: #" + itemRanked;
        popularity.textContent = "Popularity: " + itemPopularity;
        episodes.textContent = "Episodes: " + itemEpisodes;
        status.textContent = "Status: " + itemStatus;
        if (itemStatus === "FINISHED") {
            aired.textContent = "Aired: " + itemStartDate + " to "
            + itemEndDate;
        } else {
            aired.textContent = "Aired: " + itemStartDate + " to current";
        }
        season.textContent = "Season: " + itemSeason;
        format.textContent = "Format: " + itemFormat;

        let synoCollection = "Synonyms: ";
        for (let i = 0; i < itemInfo.synonyms.length; i++) {
            if (i < 1) {
                synoCollection = synoCollection + itemInfo.synonyms[i];
            } else {
                synoCollection = synoCollection + ", " + itemInfo.synonyms[i];
            }
        }
        if (synoCollection.length > itemInfo.synonyms.length) {
            synonyms.textContent = synoCollection
        }

    } else {
        score.style.display = "block";
        ranked.style.display = "block";
        popularity.style.display = "block";
        episodes.style.display = "none";
        status.style.display = "block";
        aired.style.display = "block";
        season.style.display = "none";
        format.style.display = "block";
        volumes.style.display = "block";
        chapters.style.display = "block";
        synonyms.style.display = "block";

        score.textContent = "Score: " + itemScore;
        ranked.textContent = "Ranked: #" + itemRanked;
        popularity.textContent = "Popularity: " + itemPopularity;
        status.textContent = "Status: " + itemStatus;
        if (itemStatus === "FINISHED") {
            aired.textContent = "Published: " + itemStartDate + " to "
            + itemEndDate;
        } else {
            aired.textContent = "Published: " + itemStartDate + " to current";
        }
        season.textContent = "Season: " + itemSeason;
        format.textContent = "Format: " + itemFormat;

        let synoCollection = "Synonyms: ";
        for (let i = 0; i < itemInfo.synonyms.length; i++) {
            if (i < 1) {
                synoCollection = synoCollection + itemInfo.synonyms[i];
            } else {
                synoCollection = synoCollection + ", " + itemInfo.synonyms[i];
            }
        }
        if (synoCollection.length > itemInfo.synonyms.length) {
            synonyms.textContent = synoCollection
        }
        volumes.textContent = "Volumes: " + itemVolumes;
        chapters.textContent = "Chapters: " + itemChapters;
    }

}

const checkToDisplay = (itemInfo) => {
    const item = sessionStorage.getItem("toDis");
    console.log(item);
    if (item !== null && item !== "null") {
        return JSON.parse(item);
    }
    return itemInfo;
}

export { renderTitle, renderInformation, renderScorebox, checkToDisplay};