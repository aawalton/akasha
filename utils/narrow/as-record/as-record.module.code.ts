import { isRecord } from "akasha/utils/narrow/is-record/is-record.module.code.ts"

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined
}

export function asRecordOrEmpty(value: unknown): Record<string, unknown> {
  return asRecord(value) ?? {}
}
