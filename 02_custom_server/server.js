  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const port = 3000;

  //creating instance of a server 
  const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

    const extName = path.extname(filePath).toLocaleLowerCase();
    //from filepath we get extension name

    let mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".png": "image/png",
    };
    //we map extension name to media type - so we can send them over network 

    const contentType = mimeTypes[extName] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
      //For Error
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("404: File not found bro");
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      }
      //For No Error
      else {
        res.writeHead(200, { "Content-Type": contentType });//partone - header
        res.end(content, "utf8"); //parttwo - body
      }
    });
  });
  //here content == index.html or about .html or contact.html
  //for all of them contenttype = text/html
  //Error can occur when url entered is incorrect or page is not present

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
