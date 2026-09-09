export type GlobalTable = Record<string, unknown>

export type LoggerTag = string

export type FormatArgs = [string, ...unknown[]]

export type ConcatList = (string | number)[]

export type StringRecord = Record<string, unknown>

export type PreHookFn = (this: void, ...args: unknown[]) => unknown

export function asLoggerTag(value: unknown): LoggerTag {
  return value as LoggerTag
}

export function asFormatArgs(value: readonly unknown[]): FormatArgs {
  return value as FormatArgs
}

export function asConcatList(value: unknown): ConcatList {
  return value as ConcatList
}

export function asPreHookFn(value: unknown): PreHookFn {
  return value as PreHookFn
}
