import { ROUTES, getRoute, getURLParams } from "./routes.js";

export function goTo(path, bypassHistory = false) {
  const route = getRoute(path);

  if (!route) {
    goTo(ROUTES.HOME);
    return;
  }

  const params = getURLParams(path, route)
  if (!bypassHistory) {
    if (params === undefined) {
      window.history.pushState(null, "", path)
      route.init();
    } else {
      const id = params[0]
      const id2 = params[1]
      const id3 = params[2]
      window.history.pushState({ id, id2, id3 }, "", path)
      route.init(id, id2, id3);
    }
  }
  else if (params === undefined) {
    route.init();
  } else {
    const id = params[0]
    const id2 = params[1]
    const id3 = params[2]
    route.init(id, id2, id3);
  }
}

