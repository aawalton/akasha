import { NarrowError } from "akasha/utils/narrow/narrow-error/narrow-error.module.code.ts"

export function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new NarrowError(`assertNever: unhandled variant ${rendered}`)
}
