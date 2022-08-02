import { allList } from "../IndividualDummyData.js";
import { anime1,anime2,anime3,anime4,manga1,manga2 } from "../IndividualDummyData.js";
import { renderInformation, renderTitle, renderScorebox, checkToDisplay } from "./information page/script.js";
import { renderFilter, renderWatchList, tabs, activateGo, checkToAdd } from "./watchList/watchList.js";

let itemInfo = anime1;
let unfinished = [allList[0], allList[1], allList[2]/*, allList[5]*/];
let finished = [allList[3], allList[4]];
const both = unfinished.concat(finished);
let mode = 0;


const app = () => {
    const body = document.querySelector("body");
    const bodyId = body.id;
    getUnfinishedFinishedArray();
    pfCon();
    switch (bodyId) {
        case "ip":
            infoPage();
        case "wl":
            watchList();
    }

}

const infoPage = () => {
    itemInfo = checkToDisplay(itemInfo);
    renderInformation(itemInfo);
    renderTitle(itemInfo);
    renderScorebox(itemInfo)
}

const watchList = () => {
    checkToAdd(unfinished);
    renderWatchList(unfinished, unfinished, finished);
    renderFilter(unfinished);
    tabs(unfinished, finished, both, mode);
    activateGo(unfinished, finished, both, mode);
}

const getUnfinishedFinishedArray = () => {
    //console.log(JSON.parse(JSON.stringify(unfinished)));
    const getUnfinished = localStorage.getItem("unfinished");
    if (getUnfinished !== null) {
        unfinished = JSON.parse(getUnfinished);
    } else {
        //unfinished = [];
    }
    const getFinished = localStorage.getItem("finished");
    if (getFinished !== null) {
        finished = JSON.parse(getFinished);
    } else {
        //finished = [];
    }
}

const pfCon = () => {
    const btn = document.querySelector(".profile");
    btn.addEventListener("click", () => {
        location.href = "../watchList/watchList.html";
    })
}

app();