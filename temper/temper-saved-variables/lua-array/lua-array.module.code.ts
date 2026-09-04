import { z } from "zod"

export function luaArrayOrEmpty<T extends z.ZodTypeAny>(itemSchema: T): z.ZodType<z.infer<T>[]> {
  return z.union([z.array(itemSchema), z.record(z.string(), z.unknown())]).transform((raw, ctx) => {
    if (Array.isArray(raw)) return raw
    const out: z.infer<T>[] = []
    for (const [key, value] of Object.entries(raw)) {
      const parsed = itemSchema.safeParse(value)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          ctx.addIssue({ ...issue, path: [key, ...issue.path] })
        }
        return z.NEVER
      }
      out.push(parsed.data)
    }
    return out
  })
}
