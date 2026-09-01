import { getEsoDayStr } from "@shared/day"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
