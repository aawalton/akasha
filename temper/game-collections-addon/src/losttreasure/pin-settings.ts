import type { PinType } from "./constants"
import { createLogger } from "./logger"
import { getSavedVars, type PinTypeSettings } from "./saved-variables"

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
