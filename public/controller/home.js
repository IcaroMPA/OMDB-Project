import { getMediaById } from "../service/api.js";
import home from "../view/home.js";
import errorPage from "../view/error.js";
import { arrayOfMovies, generateRandomIndex } from "../view/utils.js"

async function homeView() {
  const promises = [];
  let movies = [...arrayOfMovies];
  for (let i = 1; i < 22; i++) {
    let randomId = movies[generateRandomIndex(movies)]
    promises.push(getMediaById(randomId))
    let index = movies.indexOf(randomId)
    movies.splice(index, 1)
  }
  try {
    const media = await Promise.all(promises)
    home(media)
  } catch (err) { errorPage(); console.log(err) }
}

export { homeView };