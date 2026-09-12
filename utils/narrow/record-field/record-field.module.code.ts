import { asObjectRecord } from "akasha/utils/narrow/modules/as-object-record/as-object-record.module.code.ts"

export function recordField(value: unknown, field: string): unknown {
  return asObjectRecord(value)?.[field]
}
