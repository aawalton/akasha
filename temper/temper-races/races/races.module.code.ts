import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface RaceTemplate {
  id: string
  name: string
  altName: string
  esoRaceId: number
}

const RACE_DATA = {
  "no-race": { id: "no-race" as const, name: "No Race", altName: "", esoRaceId: 0 },
  "breton": { id: "breton" as const, name: "Breton", altName: "", esoRaceId: 1 },
  "redguard": { id: "redguard" as const, name: "Redguard", altName: "", esoRaceId: 2 },
  "orc": { id: "orc" as const, name: "Orc", altName: "Orsimer", esoRaceId: 3 },
  "dunmer": { id: "dunmer" as const, name: "Dark Elf", altName: "Dunmer", esoRaceId: 4 },
  "nord": { id: "nord" as const, name: "Nord", altName: "", esoRaceId: 5 },
  "argonian": { id: "argonian" as const, name: "Argonian", altName: "", esoRaceId: 6 },
  "altmer": { id: "altmer" as const, name: "High Elf", altName: "Altmer", esoRaceId: 7 },
  "bosmer": { id: "bosmer" as const, name: "Wood Elf", altName: "Bosmer", esoRaceId: 8 },
  "khajiit": { id: "khajiit" as const, name: "Khajiit", altName: "", esoRaceId: 9 },
  "imperial": { id: "imperial" as const, name: "Imperial", altName: "", esoRaceId: 10 },
} satisfies Record<string, RaceTemplate>

export const races = createDataFile<RaceTemplate>()(RACE_DATA)

export type RaceId = (typeof races.ids)[number]
