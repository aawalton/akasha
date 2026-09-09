import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
