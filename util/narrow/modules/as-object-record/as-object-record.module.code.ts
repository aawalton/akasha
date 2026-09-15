import { isObjectRecord } from "akasha/util/narrow/modules/is-object-record/is-object-record.module.code.ts"

export function asObjectRecord(value: unknown): Record<string, unknown> | undefined {
  return isObjectRecord(value) ? value : undefined
}
