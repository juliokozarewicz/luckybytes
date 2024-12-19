import { Router } from 'express'
import { HelloWorldController } from './d_controllers/HelloWorldController'

const routes = Router()

// instances
const helloWorldController = new HelloWorldController()

// routes
routes.get('/helloworld', helloWorldController.handle.bind(helloWorldController))

export default routes