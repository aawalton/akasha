import { decideClearTarget } from "@akasha/temper-catalog-core/clear-target"
import { getCatalogDomains } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
import { ADDON_NAME } from "../catalog-constants/catalog-constants.module.code.ts"

export function parseLuaCommand(captured: string | undefined): string | undefined {
  return captured
}

export function clearCatalogs(target: string | undefined): undefined {
  const savedVars = getSavedVariables()
  const domains = getCatalogDomains()
  const decision = decideClearTarget(
    target,
    domains.map((domain) => domain.key)
  )

  if (decision.kind === "all") {
    for (const domain of domains) {
      savedVars[domain.key] = undefined
    }
    savedVars.completed = false
    savedVars.collectionSkips = undefined
    d(`[${ADDON_NAME}] All catalog data cleared. Will re-collect on next login.`)
    return
  }

  if (decision.kind === "one") {
    for (const domain of domains) {
      if (domain.key === decision.domainKey) {
        savedVars[domain.key] = undefined
        savedVars.completed = false
        savedVars.collectionSkips = undefined
        d(`[${ADDON_NAME}] Cleared ${domain.key}. Will re-collect on next login.`)
        return
      }
    }
    return
  }

  if (decision.kind === "unknown") {
    d(
      `[${ADDON_NAME}] Unknown catalog domain "${decision.requested}" — nothing cleared. /tempercatalog status lists the keys.`
    )
    return
  }

  d(`[${ADDON_NAME}] "clear" needs a target and cleared nothing.`)
  d(`  /tempercatalog clear all          — wipe every domain`)
  d(`  /tempercatalog clear <domainKey>  — wipe one domain`)
  const skips = savedVars.collectionSkips
  if (skips === undefined) return
  d(`  Skipped on the last collection pass, and worth targeting:`)
  for (const domain of domains) {
    const reason = skips[domain.key]
    if (reason !== undefined) d(`    ${domain.key} — ${reason}`)
  }
}

export function printStatus(): undefined {
  const savedVars = getSavedVariables()
  const skips = savedVars.collectionSkips
  d(`[${ADDON_NAME}] Catalog status (completed: ${savedVars.completed}):`)
  for (const domain of getCatalogDomains()) {
    if (savedVars[domain.key] !== undefined) {
      d(`  ${domain.key}: collected`)
      continue
    }
    const reason = skips === undefined ? undefined : skips[domain.key]
    if (reason === undefined) {
      d(`  ${domain.key}: pending`)
    } else {
      d(`  ${domain.key}: skipped — ${reason}`)
    }
  }
}
