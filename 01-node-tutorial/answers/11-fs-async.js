const fs = require('fs');

console.log("at start");

fs.writeFile('./temporary/fileB.txt', 'First line\n', (err) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log("First line written");
  
  fs.writeFile('./temporary/fileB.txt', 'Second line\n', { flag: 'a' }, (err) => {
    if (err) {
      console.log("Error:", err);
      return;
    }
    console.log("Second line written");

    fs.writeFile('./temporary/fileB.txt', 'Third line\n', { flag: 'a' }, (err) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log("Third line written");

      fs.readFile('./temporary/fileB.txt', 'utf8', (err, data) => {
        if (err) {
          console.log("Error:", err);
          return;
        }
        console.log("File content:\n", data);
      });
    });
  });
});

console.log("at end");
