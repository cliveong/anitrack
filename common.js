import { allList } from "./scripts/IndividualDummyData.js";
import { anime1,anime2,anime3,anime4,manga1,manga2 } from "./scripts/IndividualDummyData.js";
import { renderInformation, renderTitle, renderScorebox, checkToDisplay } from "./scripts/infopage.js";
import { renderFilter, renderWatchList, tabs, checkToAdd, activateGo } from "./scripts/watchList.js";

let itemInfo = anime1;
let unfinished = [allList[0], allList[1], allList[2]/*, allList[5]*/];
let finished = [allList[3], allList[4]];
const both = unfinished.concat(finished);
let mode = 0;


const app = () => {
    const body = document.querySelector("body");
    const bodyId = body.id;
    getUnfinishedFinishedArray();
    switch (bodyId) {
        case "ip":
          screenWidth();
            pfCon2();
            infoPage();
            break;
        case "wl":
          screenWidth();
            pfCon();
            watchList();
            break;
    }

}

const screenWidth = () => {
  // let width = window.innerWidth;
  // let height = window.innerHeight;
  // let min = 9/16;
  // let max = (16/9)-(min);
  // let currentRatio = (width/height) - (9/16);
  // let calc1 = currentRatio / max;
  // let calc2 = 85 - (calc1 * 20);
   const content = document.querySelector(".content");
  // if (calc2 < 50) {
  //   calc2 = 50;
  // }
  // if (calc2 > 80) {
  //   calc2 = 80;
  // }
  // content.style.width = calc2 + "%";
  content.style.width = screen.width/2 + "px";

}

const infoPage = () => {
    itemInfo = checkToDisplay(itemInfo);
    renderInformation(itemInfo);
    renderTitle(itemInfo);
    renderScorebox(itemInfo)
    dropdownApi();
}

const watchList = () => {
    checkToAdd(unfinished);
    renderWatchList(unfinished, unfinished, finished, mode);
    renderFilter(unfinished);
    activateGo(unfinished, finished, mode);
    mode = tabs(unfinished, finished, mode);
    dropdownApi();
}

const getUnfinishedFinishedArray = () => {
    const getUnfinished = localStorage.getItem("unfinished");
    if (getUnfinished !== null) {
        unfinished = JSON.parse(getUnfinished);
    } else {
        localStorage.setItem("unfinished", JSON.stringify(unfinished));
    }
    const getFinished = localStorage.getItem("finished");
    if (getFinished !== null) {
        finished = JSON.parse(getFinished);
    } else {
        localStorage.setItem("finished", JSON.stringify(finished));
    }
}

//Lets profile picture and navbarlogo lead directly to watchlist
const pfCon = () => {
    const btn = document.querySelector(".profileContents");
    btn.addEventListener("click", () => {
        window.location.href = "./index.html";
    });
    const btn2 = document.querySelector(".logo");
    btn2.addEventListener("click", () => {
        window.location.href = "./index.html";
    });
}

const pfCon2 = () => {
  const btn = document.querySelector(".profileContents");
  btn.addEventListener("click", () => {
      location.href = "../index.html";
  });
  const btn2 = document.querySelector(".logo");
  btn2.addEventListener("click", () => {
      location.href = "../index.html";
  });
}

const dropdownApi = () => {
    const search = document.querySelector("#searchTitle");
    let timeout = null;
    search.addEventListener("keyup", () => {
        clearTimeout(timeout);
        timeout = setTimeout( () => {
            findOptions(search.value);
        }, 300);
        console.log(timeout);
    });
    search.addEventListener("focusout", () => {
        setTimeout( () => {
            const dropdown = document.querySelector("#searchData");
            dropdown.style.display = "none";
        }, 300);
        //const dropdown = document.querySelector("#searchData");
        //dropdown.style.display = "none";   

    });
}

