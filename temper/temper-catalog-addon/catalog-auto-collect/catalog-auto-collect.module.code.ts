import { type CatalogWalkVerdict, runCatalogWalk } from "@akasha/temper-catalog-core/catalog-walk"
import {
  type CatalogDomainEntry,
  getCatalogDomains,
} from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
import {
  hasCollectedDomain,
  logLine,
  runProtected,
  scheduleLater,
  writeWalkVerdict,
} from "../catalog-collect-adapters/catalog-collect-adapters.module.code.ts"
import {
  ADDON_NAME,
  DOMAIN_DELAY,
  DOMAIN_TIMEOUT,
} from "../catalog-constants/catalog-constants.module.code.ts"

export function autoCollect(): undefined {
  const savedVars = getSavedVariables()
  const currentApiVersion = GetESOVersionString()
  const currentManifestApiVersion = GetAPIVersion()

  if (savedVars.apiVersion !== undefined && savedVars.apiVersion !== currentApiVersion) {
    d(
      `[${ADDON_NAME}] API version changed (${savedVars.apiVersion} -> ${currentApiVersion}), invalidating all catalogs.`
    )
    for (const domain of getCatalogDomains()) {
      savedVars[domain.key] = undefined
    }
    savedVars.completed = false
    savedVars.collectionSkips = undefined
  }

  const pending: CatalogDomainEntry[] = []
  for (const domain of getCatalogDomains()) {
    if (savedVars[domain.key] === undefined) {
      pending.push(domain)
    }
  }

  if (pending.length === 0) {
    savedVars.completed = true
    savedVars.collectionSkips = undefined
    savedVars.apiVersion = currentApiVersion
    savedVars.manifestApiVersion = currentManifestApiVersion
    d(`[${ADDON_NAME}] All catalogs already collected, marking complete.`)
    return
  }

  d(`[${ADDON_NAME}] Auto-collecting ${pending.length} remaining catalog(s)...`)

  runCatalogWalk(
    pending,
    {
      attempt: runProtected,
      schedule: scheduleLater,
      hasCollected: hasCollectedDomain,
      log: logLine,
    },
    { domainDelayMs: DOMAIN_DELAY, domainTimeoutMs: DOMAIN_TIMEOUT },
    function (this: void, verdict: CatalogWalkVerdict): undefined {
      writeWalkVerdict(verdict)
      const finalSavedVars = getSavedVariables()
      finalSavedVars.apiVersion = currentApiVersion
      finalSavedVars.manifestApiVersion = currentManifestApiVersion
      if (verdict.completed) {
        d(`[${ADDON_NAME}] Auto-collection complete.`)
      } else {
        d(
          `[${ADDON_NAME}] Auto-collection finished with ${verdict.collected.length} collected, ${verdict.skips.length} skipped — run /tempercatalog status for details.`
        )
      }
    }
  )
}
