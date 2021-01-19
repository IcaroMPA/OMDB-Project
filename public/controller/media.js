import { getMediaById } from "../service/api.js"
import media from "../view/media.js";
import errorPage from "../view/error.js";

async function mediaView(imdbID) {
    try {
        const dataFromAPI = await getMediaById(imdbID);
        media(dataFromAPI);
    } catch (err) { errorPage(); console.log(err) }
}

export { mediaView }