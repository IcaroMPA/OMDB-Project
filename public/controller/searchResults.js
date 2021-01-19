import { searchMediaByName } from "../service/api.js"
import searchResults from "../view/searchResults.js";
import errorPage from "../view/error.js";


async function searchResultsView(title, type, page) {
    try {
        const media = await searchMediaByName(title, type, page)
        searchResults(media);
    } catch (err) { errorPage(); console.log(err) }
}

export { searchResultsView }