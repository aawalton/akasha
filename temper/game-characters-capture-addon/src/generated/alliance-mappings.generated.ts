/**
 * Alliance Mappings (Generated)
 *
 * Maps ESO alliance IDs to temper indices and string IDs.
 * Source: engine/character/alliances-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const ALLIANCE_ESO_ID_TO_INDEX: Record<number, number> = {
  [1]: 1, // Aldmeri Dominion
  [2]: 2, // Ebonheart Pact
  [3]: 3, // Daggerfall Covenant
}

export const ALLIANCE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [1]: "aldmeri-dominion", // Aldmeri Dominion
  [2]: "ebonheart-pact", // Ebonheart Pact
  [3]: "daggerfall-covenant", // Daggerfall Covenant
}

export function getAllianceIndex(esoAllianceId: number): number {
  return ALLIANCE_ESO_ID_TO_INDEX[esoAllianceId] ?? 0
}

export function getAllianceTemperId(esoAllianceId: number): string {
  return ALLIANCE_ESO_ID_TO_TEMPER_ID[esoAllianceId] ?? "no-alliance"
}
