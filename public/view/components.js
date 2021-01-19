import { createChildElement, createOptionTag } from "./utils.js"

function rootRenderer() {
    const root = document.querySelector("#root");
    root.innerHTML = "";
    const aside = createChildElement("aside", "", root, "aside", "layer", "flex-column", "project-font");
    const divTitle = createChildElement("div", "", aside, "title", "flex-column");
    const home = createChildElement("h1", "", divTitle, "home", "pointer-aside");
    home.innerHTML = `M.V.C.<br>Movies Very Cool`
    const divMenu = createChildElement("div", "", aside, "menu", "flex-column");
    createChildElement("span", "Search Media by Title Name", divMenu, "search", "pointer-aside");
    createChildElement("span", "Search Series by Episode", divMenu, "series", "pointer-aside");
    const footer = createChildElement("footer", "", aside, "about-me", "flex-column");
    const about = createChildElement("a", "About OMDB API", footer, "omdb", "pointer-aside");
    about.setAttribute("href", "http://www.omdbapi.com/")
    about.setAttribute("target", "_blank")
    const main = createChildElement("main", "", root, "main", "layer-main");
}

function mediaRenderer(movie) {
    const main = document.querySelector("#main");
    main.innerHTML = "";
    main.classList.add("layer-card");
    const cardSection = createChildElement("section", "", main, "cardSection", "flex-column", "project-font", "height-and-width-100");
    const poster = createChildElement("img", "", cardSection, "bigMediaPoster");
    poster.imdbID = movie.imdbID;
    if (movie.Poster === "N/A") {
        poster.setAttribute("src", "https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound.jpg");
    } else { poster.setAttribute("src", movie.Poster) }
    poster.setAttribute("alt", "Poster not available!");
    createChildElement("h1", `${movie.Title} (${movie.Year})`, cardSection);
    createChildElement("h3", `Media Type: ${movie.Type}`, cardSection);
    createChildElement("h3", `Director: ${movie.Director}`, cardSection);
    createChildElement("h3", `Actors: ${movie.Actors}`, cardSection);
    if (movie.BoxOffice) {
        createChildElement("h3", `Box Office: ${movie.BoxOffice}`, cardSection);
    }
    createChildElement("h3", `Awards: ${movie.Awards}`, cardSection);
    if (movie.Ratings[1]) {
        createChildElement("h3", `Rotten Tomatoes Rating: ${movie.Ratings[1].Value} `, cardSection);
    }
    createChildElement("h3", `Plot: ${movie.Plot}`, cardSection);
}

function createSearchBar(parentElement) {
    const form = createChildElement("form", "", parentElement, "searchForm", "flex-column");
    createChildElement("h2", "Search Movies, Series and Games by Title", form, "", "short-margin-bottom");
    const div = createChildElement("div", "", form, "", "flex", "short-margin-bottom");
    const input = createChildElement("input", "", div, "searchInput");
    input.size = "41";
    input.placeholder = `e.g. "Batman" or "Jaws"`;
    const select = createChildElement("select", "", div, "selectDiv", "short-margin-left");
    createChildElement("option", "All Medias", select, "all")
    createChildElement("option", "Movies", select, "movie")
    createChildElement("option", "Series", select, "series")
    createChildElement("option", "Games", select, "game")
    createChildElement("button", "Search!", div, "searchButton", "search-button", "pointer", "short-margin-left");
    createChildElement("h5", "If the content found is above 10, blue arrows will appear for navigation (click on the posters for further info)", form, "", "short-margin-bottom");
}

function createPageIndex() {
    const form = document.querySelector("#searchForm")
    const pageElement = createChildElement("h5", "", form, "pageIndex");
    const page = history.state.id3
    if (page < 2 || page === undefined) {
        pageElement.textContent = "Page: 1"
    } else {
        pageElement.textContent = `Page: ${page}`
    }
}

function searchViewRenderer() {
    const main = document.querySelector("#main");
    const divLayer = createChildElement("div", "", main, "", "flex-column", "project-font", "height-and-width-100");
    const form = createSearchBar(divLayer);
    createChildElement("section", "", divLayer, "resultsSection", "flex-grow-1", "flex", "project-font", "height-and-width-100");
}

function createArrow(parentElement, id, direction) {
    const parent = document.querySelector(`#${parentElement}`);
    const arrowDiv = createChildElement("div", "", parent, "", "arrow-div");
    createChildElement("a", "", arrowDiv, id, "arrow", "pointer", `arrow-${direction}`)
}

function errorRenderer(parentElement) {
    const element = createChildElement("div", "", parentElement, "", "flex-column", "height-and-width-100");
    const innerElement = createChildElement("div", "", element, "", "flex-column", "layer-card", "height-and-width-px");
    const message = createChildElement("div", "", innerElement, "", "project-font")
    message.innerHTML = `CONTENT NOT FOUND! <br> Please return to the previous page or choose one of the options on the menu to the left!`
}

