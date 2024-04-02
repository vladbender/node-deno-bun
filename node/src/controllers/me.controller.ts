
import { IncomingMessage, ServerResponse } from 'node:http'

import { writeJson } from '../utils'

export function MeController(me: string) {
  return {
    me: (_request: IncomingMessage, response: ServerResponse) => {
      writeJson(response, {
        data: me,
      })
    }
  }
}
