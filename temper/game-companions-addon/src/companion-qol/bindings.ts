import { asNumber, asRecord } from "./casts"
import { FCOCO } from "./state"

export function registerBindingStringIds(this: void): undefined {
  if (!FCOCO.isCompanionUnlocked) {
    return undefined
  }

  ZO_CreateStringId("SI_BINDING_NAME_FCOCO_TOGGLE_COMPANION", GetString(FCOCO_TOGGLE_COMPANION))

  const companionInfo = FCOCO.companionInfo
  for (let companionDefId = 1; companionDefId <= 30; companionDefId += 1) {
    if (companionInfo[companionDefId] !== undefined) {
      const idSuffix = tostring(companionDefId)
      const dynamicStringId = asNumber(asRecord(globalThis)[`FCOCO_TOGGLE_COMPANION_${idSuffix}`])
      ZO_CreateStringId(
        `SI_BINDING_NAME_FCOCO_TOGGLE_COMPANION_${idSuffix}`,
        GetString(dynamicStringId)
      )
    }
  }
  return undefined
}
