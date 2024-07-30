const fs = require("fs");


const bigFilePath = "../content/big.txt";


const testStream = (highWaterMark) => {
  
  let counter = 0;


  const stream = fs.createReadStream(bigFilePath, {
    encoding: "utf8",
    highWaterMark: highWaterMark
  });

 
  stream.on("data", (chunk) => {
    counter++;
    console.log(`Received ${counter} chunks of size ${chunk.length}`);
  });

  stream.on("end", () => {
    console.log(`Stream ended. Received a total of ${counter} chunks.`);
  });

 
  stream.on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });
};


console.log("Testing with highWaterMark of 200:");
testStream(200);

console.log("\nTesting with highWaterMark of 500:");
testStream(500);

console.log("\nTesting with highWaterMark of 1000:");
testStream(1000);
