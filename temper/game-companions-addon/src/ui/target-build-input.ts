import { ensureCompanionEntry, getSavedVariables } from "../saved-variables"
export function getTargetBuildHash(companionId: number): string | undefined {
  const savedVars = getSavedVariables()
  const hash = savedVars.companions[companionId]?.targetBuildHash
  if (hash === undefined || hash === "") return undefined
  return hash
}

export function setTargetBuildHash(companionId: number, hash: string): undefined {
  ensureCompanionEntry(companionId).targetBuildHash = hash
}
