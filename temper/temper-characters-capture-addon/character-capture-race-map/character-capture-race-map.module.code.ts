export const RACE_ESO_ID_TO_INDEX: Record<number, number> = {
  [1]: 1,
  [2]: 2,
  [3]: 3,
  [4]: 4,
  [5]: 5,
  [6]: 6,
  [7]: 7,
  [8]: 8,
  [9]: 9,
  [10]: 10,
}
export const RACE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [1]: "breton",
  [2]: "redguard",
  [3]: "orc",
  [4]: "dunmer",
  [5]: "nord",
  [6]: "argonian",
  [7]: "altmer",
  [8]: "bosmer",
  [9]: "khajiit",
  [10]: "imperial",
}
export function getRaceIndex(esoRaceId: number): number {
  return RACE_ESO_ID_TO_INDEX[esoRaceId] ?? 0
}
export function getRaceTemperId(esoRaceId: number): string {
  return RACE_ESO_ID_TO_TEMPER_ID[esoRaceId] ?? "no-race"
}
