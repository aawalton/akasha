import { asSavedVarsTable } from "../zone-casts/zone-casts.module.code.ts"
import { lib } from "../zone-lib-state/zone-lib-state.module.code.ts"

export function applyZoneNameFallbacks(this: void): undefined {
  const referenceZoneNamesEN = lib.preloadedZoneNames.en
  if (referenceZoneNamesEN === undefined) return
  const jp = lib.preloadedZoneNames.jp
  if (jp !== undefined) setmetatable(jp, { __index: referenceZoneNamesEN })
  const pl = lib.preloadedZoneNames.pl
  if (pl !== undefined) setmetatable(pl, { __index: referenceZoneNamesEN })
}

export function removeNonLiveAPIVersionEntries(this: void): undefined {
  const preloadedZoneNames = lib.preloadedZoneNames
  const clientLang = lib.currentClientLanguage

  const zoneIdsOfDifferentAPIVersion: Record<number, number[]> = {}
  const nextApi = GetAPIVersion() + 1
  zoneIdsOfDifferentAPIVersion[nextApi] = []

  for (const [lang, zoneData] of pairs(preloadedZoneNames)) {
    if (lang === clientLang) {
      for (const [zoneId] of pairs(zoneData)) {
        const currentAPIsZoneName = GetZoneNameById(zoneId)
        if (currentAPIsZoneName === undefined || currentAPIsZoneName === "") {
          zoneIdsOfDifferentAPIVersion[nextApi].push(zoneId)
        }
      }
    }
  }

  const currentAPIVersion = lib.currentAPIVersion
  for (const [apiVersionToCheck, zoneIdsToRemove] of pairs(zoneIdsOfDifferentAPIVersion)) {
    if (apiVersionToCheck >= 100000 && apiVersionToCheck > currentAPIVersion) {
      for (const [languageToCheck, zoneIds] of pairs(preloadedZoneNames)) {
        if (lib.checkIfLanguageIsSupported(languageToCheck)) {
          const removable = asSavedVarsTable(zoneIds)
          for (const [, zoneIdToRemove] of ipairs(zoneIdsToRemove)) {
            if (zoneIds[zoneIdToRemove] !== undefined) {
              removable[zoneIdToRemove] = undefined
            }
          }
        }
      }
    }
  }
}
