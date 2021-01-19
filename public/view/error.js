import { rootRenderer } from "./components.js"
import { errorRenderer } from "../view/components.js"

export default function () {
  rootRenderer()
  const main = document.querySelector("#main")
  errorRenderer(main)
}