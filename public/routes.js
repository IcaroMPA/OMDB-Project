import { homeView } from "../controller/home.js";
import { mediaView } from "../controller/media.js";
import { searchView } from "../controller/search.js";
import { searchResultsView } from "../controller/searchResults.js";
import { seriesView } from "../controller/series.js";
import { seriesResultsView } from "../controller/seriesResults.js";

const ROUTES = {
  HOME: "/",
  MEDIA: "/media",
  SEARCH: "/search",
  SERIES: "/series"
};

const routes = [
  { path: /^\/?$/, init: homeView },
  { path: /^\/media\/(?<id>tt\d+)\/?$/, init: mediaView },
  { path: /^\/search\/?$/, init: searchView },
  { path: /^\/search\/(?<id>\S+)(?=\/)\/Type=(?<id2>\w+)\/(?<id3>\d+)?\/?$/, init: searchResultsView },
  { path: /^\/series\/?$/, init: seriesView },
  { path: /^\/series\/(?<id>\S+)(?=\/)\/?Season=(?<id2>\d+)\/Episode=(?<id3>\d+)?\/?$/, init: seriesResultsView },
];

function getRoute(path) {
  return routes.find(function (route) {
    return path.match(route.path)
  }); 
}

function getURLParams(path, route) {
  let paramsObject = path.match(route.path);
  let paramsArray = [];
  if (!paramsObject.groups) {
    return undefined
  } else if (!paramsObject.groups.id3) {
    paramsArray.push(paramsObject.groups.id)
    paramsArray.push(paramsObject.groups.id2)
    return paramsArray
  } else if (!paramsObject.groups.id2) {
    paramsArray.push(paramsObject.groups.id)
    return paramsArray
  } else {
    paramsArray.push(paramsObject.groups.id)
    paramsArray.push(paramsObject.groups.id2)
    paramsArray.push(paramsObject.groups.id3)
    return paramsArray
  }
}

export { ROUTES, getRoute, getURLParams };
