// TEST COMMENT
const fs = require("fs").promises;
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
// const inputPath = path.join(__dirname, 'myfile.zip');
// const outputPath = path.join(__dirname, 'unzipped');

// const unzip = async (pathIn, pathOut) => {
//   const yauzl = require('yauzl-promise'),
//   fs = require('fs'),
//   {pipeline} = require('stream/promises');

// const zip = await yauzl.open(pathIn);
// try {
//   for await (const entry of zip) {
//     if (entry.filename.endsWith('/')) {
//       await fs.promises.mkdir(`${pathOut}/${entry.filename}`);
//     } else {
//       const readStream = await entry.openReadStream();
//       const writeStream = fs.createWriteStream(
//         `${pathOut}/${entry.filename}`
//       );
//       await pipeline(readStream, writeStream);
//     }
//   }
// } finally {
//   await zip.close();
//   console.log("Extraction operation complete");
// }
// };

// unzip(inputPath, outputPath);

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */


const unzipPath = path.join(__dirname, 'unzipped');
const inPngPath = path.join(__filename, 'in.png');
const in1PngPath = path.join(__filename, 'in1.png');
const in2PngPath = path.join(__filename, 'in1.png');


const readDir = async (dir) => {
  try {
    const images = await fs.readdir(unzipPath);

    for(image of images) {
      if(image.endsWith('.png')){
        createReadStream(inPngPath, in1PngPath, in2PngPath)
        
      }
    }
  } catch(err) {
    console.log(err);
  }
  



  // try {
  //   const images = await readdir(path);
  //   // if(file.endswith("png"))
  //   for (const file of images)
  //     console.log(file);
  // } catch (err) {
  //   console.error(err);
  // }
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
