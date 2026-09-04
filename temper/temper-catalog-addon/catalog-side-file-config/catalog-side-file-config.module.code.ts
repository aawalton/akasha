import type { PendingInvalidation } from "@akasha/temper-catalog-core/apply-invalidations"

function isStringArray(value: unknown): value is readonly string[] {
  if (!Array.isArray(value)) return false
  for (const element of value) {
    if (typeof element !== "string") return false
  }
  return true
}

function isCatalogConfig(value: unknown): value is TemperCatalogConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  if (!("invalidateVersion" in value)) return false
  if (typeof value.version !== "number" || typeof value.invalidateVersion !== "number") return false
  if ("invalidateDomains" in value && value.invalidateDomains !== undefined) {
    return isStringArray(value.invalidateDomains)
  }
  return true
}

export function getPendingInvalidation(): PendingInvalidation | undefined {
  const candidate: unknown = globalThis.TemperCatalogConfig
  if (!isCatalogConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return {
    version: candidate.version,
    invalidateVersion: candidate.invalidateVersion,
    invalidateDomains: candidate.invalidateDomains ?? [],
  }
}
