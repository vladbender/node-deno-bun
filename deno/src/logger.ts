
type Primitive =  string | number | boolean | null | undefined

let ME = ''

export const setMe = (me: string) => {
  ME = me
}

export const log = (message: string, args?: Record<string, Primitive>): void => {
  const time = new Date().toISOString().split('T')[1]
  const argsStr = args
    ? Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')
    : ''

  const output = [
    time,
    ME,
    `"${message}"`,
    argsStr
  ]
    .filter(s => s != '')
    .join(' ')

  console.log(output)
}