const fs = require("fs");
const path = require("path"); // handling paths

module.exports = function getFile(dirName, pathToFile) {
  const promise = new Promise(function(resolve, reject) {
    fs.readFile(path.join(dirName, pathToFile), "utf-8", function(err, html) {
      if (err) {
        const ERROR = new Error(err);
        reject(ERROR);
      } else {
        return resolve(html);
      }
    });
  });
  return promise;
};

//use const file = getFile(__dirname, "../public/index.html");
