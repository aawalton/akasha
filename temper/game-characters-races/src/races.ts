import type { races } from "./generated/temper-race.generated"

export interface RaceTemplate {
  id: string
  name: string
  altName: string
  esoRaceId: number
}

export type RaceId = (typeof races.ids)[number]

export function getRaceIconUrl(raceId: RaceId): string | null {
  if (raceId === "no-race") return null
  return `https://esoicons.uesp.net/esoui/art/charactercreate/charactercreate_${raceId}icon_up.png`
}
