import express from 'express'
import { apiRouter } from './apiRouter.js'
import multer from 'multer'
import { ProductManager } from './ProductManager.js'

const PORT = 8080


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/imgs')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

const app = express()

app.use('/', express.static('./static'))
app.use('/imgs', express.static('./static/imgs/products'))

app.use(apiRouter)

app.post('/archivos', upload.single('archivo'), (req, res, next) => {
    res.json(req.file)
})

app.use((error, req, res, next) => {
    switch (error.message) {
        case 'id no encontrado':
            res.status(404)
            break
        case 'falta un argumento':
            res.status(400)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
})

const server = app.listen(PORT)

