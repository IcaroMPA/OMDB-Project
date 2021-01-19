const API_ENDPOINT = "https://www.omdbapi.com/";
const API_KEY = "&apikey=eec15bdc"

async function getMediaById(imdbID) {
  const response = await fetch(`${API_ENDPOINT}?i=${imdbID}${API_KEY}`)
  return response.json()
}

async function searchMediaByName(title, type, page = 1) {
  if (type === "all") {
    const response = await fetch(`${API_ENDPOINT}?s=${title}&page=${page}${API_KEY}`)
    return response.json()
  }
  else {
    const response = await fetch(`${API_ENDPOINT}?s=${title}&type=${type}&page=${page}${API_KEY}`)
    return response.json()
  }
}

async function searchSeriesPlots(title, season, episode) {
  const response = await fetch(`${API_ENDPOINT}?t=${title}&Season=${season}&Episode=${episode}${API_KEY}`)
  return response.json()
}

export { getMediaById, searchSeriesPlots, searchMediaByName };
