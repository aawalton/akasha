import type { CatalogWalkVerdict } from "@akasha/temper-catalog-core/catalog-walk"
import { getCatalogDomains } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
import { ADDON_NAME } from "../catalog-constants/catalog-constants.module.code.ts"

export function runProtected(this: void, run: (this: void) => void): string | undefined {
  const [ok, err] = pcall(run)
  if (ok) return undefined
  return typeof err === "string" ? err : "collector failed with a non-string error"
}

export function scheduleLater(this: void, run: (this: void) => void, delayMs: number): undefined {
  zo_callLater(run, delayMs)
}

export function logLine(this: void, message: string): undefined {
  d(`[${ADDON_NAME}] ${message}`)
}

export function hasCollectedDomain(this: void, domainKey: string): boolean {
  const savedVars = getSavedVariables()
  for (const domain of getCatalogDomains()) {
    if (domain.key === domainKey) return savedVars[domain.key] !== undefined
  }
  return false
}

export function writeWalkVerdict(this: void, verdict: CatalogWalkVerdict): undefined {
  const savedVars = getSavedVariables()
  savedVars.completed = verdict.completed
  if (verdict.skips.length === 0) {
    savedVars.collectionSkips = undefined
    return
  }
  const skipRecord: Record<string, string> = {}
  for (const skip of verdict.skips) {
    skipRecord[skip.domain] = skip.reason
    d(`[${ADDON_NAME}] Skipped ${skip.domain}: ${skip.reason}`)
  }
  savedVars.collectionSkips = skipRecord
}
