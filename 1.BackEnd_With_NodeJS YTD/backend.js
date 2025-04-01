
import { isUtf8 } from 'buffer';
import fs from 'fs'; // ES moudle  [OR]
// const fs = require('fs'); // common JS module


//Sync
// fs.writeFileSync("./test.txt", "Replacing some text in previoiusly created file")

//Async
// fs.writeFile("./test.txt", "This is written by async command ie: fs.writeFile()", (err) => {})


// const result = fs.readFileSync("./contact.txt", "utf-8")
// console.log(result);


// fs.readFile("contact.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error: ", err);
//     } else {
//         console.log(result);
//     }
// });





// fs.appendFileSync("./contact.txt", new Date().getDate().toLocaleString())

// fs.cpSync("./test.txt", "./newtest.txt");


// fs.unlinkSync("test.txt");


// console.log(fs.statSync("./newtest.txt"))


// fs.mkdirSync("folder-1")



// fs.mkdirSync("docs/a/b", { recursive: true });