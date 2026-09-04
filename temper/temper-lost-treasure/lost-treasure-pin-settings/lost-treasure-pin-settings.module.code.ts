import type { PinType } from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import {
  getSavedVars,
  type PinTypeSettings,
} from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"

const logger = createLogger("pinSettings")

export function getSettingsFromPinType<K extends keyof PinTypeSettings>(
  this: void,
  pinType: PinType,
  key: K
): PinTypeSettings[K] {
  return getSavedVars().pinTypes[pinType][key]
}

export function getSettingDeletionDelay(this: void, pinType?: PinType): number {
  const db = getSavedVars()
  const isMinimap = pinType === undefined
  const deletionDelay = isMinimap ? db.miniMap.deletionDelay : db.pinTypes[pinType].deletionDelay

  logger.Debug(
    "Deletion delay pinType: %s, deletionDelay: %d",
    isMinimap ? "minimap" : pinType,
    deletionDelay
  )
  return deletionDelay
}
