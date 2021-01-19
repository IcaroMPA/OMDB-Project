import { rootRenderer, postsRenderer } from "./components.js"
import { goTo } from "../navigation.js"
import { ROUTES } from "../routes.js"

export default function (movies) {
  rootRenderer()
  console.log(movies)
  movies.forEach(movie => {
    postsRenderer(movie, "main")
  })
}

window.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "home":
      e.preventDefault();
      goTo(ROUTES.HOME);
      break
    case "mediaPoster":
      e.preventDefault();
      goTo(`${ROUTES.MEDIA}/${e.target.imdbID}`);
      break
    case "search":
      e.preventDefault();
      goTo(ROUTES.SEARCH);
      break
    case "series":
      e.preventDefault();
      goTo(ROUTES.SERIES)
      break
  }
})

