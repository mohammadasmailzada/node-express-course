const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decoder = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decoder.write(data);
  });
  req.on("end", function () {
    body += decoder.end();
    const decodedBody = decodeURI(body);
    const bodyArray = decodedBody.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

let item = "Enter something below.";

const form = () => {
  return `
    <body>
      <p>${item}</p>
      <form method="POST">
        <input name="item"></input>
        <button type="submit">Submit</button>
      </form>
    </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000, () => {
  console.log("The server is listening on port 3000.");
});
