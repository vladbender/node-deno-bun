
import { IncomingMessage, ServerResponse } from 'node:http'

import { writeNotFound, writeInternalServerError } from './utils'

export type Handler = (request: IncomingMessage, response: ServerResponse) => void | Promise<void>

const getKey = (method: string, path: string): string => `${method}:${path}`

export class Router {
  private routes: Map<string, Handler> = new Map()

  on(method: string, path: string, handler: Handler): this {
    this.routes.set(getKey(method, path), handler)
    return this
  }

  handle(request: IncomingMessage, response: ServerResponse): void {
    const method = request.method
    const path = new URL(request.url ?? '', `http://${request.headers.host}`).pathname.toLowerCase()

    const key = getKey(method ?? '', path)
    const handler = this.routes.get(key)
    
    if (!handler) {
      writeNotFound(response)
      return
    }

    new Promise((res) => res(handler(request, response)))
      .catch((err) => {
        console.error('Error while handling', err)
        writeInternalServerError(response)
      })
  }
}