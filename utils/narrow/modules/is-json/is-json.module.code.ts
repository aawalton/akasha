import { JsonSchema } from "akasha/utils/narrow/json-schema/json-schema.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"

export function isJson(value: unknown): value is Json {
  return JsonSchema.safeParse(value).success
}
