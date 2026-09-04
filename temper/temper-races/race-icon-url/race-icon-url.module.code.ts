import type { RaceId } from "../races/races.module.code.ts"

export function getRaceIconUrl(raceId: RaceId): string | null {
  if (raceId === "no-race") return null
  return `https://esoicons.uesp.net/esoui/art/charactercreate/charactercreate_${raceId}icon_up.png`
}
