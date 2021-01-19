function createChildElement(elementType, textContent, parent, elementId, ...elementClasses) {
  const element = document.createElement(elementType);
  elementClasses.forEach((e) => element.classList.add(e));
  element.id = elementId;
  element.textContent = textContent;
  parent.appendChild(element);
  return element;
}

const arrayOfMovies = ["tt1921043", "tt2762506", "tt2015381", "tt0068646", "tt1568346",
  "tt1302006", "tt1285016", "tt1706620", "tt4154796", "tt5186714", "tt0317248", "tt0140888",
  "tt1856101", "tt1645089", "tt5104604", "tt0133093", "tt1440728", "tt0381061", "tt0286106",
  "tt0167404", "tt3783958", "tt4975722", "tt5726616", "tt2278871", "tt1149362", "tt7784604",
  "tt1179904", "tt0387564", "tt0033467", "tt0072684", "tt0081505", "tt2543164", "tt3397884",
  "tt2316411", "tt1392214", "tt1255953", "tt3460252", "tt1853728", "tt0361748", "tt1028528",
  "tt0443272", "tt0407304", "tt0181689", "tt0108052", "tt0107290", "tt0118884", "tt1907668",
  "tt0088763", "tt0096874", "tt0109830", "tt0093058", "tt0066921", "tt0062622", "tt0055630",
  "tt0054460", "tt0050613", "tt0047478", "tt0051808", "tt0059578", "tt0060196", "tt0064116",
  "tt0067140", "tt0087843"];

function generateRandomIndex(array) {
  return Math.floor((Math.random() * array.length));
}

function getPage() {
  let currentPage = 1;
  if (history.state.id3) {
    let pageNumberString = history.state.id3
    currentPage = Number(pageNumberString)
  }
  if (currentPage < 1) {
    currentPage = 1
  }
  return currentPage;
}

function createOptionTag(parentElement, numberOfOptions, textContent) {
  for (let i = 1; i <= numberOfOptions; i++) {
    let option = createChildElement("option", `${textContent}: ${i}`, parentElement)
    option.value = i
  }
}

export { createChildElement, arrayOfMovies, generateRandomIndex, getPage, createOptionTag };