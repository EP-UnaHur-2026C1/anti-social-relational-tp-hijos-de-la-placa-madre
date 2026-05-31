const https = require('https');
const fs = require('fs');
const fsPromises = require('fs/promises')
const path = require('path');

const descargarImagen = (url, nombreArchivo) => {

    const rutaNuevaFoto = path.join(
        __dirname, 
        '../../public/images', 
        nombreArchivo);
    
    return new Promise((resolve, reject) => {
        
        const archivo = fs.createWriteStream(rutaNuevaFoto);

        https.get(url, response => {

            response.pipe(archivo);

            archivo.on('finish', () => {
                archivo.close();
                resolve(rutaNuevaFoto);
            });

        }).on('error', err => {

            fs.unlink(rutaNuevaFoto, () => {});
            reject(err);

        })
    })
}

const eliminarImagen = async (urlImagen) =>{
    
    const rutaDeImagen = path.join(
        __dirname,
        '../../public',
        urlImagen
    )

    await fsPromises.unlink(rutaDeImagen)
}

module.exports = {
    descargarImagen, eliminarImagen,
}