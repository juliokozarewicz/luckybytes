import { Router } from 'express'
import { EncryptionController } from './d_controllers/EncryptionController'
import { DecryptionController } from './d_controllers/DecryptionController'

const routes = Router()

// instances
const encryptionController = new EncryptionController()
const decryptionController = new DecryptionController()

// routes
routes.post('/encryption', encryptionController.handle.bind(encryptionController))
routes.post('/decryption', decryptionController.handle.bind(decryptionController))

export default routes