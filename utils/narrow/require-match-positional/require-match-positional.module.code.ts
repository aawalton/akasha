import { NarrowError } from "akasha/utils/narrow/narrow-error/narrow-error.module.code.ts"
import { z } from "zod"

const RAW_MATCH_SCHEMA = z.array(z.string()).min(1)

export function requireMatchPositional<T extends z.ZodTypeAny>(
  re: RegExp,
  schema: T,
  input: string,
  label?: string
): z.infer<T> {
  let raw: readonly string[]
  try {
    raw = RAW_MATCH_SCHEMA.parse(re.exec(input))
  } catch {
    throw new NarrowError(
      `requireMatchPositional: no match for ${re}${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return schema.parse(raw.slice(1))
}
