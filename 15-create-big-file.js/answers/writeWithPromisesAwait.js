const { writeFile, readFile } = require("fs").promises;


const writer = async () => {
    try {
       
        const content = "Hello, this is line 1.\nThis is line 2.\nAnd finally, line 3.";

       
        await writeFile("temp.txt", content);

        console.log("File 'temp.txt' has been written successfully.");
    } catch (err) {
        console.error("Error writing file:", err);
    }
};


const reader = async () => {
    try {
       
        const data = await readFile("temp.txt", "utf8");

        console.log("Content of 'temp.txt':");
        console.log(data);
    } catch (err) {
        console.error("Error reading file:", err);
    }
};


const readWrite = async () => {
    await writer();
    await reader();
};


readWrite().catch(err => console.error("Error in readWrite:", err));