export function logError(this: void, msg: string, ...args: unknown[]): undefined {
  d(`|cFF6666LibPrice: ${string.format(msg, ...args)}`)
  return undefined
}
