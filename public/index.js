import { goTo } from "./navigation.js";

goTo(document.location.pathname);

window.addEventListener("popstate", () => {
    goTo(document.location.pathname, true)
})