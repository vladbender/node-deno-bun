
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500,
}

export function constructUrl(base: string, path: string): string {
  const url = new URL(base)
  url.pathname = path
  return url.toString()
}

export function JsonResponse(body: unknown, status = HttpStatus.OK): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const NotFoundResponse = JsonResponse(
  { message: 'Not found' },
  HttpStatus.NotFound
)

export const InternalServerErrorResponse = JsonResponse(
  { error: 'Internal Server Error' },
  HttpStatus.InternalServerError
)
