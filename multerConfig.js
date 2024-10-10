const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.resolve("uploads/"));
    },
    filename: function (req, file, callback) {
        const time = new Date().getTime();

        //nome do arquivo
        callback(null, `${time}_${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;