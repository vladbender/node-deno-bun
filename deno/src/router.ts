import { NotFoundResponse, InternalServerErrorResponse } from './utils.ts'

export type Handler = (request: Request) => Response | Promise<Response>

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

  async handle(request: Request): Promise<Response> {
    const expectedMethod = request.method
    const expectedPath = new URL(request.url).pathname.toLowerCase()
    for (const { method, path, handler } of this.routes) {
      if (expectedMethod === method && expectedPath === path) {
        try {
          return await handler(request)
        } catch (err) {
          console.error('Error while handling', err)
          return InternalServerErrorResponse
        }
      }
    }
    return NotFoundResponse
  }
}