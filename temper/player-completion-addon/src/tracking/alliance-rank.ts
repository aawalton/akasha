import { getSavedVariables } from "../saved-variables"
export function collectAllianceRank(): undefined {
  const charId = GetCurrentCharacterId()
  const charEntry = getSavedVariables().characters[charId]
  if (charEntry === undefined) return
  const [avaRank = 0] = GetUnitAvARank("player")
  charEntry.allianceRank = avaRank
}

export function updateAllianceRank(): undefined {
  collectAllianceRank()
}
