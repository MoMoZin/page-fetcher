const request = require('request');
const fs = require('fs');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = process.argv.slice(2);
const website = input[0];
const fileToWrite = input[1];

request(website, (error, response, body) => {
  if (!response) {
    console.log("Unable to connect to the website");
  }
  if (response && response.statusCode === 200) {
    fs.readFile(fileToWrite, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        rl.question(`There is an existing data in the file ${fileToWrite}. Do you want to overwrite it? Press Y for yes, N for No!`, function(answer) {
          rl.close();
          if (answer.toLowerCase() === 'y') {
            fs.writeFile(fileToWrite, body, err => {
              if (!err) {
                // const fileSize = fs.statSync(fileToWrite).size;
                const fileSize = body.length;
                console.log(`Downloaded and saved ${fileSize} bytes to ${fileToWrite}`);
              }
            });
          }
        });
      }
    });
  }
});