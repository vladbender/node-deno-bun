
import { loadConfig } from './config.ts'
import { Router } from './router.ts'
import * as logger from './logger.ts'

import { MeController } from './controllers/me.controller.ts'
import { JumpController } from './controllers/jump.controller.ts'

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

  Deno.serve(
    {
      port: config.port,
      onListen: ({ port }) => {
        logger.log(`Listening at port=${port}`)
      }
    },
    router.handle.bind(router),
  )
}

main()
