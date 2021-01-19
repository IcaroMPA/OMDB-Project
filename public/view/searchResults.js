import { postsRenderer, rootRenderer, searchViewRenderer, createArrow, createPageIndex, mediaNotFoundRenderer } from "../view/components.js"
import { getPage } from "./utils.js"
import { goTo } from "../navigation.js"
import { ROUTES } from "../routes.js"

export default function (searchResults) {
    rootRenderer();
    searchViewRenderer();
    createPageIndex();
    const mediaName = history.state.id;
    const mediaType = history.state.id2;
    const page = history.state.id3;

    // Code below has the objective of maintaing on screen the options chosen by the user, after the Search Button is pressed
    const mediaNameInput = document.querySelector("#searchInput");
    mediaNameInput.value = mediaName.replaceAll("+", " ");
    const mediaTypeInput = document.querySelector("#selectDiv");
    switch (mediaType) {
        case "all":
            mediaTypeInput[0].selected = true
            break
        case "movie":
            mediaTypeInput[1].selected = true
            break
        case "series":
            mediaTypeInput[2].seleted = true
            break
        case "game":
            mediaTypeInput[3].selected = true
            break
    }

    if (searchResults.Response === "False") {
        const resultsSection = document.querySelector("#resultsSection");
        resultsSection.innerHTML = "";
        mediaNotFoundRenderer(resultsSection)
    } else {
        // Code for arrow and posters rendering, after the content has been searched by the user.
        if (searchResults.Search.length === 10) {
            if (page >= 2) {
                createArrow("resultsSection", "arrow-prev", "left");
            }
            searchResults.Search.forEach((movie) => {
                postsRenderer(movie, "resultsSection", "searched-posters");
            })
            createArrow("resultsSection", "arrow-next", "right");
        } else if (page >= 2 && searchResults.Search.length !== 10) {
            createArrow("resultsSection", "arrow-prev", "left");
            searchResults.Search.forEach((movie) => {
                postsRenderer(movie, "resultsSection", "searched-posters");
            })
        } else {
            searchResults.Search.forEach((movie) => {
                postsRenderer(movie, "resultsSection", "searched-posters");
            })
        }
    }
}

window.addEventListener("click", (e) => {
    function changePage(addPage) {
        const mediaName = history.state.id;
        const mediaType = history.state.id2;
        let page = getPage();
        page += addPage;
        goTo(`${ROUTES.SEARCH}/${mediaName}/Type=${mediaType}/${page}`);
    }
    if (e.target.id === "arrow-prev") {
        e.preventDefault();
        changePage(-1);
    } else if (e.target.id === "arrow-next") {
        e.preventDefault();
        changePage(+1);
    }
})