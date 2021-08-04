import fs from "fs";
import path from "path";
import dicomparser from "dicom-parser";
import ITKHelper from "@kitware/vtk.js/Common/DataModel/ITKHelper";
// import readImageLocalDICOMFileSeries from "itk/readImageLocalDICOMFileSeries";
import readImageDICOMFileSeries from "itk/readImageDICOMFileSeries";
// import readImageEmscriptenFSDICOMFileSeries from "itk/readImageEmscriptenFSDicomFileSeries";
// import seriesReader from "itk/ImageIOs/itkDICOMImageSeriesReaderJSBinding";

export default async (directory: string) => {
    let files = fs.readdirSync(directory, {withFileTypes: true});
    files = files.filter(f => f.isFile());
    const fileObjs = files.map(f => {
        const fPath = path.join(directory, f.name);
        const fileBuffer = fs.readFileSync(fPath);
        const dataSet = dicomparser.parseDicom(Buffer.from(fileBuffer));
        // Instance Number
        const slice = Number.parseInt(dataSet.string("x00200013"));
        // Image Position (Patient)
        const position = dataSet.string("x00200032").split("\\").map(s => parseFloat(s));
        const file = new File([Uint8Array.from(fileBuffer).buffer], f.name);
        return {
            slice,
            position,
            filePath: fPath,
            file: file,
        };
    });
    fileObjs.sort((a, b) => b.slice - a.slice);
    if (fileObjs[0].position[2] > fileObjs[fileObjs.length - 1].position[2]) {
        fileObjs.reverse();
    }

    const filePaths = fileObjs.map(f => f.file);

    // Left over from some debugging
    // console.log("first");
    // const mountedPath = seriesReader.mountContainingDirectory(filePaths[0]);
    // console.log("second");
    // const itkImage = readImageEmscriptenFSDICOMFileSeries(seriesReader, filePaths, false);
    // console.log("third");
    // seriesReader.unmountContainingDirectory(mountedPath);
    // console.log("fourth");

    // const itkImage = (await readImageLocalDICOMFileSeries(filePaths, true)).image;
    const itkImage = (await readImageDICOMFileSeries(filePaths, true)).image;

    return ITKHelper.convertItkToVtkImage(itkImage);
}
