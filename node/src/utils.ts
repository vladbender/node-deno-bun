import { ServerResponse } from 'node:http'
import { Readable } from 'node:stream'

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


export function writeJson(response: ServerResponse, body: unknown, status = HttpStatus.OK) {
  response.writeHead(status, { 'content-type': 'application/json' })
  response.end(JSON.stringify(body))
}

export const writeNotFound = (response: ServerResponse) => {
  writeJson(
    response,
    { message: 'Not found' },
    HttpStatus.NotFound
  )
}

export const writeInternalServerError = (response: ServerResponse) => {
  writeJson(
    response,
    { error: 'Internal Server Error' },
    HttpStatus.InternalServerError
  )
}


export async function readToJson<T>(stream: Readable): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const chunks: Buffer[] = []

    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => {
      resolve(
        JSON.parse(
          Buffer.concat(chunks).toString('utf8')
        )
      )
    })
  })
}