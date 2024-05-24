import { Router } from 'express'
import { index, remove, store, update, uploadPicture } from '../controllers/usuarios.controller.js'
import upload from '../config/multer.js'

const router = Router()

router.get('/', index)
router.post('/', upload.single('picture'), store)
router.put('/:id', upload.single('picture'), update)
router.delete('/:id', remove)
router.post('/:id/picture', upload.single('picture'), uploadPicture)

export default router
