/** External */
import fs from 'fs';
import tinify from 'tinify';
import {zipDirectory} from './../../services/tinify/service.tinify';

/** add tinify for api key */
tinify.key = process.env.TINIFY_API_KEY;

/** Tiny Png - Compress image from local file */
export const compressFromFile =async (req:any, res:any, next:any) => {
    try{
        const imgPath = req?.imgFileName;
        const dir = req?.dirPath;
        if(imgPath?.length > 0 && typeof(dir) !== undefined){
            const outDir = dir + '/' + 'output';
            const resultImg = [];
            if (!fs.existsSync(outDir)){
                fs.mkdirSync(outDir, { recursive: true });
            }
            for(const img of imgPath){
                const inputImg = dir + '/' + img;
                const outputImg = outDir + '/' + img;
                const source = tinify.fromFile(inputImg);
                await source.toFile(outputImg);
                resultImg.push(outputImg.split('uploaded-image')[1]);
            };
            const zipFile = await zipDirectory(outDir).catch((error) => {
                throw new Error('could not create the zip file');
            });
            res.status(200).json({
                'baseUrl' : process.env.IP + process.env.PORT,
                "compressImagePath" : resultImg,
                "zipFile": zipFile
            });
        } else {
            throw new Error('something went wrong')
        }
    } catch (error){
        res.status(400).json({"message": 'something went wrong'});

    }
};

/** Tiny Png - Compress image from Buffer */
export const compressFromBuffer =async (req:any, res:any, next:any) => {
    try{
        const imgPath = req?.imgFileName;
        const dir = req?.dirPath;
        if(imgPath?.length > 0 && typeof(dir) !== undefined){
            const zipFile = await zipDirectory(dir).catch((error) => {
                throw new Error('could not create the zip file');
            });
            res.status(200).json({
                'baseUrl' : process.env.IP + process.env.PORT,
                "compressImagePath" : imgPath,
                "zipFile": zipFile
            });
        } else {
            throw new Error('something went wrong')
        }
    } catch (error){
        res.status(400).json({"message": 'something went wrong'});

    }
}
