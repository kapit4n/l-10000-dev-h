const fs = require('fs');
const srcFilejs = './src/js';
const srcFileJava = './src/java';
const srcFileScala = './src/scala';
const srcFileDotnet = './src/dotnet';
const displayFile = false;

const countLines = function(filePath, callback) {
    let i;
    let count = 0;
    fs.createReadStream(filePath)
        .on('error', e => callback(e))
        .on('data', chunk => {
            for (i=0; i < chunk.length; ++i) if (chunk[i] == 10) count++;
        })
        .on('end', () => callback(null, count));
};

var totalCountsJs = [];
var totalCountsJava = [];
var totalCountsScala = [];
var totalCountsDotnet = [];

function countLinesFiles(srcFile, files, collection) {
    files.forEach(f => {
        countLines(srcFile + "/" + f, function(err, data) {
            collection.push(data + 1);
        });
    })
}

function countFileByLanguage(srcFile, collection) {
    fs.readdir(srcFile, (err, files) => {
        if (displayFile) console.log("Files: " + files.join(", "));
        countLinesFiles(srcFile, files, collection);
      })
}

countFileByLanguage(srcFilejs, totalCountsJs);
countFileByLanguage(srcFileJava, totalCountsJava);
countFileByLanguage(srcFileScala, totalCountsScala);
countFileByLanguage(srcFileDotnet, totalCountsDotnet);

function writeCount(fileName, content) {
    fs.writeFile(fileName, content, function(err) {
        if (err) return console.log(error);
    });
}

function sumFunc(x, y) {
    return x + y;
}

setTimeout(function() {
    let result = [];
    let sortIt = true;
    reducedJs = totalCountsJs.reduce(sumFunc, 0);
    writeCount('jsCount.txt', reducedJs);
    result.push({
        lan: "JS",
        lines: reducedJs
    });
    
    
    reducedJava = totalCountsJava.reduce(sumFunc, 0);
    writeCount('javaCount.txt', reducedJava);
    result.push({
        lan: "Java",
        lines: reducedJava
    });

    reducedScala = totalCountsScala.reduce(sumFunc, 0);
    writeCount('scalaCount.txt', reducedScala);
    result.push({
        lan: "Scala",
        lines: reducedScala
    });

    reducedDotnet = totalCountsDotnet.reduce(sumFunc, 0);
    writeCount('dotnetCount.txt', reducedDotnet);
    result.push({
        lan: "CS",
        lines: reducedDotnet
    });
    if (sortIt) {
        result.sort((x, y) => x.lines > y.lines);
    }
    result.forEach( x => console.log("*    " + x.lan + ":\t" + x.lines))
    console.log("*    total:\t"  + (reducedJs + reducedJava + reducedScala + reducedDotnet));

}, 5000);
