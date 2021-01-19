import { searchSeriesPlots } from "../service/api.js"
import seriesResults from "../view/seriesResults.js";
import errorPage from "../view/error.js";

async function seriesResultsView(title, season, episode) {
    try {
        const dataFromAPI = await searchSeriesPlots(title, season, episode);
        seriesResults(dataFromAPI)
    } catch (err) { errorPage(); console.log(err) }
}

export { seriesResultsView }