import { rootRenderer, seriesViewRenderer, searchAlertRenderer } from "./components.js"
import { goTo } from "../navigation.js"
import { ROUTES } from "../routes.js"

export default function () {
    rootRenderer()
    seriesViewRenderer()
}

window.addEventListener("click", (e) => {
    if (e.target.id === "plotButton") {
        e.preventDefault()
        const titleTag = document.querySelector("#titleInput")
        const titleWithWhitespace = titleTag.value
        const title = titleWithWhitespace.replaceAll(" ", "+")
        const seasonTag = document.querySelector("#seasonInput")
        const season = seasonTag.value
        const episodeTag = document.querySelector("#episodeInput")
        const episode = episodeTag.value
        if (title === "" || season === "" || episode === "") {
            const resultsSection = document.querySelector("#resultsSection");
            resultsSection.innerHTML = "";
            searchAlertRenderer(resultsSection);
        } else {
            goTo(`${ROUTES.SERIES}/${title}/Season=${season}/Episode=${episode}`)
        }
    }
}) 