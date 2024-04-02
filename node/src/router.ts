
import { IncomingMessage, ServerResponse } from 'node:http'

import { writeNotFound, writeInternalServerError } from './utils'

export type Handler = (request: IncomingMessage, response: ServerResponse) => void | Promise<void>

type Routes = {
  method: string,
  path: string,  
  handler: Handler
}

export class Router {
  private routes: Array<Routes> = []

  on(method: string, path: string, handler: Handler): this {
    this.routes.push({
      method,
      path,
      handler,
    })
    return this
  }

  handle(request: IncomingMessage, response: ServerResponse): void {
    const expectedMethod = request.method
    const expectedPath = new URL(request.url ?? '', `http://${request.headers.host}`).pathname.toLowerCase()

    for (const { method, path, handler } of this.routes) {
      if (expectedMethod === method && expectedPath === path) {
        Promise.resolve(
          new Promise(resolve => resolve(handler(request, response)))
        )
          .catch((err) => {
            console.error('Error while handling', err)
            writeInternalServerError(response)
          })
        return
      }
    }

    writeNotFound(response)
  }
}