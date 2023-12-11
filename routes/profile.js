var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path = require('path')
const bidea = path.join(__dirname, '../public/uploads')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, bidea)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ '.'+ file.mimetype.split('/')[1])
  }
})
const permit = [
  'image/png',
  'image/jpg'
]
const upload = multer({ storage: storage ,
                        limits: {
                          fileSize: 2 * 1024 * 1024
                        },
                        fileFilter: function(req, file, cb){
                          if (!permit.includes(file.mimetype)){
                            return cb(new Error('Only .png files allowed my blodel'))
                          }
                          cb(null, true)
                        }})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    console.log(req.body)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})


module.exports = router;
