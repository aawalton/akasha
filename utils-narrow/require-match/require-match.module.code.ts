import { z } from "zod"
import { NarrowError } from "../narrow-error/narrow-error.module.code.ts"

const EXEC_GROUPS_SCHEMA = z
  .unknown()
  .refine((v): v is RegExpExecArray => Array.isArray(v) && v.length > 0)
  .transform((v) => z.record(z.string(), z.string()).parse(v.groups ?? {}))

export function requireMatch<T extends z.ZodTypeAny>(
  re: RegExp,
  schema: T,
  input: string,
  label?: string
): z.infer<T> {
  let groups: Record<string, string>
  try {
    groups = EXEC_GROUPS_SCHEMA.parse(re.exec(input))
  } catch {
    throw new NarrowError(
      `requireMatch: no match for ${re}${label !== undefined ? ` in ${label}` : ""}`
    )
  }
  return schema.parse(groups)
}
