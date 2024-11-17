const path = require("path");

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, 'unzipped');
const pathProcessed = path.join(__dirname, 'grayscaled');


async function pngArr() {
    const pngArr = await IOhandler.readDir(pathUnzipped);
    pngArr.forEach(png => {
    IOhandler.grayScale(path.join(pathUnzipped, png), path.join(pathProcessed, png))
})
}

pngArr()
console.log("program finished");