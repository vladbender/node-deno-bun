import { NotFoundResponse, InternalServerErrorResponse } from './utils.ts'

export type Handler = (request: Request) => Response | Promise<Response>

const getKey = (method: string, path: string): string => `${method}:${path}`

export class Router {
  private routes: Map<string, Handler> = new Map()

  on(method: string, path: string, handler: Handler): this {
    this.routes.set(getKey(method, path), handler)
    return this
  }

  async handle(request: Request): Promise<Response> {
    const method = request.method
    const path = new URL(request.url).pathname.toLowerCase()

    const key = getKey(method, path)
    const handler = this.routes.get(key)

    if (!handler) {
      return NotFoundResponse
    }

    try {
      return await handler(request)
    } catch (err) {
      console.error('Error while handling', err)
      return InternalServerErrorResponse
    }
  }
}