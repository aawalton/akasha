export const ALLIANCE_ESO_ID_TO_INDEX: Record<number, number> = {
  [1]: 1,
  [2]: 2,
  [3]: 3,
}
export const ALLIANCE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [1]: "aldmeri-dominion",
  [2]: "ebonheart-pact",
  [3]: "daggerfall-covenant",
}
export function getAllianceIndex(esoAllianceId: number): number {
  return ALLIANCE_ESO_ID_TO_INDEX[esoAllianceId] ?? 0
}
export function getAllianceTemperId(esoAllianceId: number): string {
  return ALLIANCE_ESO_ID_TO_TEMPER_ID[esoAllianceId] ?? "no-alliance"
}
