const http = require("http");
const fsPromises = require("fs").promises;
const path = require("path");
const PUBLIC_ROOT = "public"
const PORT = 8000;
const server = http.createServer(handler);
server.listen(PORT);
console.log("Server started @ localhost:" + PORT);

let typeMapper = (data) => {
    let splittedData = data.split(".");
    const contentTypes = {
      gif: "image/gif",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
      png: "image/png",
      mp4: "video/mp4",
      html: "text/html",
      css: "text/css",
      js: "text/javascript",
    };
    return contentTypes[splittedData[1]];
  };
  
function handler(request, response) {
  let url = request.url;
  if (!path.extname(url)) {
    url = "/index.html";
  }
  const filePath = path.join(PUBLIC_ROOT, url)
  const type = typeMapper(url);
  fsPromises
    .readFile(filePath)
    .then((data) => {
      response.writeHead(200, { "content-type": type });
      response.end(data);
    })
    .catch(() => {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("SERVER ERROR! FILE NOT FOUND!");
    });
}
