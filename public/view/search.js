import { rootRenderer, searchViewRenderer, searchAlertRenderer } from "./components.js"
import { goTo } from "../navigation.js"
import { ROUTES } from "../routes.js"

export default function () {
    rootRenderer()
    searchViewRenderer();
}

window.addEventListener("click", (e) => {
    if (e.target.id === "searchButton") {
        e.preventDefault()
        const mediaNameInput = document.querySelector("#searchInput");
        const mediaNameUnformated = mediaNameInput.value
        const mediaName = mediaNameUnformated.replaceAll(" ", "+")
        const mediaTypeInput = document.querySelector("#selectDiv");
        const mediaType = mediaTypeInput.selectedOptions[0].id;
        if (mediaName === "") {
            const resultsSection = document.querySelector("#resultsSection");
            resultsSection.innerHTML = "";
            searchAlertRenderer(resultsSection);
        } else {
            goTo(`${ROUTES.SEARCH}/${mediaName}/Type=${mediaType}/`)
        }
    }
})