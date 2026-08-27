import { getEsoDayStr } from "../../../day/day"

export function getEsoDateString(): string {
  return getEsoDayStr(new Date())
}
