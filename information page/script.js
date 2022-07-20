const itemInfo = 
{
    "id": 110229,
    "title": {
        "romaji": "Bokutachi wa Benkyou ga Dekinai!",
        "english": "We Never Learn!: BOKUBEN Season 2",
        "native": "ぼくたちは勉強ができない！"
    },
    "coverImage": {
        "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx110229-uBjHp2cbXYVL.jpg"
    },
    "type": "ANIME",
    "status": "FINISHED",
    "season": "FALL",
    "seasonYear": 2019,
    "format": "TV",
    "episodes": 13,
    "genres": [
        "Comedy",
        "Ecchi",
        "Romance",
        "Slice of Life"
    ],
    "rankings": [
        {
            "rank": 48
        },
        {
            "rank": 44
        },
        {
            "rank": 15
        },
        {
            "rank": 12
        }
    ],
    "countryOfOrigin": "JP",
    "startDate": {
        "year": 2019,
        "month": 10,
        "day": 6
    },
    "endDate": {
        "year": 2019,
        "month": 12,
        "day": 29
    },
    "averageScore": 72,
    "popularity": 51097,
    "chapters": null,
    "volumes": null,
    "description": "To get a scholarship, Nariyuki becomes a reluctant tutor to three unteachable girls. He must quickly make an art-lover adore mathematics, turn a literary genius into a bonafide scientist, and transform a top-tier athlete into a passing student.<br><br>(Source: HIDIVE)",
    "synonyms": [
        "BokuBen 2",
        "We Never Learn 2",
        "Boku-tachi wa Benkyou ga Dekinai 2nd Season",
        "Boku-tachi wa Benkyou ga Dekinai!",
        "เรื่องนี้ตําราไม่มีสอน ภาค 2"
    ],
    "characters": {
        "pageInfo": {
            "total": 500,
            "perPage": 6,
            "currentPage": 1,
            "lastPage": 83,
            "hasNextPage": true
        },
        "edges": [
            {
                "node": {
                    "id": 121775,
                    "name": {
                        "first": "Fumino",
                        "last": "Furuhashi"
                    }
                },
                "role": "MAIN",
                "voiceActors": [
                    {
                        "id": 112629,
                        "name": {
                            "first": "Haruka",
                            "last": "Shiraishi"
                        }
                    }
                ]
            },
            {
                "node": {
                    "id": 125599,
                    "name": {
                        "first": "Asumi",
                        "last": "Kominami"
                    }
                },
                "role": "MAIN",
                "voiceActors": [
                    {
                        "id": 119812,
                        "name": {
                            "first": "Madoka",
                            "last": "Asahina"
                        }
                    }
                ]
            },
            {
                "node": {
                    "id": 125600,
                    "name": {
                        "first": "Mafuyu",
                        "last": "Kirisu"
                    }
                },
                "role": "MAIN",
                "voiceActors": [
                    {
                        "id": 118806,
                        "name": {
                            "first": "Lynn",
                            "last": ""
                        }
                    }
                ]
            },
            {
                "node": {
                    "id": 121778,
                    "name": {
                        "first": "Uruka",
                        "last": "Takemoto"
                    }
                },
                "role": "MAIN",
                "voiceActors": [
                    {
                        "id": 126963,
                        "name": {
                            "first": "Sayumi",
                            "last": "Suzushiro"
                        }
                    }
                ]
            },
            {
                "node": {
                    "id": 129715,
                    "name": {
                        "first": "Mizuki",
                        "last": "Yuiga"
                    }
                },
                "role": "SUPPORTING",
                "voiceActors": [
                    {
                        "id": 119383,
                        "name": {
                            "first": "Marika",
                            "last": "Kouno"
                        }
                    }
                ]
            },
            {
                "node": {
                    "id": 121777,
                    "name": {
                        "first": "Nariyuki",
                        "last": "Yuiga"
                    }
                },
                "role": "MAIN",
                "voiceActors": [
                    {
                        "id": 110743,
                        "name": {
                            "first": "Ryouta",
                            "last": "Oosaka"
                        }
                    }
                ]
            }
        ]
    },
    "reviews": {
        "pageInfo": {
            "total": 1,
            "perPage": 6,
            "currentPage": 1,
            "lastPage": 1,
            "hasNextPage": false
        },
        "edges": [
            {
                "node": {
                    "user": {
                        "name": "omniumx",
                        "avatar": {
                            "large": "https://s4.anilist.co/file/anilistcdn/user/avatar/large/b426989-P2tgnNyQcL7t.png"
                        }
                    },
                    "rating": 16,
                    "score": 80,
                    "summary": "Harem rom-com anime where the girls never learn."
                }
            }
        ]
    },
    "relations": {
        "edges": [
            {
                "node": {
                    "title": {
                        "english": "We Never Learn: BOKUBEN"
                    },
                    "id": 103900,
                    "type": "ANIME"
                }
            },
            {
                "node": {
                    "title": {
                        "english": "We Never Learn"
                    },
                    "id": 98235,
                    "type": "MANGA"
                }
            },
            {
                "node": {
                    "title": {
                        "english": "We Never Learn OVAs"
                    },
                    "id": 109492,
                    "type": "ANIME"
                }
            }
        ]
    }
}

const renderTitle = () => {
    const picture = itemInfo.coverImage.extraLarge;
    const name = itemInfo.title.english;

    const mainPic = document.querySelector(".titlePic");
    mainPic.src = picture;

    const backgroundPic = document.querySelector(".description");
    backgroundPic.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${picture})`;

    const title = document.querySelector(".itemTitle");
    title.textContent = name;
}

const renderInformation = () => {
    const summary =  itemInfo.description;
    const newSummary = summary.replaceAll("<br>", " ");
    const synopsis = document.querySelector(".synopsis");
    synopsis.textContent = newSummary;

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
            synoCollection = synoCollection + ", " + itemInfo.synonyms[i];
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
            synoCollection = synoCollection + ", " + itemInfo.synonyms[i];
        }
        if (synoCollection.length > itemInfo.synonyms.length) {
            synonyms.textContent = synoCollection
        }
        volumes.textContent = itemVolumes;
        chapters.textContent = itemChapters;
    }

}

renderTitle();
renderInformation();
renderScorebox();