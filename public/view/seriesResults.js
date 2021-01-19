import { rootRenderer, seriesViewRenderer, episodeRenderer, episodeNotFoundRenderer } from "./components.js"

export default function (searchResults) {
    rootRenderer()
    seriesViewRenderer()
    const title = history.state.id
    const season = history.state.id2
    const episode = history.state.id3
    
    // Code below (until line 13) has the objective of maintaing on screen the options chosen by the user, after the Search Button is pressed
    const titleInput = document.querySelector("#titleInput");
    titleInput.value = title.replaceAll("+", " ")
    const seasonInput = document.querySelector("#seasonInput");
    seasonInput.value = season
    const episodeInput = document.querySelector("#episodeInput");
    episodeInput.value = episode
    
    if (searchResults.Response === "False") {
        const resultsSection = document.querySelector("#resultsSection");
        resultsSection.innerHTML = "";
        episodeNotFoundRenderer(resultsSection)
    } else {
        episodeRenderer(searchResults)
    }
}