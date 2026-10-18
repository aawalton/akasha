import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.computed-property-module.code.ts"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
