import { loadConfig } from './config'
import { Router } from './router'
import * as logger from './logger'

import { MeController, JumpController } from './controllers'

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

  Bun.serve({
    port: config.port,
    fetch: router.handle.bind(router)
  })

  logger.log(`Listening at port=${config.port}`)
}

main()
