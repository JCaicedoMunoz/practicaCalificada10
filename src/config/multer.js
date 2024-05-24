import multer from 'multer'
import { join } from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, '../../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

export default upload
