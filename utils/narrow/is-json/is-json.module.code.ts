import { JsonSchema } from "../json-schema/json-schema.module.code.ts"
import type { Json } from "../json-value/json-value.module.code.ts"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
