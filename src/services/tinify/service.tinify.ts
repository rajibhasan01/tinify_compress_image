import fs from 'fs';
import archiver from 'archiver';

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
export const zipDirectory = (sourceDir: any) => {
    return new Promise((resolve, reject) => {
        try{
            const outDir = sourceDir + '.zip';
            const archive = archiver('zip', { zlib: { level: 9 }});
            const stream = fs.createWriteStream(outDir);
            console.log()
            archive
                .directory(sourceDir, false)
                .on('error', err => reject(err))
                .pipe(stream)
            ;

        stream.on('close', () => {
            resolve(outDir.split('uploaded-image')[1]);
        });
        archive.finalize();

        } catch (error){
            reject(error);
        }
    }).catch((error) => {
        throw error;
    });
}