function createOptionsForm(parentElement) {
    const form = createChildElement("form", "", parentElement, "searchForm", "flex-column");
    const h2 = createChildElement("h2", "", form, "", "short-margin-bottom");
    h2.innerHTML = `Do you want to remember the plot from an episode of your favourite series?<br>Fill in the blanks below`
    const div = createChildElement("div", "", form, "", "flex-center", "short-margin-bottom");
    createChildElement("div", "Title: ", div, "", "text-align-center");
    const input = createChildElement("input", "", div, "titleInput", "short-margin-left", "series-plots-inputs");
    input.size = "30";
    input.placeholder = `e.g. "Breaking Bad" or "Lost"`;
    createChildElement("div", "Season: ", div, "", "short-margin-left");
    const seasonSelect = createChildElement("input", "", div, "seasonInput", "short-margin-left", "number-width", "series-plots-inputs");
    seasonSelect.type = "number";
    seasonSelect.setAttribute("min", 1);
    seasonSelect.setAttribute("step", 1);
    createChildElement("div", "Episode: ", div, "", "short-margin-left");
    const episodeSelect = createChildElement("input", "", div, "episodeInput", "short-margin-left", "number-width", "series-plots-inputs");
    episodeSelect.type = "number";
    episodeSelect.setAttribute("min", 1);
    episodeSelect.setAttribute("step", 1);
    createChildElement("button", "Search!", div, "plotButton", "search-button", "pointer", "short-margin-left");
}

function seriesViewRenderer() {
    const main = document.querySelector("#main");
    const divLayer = createChildElement("div", "", main, "", "flex-column", "project-font", "height-and-width-100");
    const form = createOptionsForm(divLayer, 8, 10);
    createChildElement("section", "", divLayer, "resultsSection", "flex-grow-1", "flex-column", "project-font", "height-and-width-100");
}

function episodeRenderer(episode) {
    const section = document.querySelector("#resultsSection");
    section.innerHTML = "";
    const cardSection = createChildElement("section", "", section, "", "flex-column-evenly", "project-font");
    createChildElement("h1", `Episode Title: ${episode.Title} (Season: ${episode.Season}, Episode: ${episode.Episode})`, cardSection);
    const poster = createChildElement("img", "", cardSection, "", "episode-poster");
    poster.setAttribute("src", episode.Poster);
    poster.setAttribute("alt", "Poster not available!");
    createChildElement("h3", `Plot: ${episode.Plot}`, cardSection);
}

function searchAlertRenderer(parentElement) {
    const element = createChildElement("div", "", parentElement, "", "flex-column", "height-and-width-100");
    const innerElement = createChildElement("div", "", element, "", "flex-column", "layer-card", "height-and-width-px");
    const message = createChildElement("div", "", innerElement, "", "project-font")
    message.innerHTML = `Please fill in <strong>all</strong> the entries above before clicking the "Search" button!`
}

function mediaNotFoundRenderer(parentElement) {
    const element = createChildElement("div", "", parentElement, "", "flex-column", "height-and-width-100");
    const innerElement = createChildElement("div", "", element, "", "flex-column", "layer-card", "height-and-width-px");
    const message = createChildElement("div", "", innerElement, "", "project-font")
    message.innerHTML = `Content not found! <br> Please try a different title entry or a different media type.`
}

function episodeNotFoundRenderer(parentElement) {
    const element = createChildElement("div", "", parentElement, "", "flex-column", "height-and-width-100");
    const innerElement = createChildElement("div", "", element, "", "flex-column", "layer-card", "height-and-width-px");
    const message = createChildElement("div", "", innerElement, "", "project-font")
    message.innerHTML = `Content not found! <br> Please try a different title entry, or, if you were already checking an especific TV Show,<br> the Season or Episode chosen does not exist.`
}

function postsRenderer(data, parentElement, optionalClass) {
    const element = document.querySelector(`#${parentElement}`);
    const div = createChildElement("div", "", element, "posterDiv");
    const poster = createChildElement("img", "", div, "mediaPoster", "posters", optionalClass);
    poster.imdbID = data.imdbID
    if (data.Poster === "N/A") {
        poster.setAttribute("src", "https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound.jpg");
    } else { poster.setAttribute("src", data.Poster) }
    poster.setAttribute("alt", "Poster not available!");
    createChildElement("div", data.Title, div, "posterTitles", "poster-title");
}

export { createSearchBar, searchViewRenderer, rootRenderer, mediaRenderer, createArrow, createPageIndex, errorRenderer, createOptionsForm, seriesViewRenderer, episodeRenderer, searchAlertRenderer, episodeNotFoundRenderer, mediaNotFoundRenderer, postsRenderer }