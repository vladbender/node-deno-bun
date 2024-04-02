
import { createServer } from 'node:http'

import { loadConfig } from './config'
import { Router } from './router'
import * as logger from './logger'

import { MeController } from './controllers/me.controller'
import { JumpController } from './controllers/jump.controller'

function main() {
  const config = loadConfig()

  logger.setMe(config.me)

  logger.log('Config', config)

  const meController = MeController(config.me)
  const jumpController = JumpController(config)

  const router = new Router()
  router
    .on('GET', '/me', meController.me)
    .on('POST', '/jump', jumpController.jump)
    .on('POST', '/start_jump', jumpController.startJump)

  const server = createServer(router.handle.bind(router))

  server.listen(config.port, () => {
    logger.log(`Listening at port=${config.port}`)
  })
}

main()