const findOptions = (userInput) => {
    //console.log(userInput);
    let query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (id: $id, search: $search, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
              extraLarge
          }
          type
          status
          season
          seasonYear
          format
          episodes
          genres
          rankings {
            rank
          }
          countryOfOrigin
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          averageScore
          popularity
          chapters
          volumes
          description
          synonyms
          characters(page: 1, perPage: 6) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            edges {
              node { # The character data node
                id
                name {
                  first
                  last
                }
              }
              role
              voiceActors (language: JAPANESE) { # Array of voice actors of this character for the anime
                id
                name {
                  first
                  last
                }
              }
            }
          }
          reviews(page: 1, perPage: 6) {
            pageInfo {
              total
              perPage
              currentPage
              lastPage
              hasNextPage
            }
            edges {
              node {
                user {
                  name
                  avatar {
                    large
                  }
                }
                rating
                score
                summary
              }
            }
          }
          relations {
            edges {
              node {
                title {
                  english
                }
                id
                type
              }
            }
          }
        }
      }
    }
    `;

    // Define our query variables and values that will be used in the query request
    let variables = {
        search: userInput,
        page: 1,
        perPage: 10,
    };

    // Define the config we'll need for our Api request
    let url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);

    //Promises to handle data
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    //Adjust dropdown options size/pos base on search
    function handleData(data) {
        const dataArray = data.data.Page.media;
        const dropdown = document.querySelector("#searchData");
        const searchBar = document.querySelector("#searchTitle");
        const searchPos = searchBar.getBoundingClientRect();
        dropdown.style.top = searchPos.bottom+5 + "px";
        dropdown.style.left = searchPos.left + "px";
        dropdown.style.width = searchBar.offsetWidth-15 + "px";
        while(dropdown.hasChildNodes()) {
            dropdown.removeChild(dropdown.lastChild);
        };
        //if results
        if (dataArray.length > 0) {
            dataArray.forEach(element => generateOptions(element));
        } else {
            //remove dropdown if no search terms
            if (userInput.length < 1) {
                const dropdown = document.querySelector("#searchData");
                dropdown.style.display = "none";   
            } else {
                noResultsFound();
            }

        }
    }

    //if no anime/manga from search
    function noResultsFound() {
        const option = document.createElement("div");
        const optionRight = document.createElement("div");
        const optionRightUpper = document.createElement("div");
        optionRightUpper.textContent = "No results found";
        optionRight.appendChild(optionRightUpper);
        const optionRightLower = document.createElement("div");
        optionRightLower.textContent = "Try another search";
        optionRight.appendChild(optionRightLower);
        option.appendChild(optionRight);
        option.className = "searchOptions";
        const dropdown = document.querySelector("#searchData");
        dropdown.style.display = "block";
        dropdown.appendChild(option);

    }
    
    //populate the dropdown with pic and name
    function generateOptions(element) {
        const option = document.createElement("div");
        const optionLeft = document.createElement("div");
        let img = document.createElement("img");
        img.src = element.coverImage.extraLarge;
        optionLeft.appendChild(img);
        const optionRight = document.createElement("div");
        const optionRightUpper = document.createElement("div");
        let name = null;
        if (element.title.english) {
            name = element.title.english;
        } else if (element.title.romaji) {
            name = element.title.romaji;
        } else {
            name = element.title.native
        }
        optionRightUpper.textContent = name;
        optionRight.appendChild(optionRightUpper);
        const optionRightLower = document.createElement("div");
        optionRightLower.textContent = `${element.type}, ${element.startDate.year}`;
        optionRight.appendChild(optionRightLower);
        option.appendChild(optionLeft);
        option.appendChild(optionRight);
        option.className = "searchOptions";
        
        //click to view
        const itemCopy = JSON.parse(JSON.stringify(element));
        option.addEventListener("click", () => {
          console.log(12345);
          sessionStorage.setItem("toDis", JSON.stringify(itemCopy));
          const body = document.querySelector("body");
          const bodyId = body.id;
          window.location.href = "../html/informationPage.html";
          // console.log(bodyId);
          // switch (bodyId) {
          //   case "ip":
          //     window.location.href = "../html/informationPage.html";
          //     break;
          //   case "wl":
          //     console.log("./html/informationPage.html");
          //     window.location.href = "./html/informationPage.html";
          //     break;
          //}
        });
            
        const dropdown = document.querySelector("#searchData");
        dropdown.style.display = "block";
        dropdown.appendChild(option);
    }
    
    function handleError(error) {
        alert('Error, check console');
        console.error(error);
    }
};





app();