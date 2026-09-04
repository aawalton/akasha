import { isRecord } from "../is-record/is-record.module.code.ts"

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined
}
