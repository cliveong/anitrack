import { anime1,anime2,anime3,anime4,manga1,manga2 } from "../IndividualDummyData.js";

const itemInfo = anime3;
console.log(itemInfo);

const renderTitle = () => {
    const picture = itemInfo.coverImage.extraLarge;
    const name = itemInfo.title.english;

    const mainPic = document.querySelector(".titlePic");
    mainPic.src = picture;

    const backgroundPic = document.querySelector(".description");
    backgroundPic.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${picture})`;

    const title = document.querySelector(".itemTitle");
    title.textContent = name;

    const btn = document.querySelector(".addToWatchList");
    if (itemInfo.type === "ANIME") {
        btn.textContent = "Add to watchlist";
    } else {
        btn.textContent = "Add to readlist";
    }
    btn.addEventListener("click", () => {
        if (itemInfo.type === "ANIME") {
            btn.textContent = "Added to watchlist";
        } else {
            btn.textContent = "Added to readlist";
        }
    })
}

const renderInformation = () => {
    const summary =  itemInfo.description;
    //const newSummary = summary.replaceAll("<br>", " ");
    const synopsis = document.querySelector(".synopsis");
    synopsis.innerHTML = summary;

    generateGenres();
    generateRelations();
}

const generateGenres = () => {
    const genreList =  itemInfo.genres;
    const genres = document.querySelector(".genres");

    for(let i = 0; i < genreList.length; i++) {
        const genreBars = document.createElement("div");
        genreBars.textContent = genreList[i];
        genreBars.className = "genreBars";
        genres.appendChild(genreBars);
    }
}

const generateRelations = () => {
    const relationsList = itemInfo.relations.edges;
    const relations = document.querySelector(".relations");

    for(let i = 0; i < relationsList.length; i++) {
        const relationsTemp = document.createElement("div");
        relationsTemp.textContent = relationsList[i].node.title.english;
        relations.appendChild(relationsTemp);
    }
};

const renderScorebox = () => {
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
    const itemRanked = itemInfo.rankings[0].rank;
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
    //const itemSynonyms = itemInfo.synonyms

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

renderTitle();
renderInformation();
renderScorebox();