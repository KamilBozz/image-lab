// TEST COMMENT
const fsPromises = require("fs").promises;
const fs = require("fs");
const { createReadStream, createWriteStream } = require("fs");
const PNG = require("pngjs").PNG;
const path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const inputPath = path.join(__dirname, 'myfile.zip');
const outputPath = path.join(__dirname, 'unzipped');

const unzip = async (pathIn, pathOut) => {
  const yauzl = require('yauzl-promise'),
  fs = require('fs'),
  {pipeline} = require('stream/promises');

const zip = await yauzl.open(pathIn);
try {
  for await (const entry of zip) {
    if (entry.filename.endsWith('/')) {
      await fs.promises.mkdir(`${pathOut}/${entry.filename}`);
    } else {
      const readStream = await entry.openReadStream();
      const writeStream = fs.createWriteStream(
        `${pathOut}/${entry.filename}`
      );
      await pipeline(readStream, writeStream);
    }
  }
} finally {
  await zip.close();
  console.log("Extraction operation complete");
}
};

// unzip(inputPath, outputPath);

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */


const unzipPath = path.join(__dirname, 'unzipped');


const readDir = async (dir) => {
  let pngArr = [];
  try {
    const images = await fsPromises.readdir(unzipPath);

    for(const image of images) {
      if(image.endsWith('.png')){
       pngArr.push(image);  
      }
    }
    // console.log(pngArr)
    return pngArr;
  } catch(err) {
    console.log(err);
  }
};
readDir()

// function grayscaleImage(pixelData) {

// }

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */


const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // grayscaleImage(this.data)
        // const red = this.data[idx];
        // const green = this.data[idx + 1];
        // const blue = this.data[idx + 2];

        // const gray = (red + green + blue) / 3;

        // this.data[idx] = gray;
        // this.data[idx + 1] = gray;
        // this.data[idx + 2] = gray;


        applyGrayScale(this.data, idx);
      }
    }

    this.pack().pipe(fs.createWriteStream(pathOut));
  });
};


const applyGrayScale = (pixelData, idx) => {
  const red = pixelData[idx];
  const green = pixelData[idx + 1];
  const blue = pixelData[idx + 2];

  const gray = (red + green + blue) / 3;

  pixelData[idx] = gray;
  pixelData[idx + 1] = gray;
  pixelData[idx + 2] = gray;
};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
