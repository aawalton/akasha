import { getEsoDayStr } from "akasha/alan/harness/day/modules/eso-day/eso-day.module.code.ts"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
