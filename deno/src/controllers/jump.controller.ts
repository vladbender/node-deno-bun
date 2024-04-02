import { JsonResponse, constructUrl } from '../utils.ts'
import * as logger from '../logger.ts'

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
    jump: async (req: Request): Promise<Response> => {
      const body: JumpBody = await req.json()

      logger.log('Start jumping step', body)

      const counter = body.counter - 1

      if (counter === 0) {
        logger.log('I should end')

        return JsonResponse({
          message: `Jumping has ended`
        })
      } else {
        const nextBody: JumpBody = {
          counter
        }

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(nextBody),
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await response.json()

        logger.log('End jumping step', data)

        return JsonResponse({
          message: `Successful jump step`,
          from: me,
        })
      }
    },
    startJump: async (req: Request): Promise<Response> => {
      const body: JumpBody = await req.json()

      logger.log('Start jumping', body)

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()

      logger.log('End jumping', data)

      return JsonResponse({
        message: `Successfully jumped with counter=${body.counter}`,
        from: me,
      })
    }
  }
}