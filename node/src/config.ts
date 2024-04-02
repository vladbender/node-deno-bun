
type Config = {
  port: number;
  jumpUrl: string;
  me: string;
}

export function loadConfig(): Config {
  const portSrt = process.env.PORT
  if (portSrt === undefined) {
    throw new Error('Expect PORT env')
  }

  const port = Number(portSrt)

  const jumpUrl = process.env.JUMP_URL
  if (jumpUrl === undefined) {
    throw new Error('Expect JUMP_URL env')
  }

  const me = process.env.ME
  if (me === undefined) {
    throw new Error('Expect ME env')
  }

  return {
    port,
    jumpUrl,
    me,
  }
}