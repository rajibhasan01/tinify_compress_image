/** External */
import fs from 'fs';
import tinify from 'tinify';
tinify.key = process.env.TINIFY_API_KEY;

/** Tiny Png - Compress image from local file */
export const compressFromFile =async (req:any, res:any, next:any) => {
    try{
        const imgPath = req?.imgFileName;
        const dir = req?.dirPath;
        if(imgPath?.length > 0 && typeof(dir) !== undefined){
            const outDir = dir + '/' + 'output'
            const resultImg = [];
            if (!fs.existsSync(outDir)){
                fs.mkdirSync(outDir, { recursive: true });
            }
            for(const img of imgPath){
                const inputImg = dir + '/' + img;
                const outputImg = outDir + '/' + img;
                const source = tinify.fromFile(inputImg);
                source.toFile(outputImg);
                resultImg.push(outputImg.split('uploaded-image')[1]);
            };
            res.status(200).json({
                'baseUrl' : process.env.IP + process.env.PORT,
                "compressImagePath" : resultImg,
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
        if(imgPath?.length > 0){
            res.status(200).json({
                'baseUrl' : process.env.IP + process.env.PORT,
                "compressImagePath" : imgPath
            });
        } else {
            throw new Error('something went wrong')
        }
    } catch (error){
        res.status(400).json({"message": 'something went wrong'});

    }
}
