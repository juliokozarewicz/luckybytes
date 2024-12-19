import { Router } from 'express'
import { EncryptionController } from './d_controllers/EncryptionController'

const routes = Router()

// instances
const encryptionController = new EncryptionController()

// routes
routes.get('/encryption', encryptionController.handle.bind(encryptionController))

export default routes