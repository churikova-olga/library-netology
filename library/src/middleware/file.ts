
import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'src/public/book')
    },
    filename(req, file, cb) {
        cb(null,  `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const fileMiddleware = multer({storage});

export {fileMiddleware};