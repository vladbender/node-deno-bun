import { IncomingMessage, ServerResponse } from 'node:http'

import { writeJson, constructUrl, readToJson } from '../utils'
import * as logger from '../logger'

type JumpBody = {
  counter: number
}

type Options = {
  jumpUrl: string
  me: string
}

export function JumpController({ jumpUrl, me }: Options) {
  const url = constructUrl(jumpUrl, '/jump')

  return {
    jump: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
      const body: JumpBody = await readToJson(request)

      logger.log('Start jumping step', body)

      const counter = body.counter - 1

      if (counter === 0) {
        logger.log('I should end')

        writeJson(response, {
          message: `Jumping has ended`
        })
        return
      } else {
        const nextBody: JumpBody = {
          counter
        }

        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(nextBody),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()

        logger.log('End jumping step', data)

        writeJson(response, {
          message: `Successful jump step`,
          from: me,
        })
        return
      }
    },
    startJump: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
      const body: JumpBody = await readToJson(request)

      logger.log('Start jumping', body)

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await res.json()

      logger.log('End jumping', data)

      writeJson(response, {
        message: `Successfully jumped with counter=${body.counter}`,
        from: me,
      })
    }
  }
}