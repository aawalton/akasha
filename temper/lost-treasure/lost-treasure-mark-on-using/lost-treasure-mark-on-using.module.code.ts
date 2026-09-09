import {
  LOST_TREASURE_PIN_TYPE_CLUES,
  LOST_TREASURE_PIN_TYPE_SURVEYS,
  LOST_TREASURE_PIN_TYPE_TREASURE,
  type PinType,
} from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"

const logger = createLogger("markOnUsing")

type StringRecord = Record<string, unknown>

function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

const LIST: Record<PinType, Record<number, true | undefined>> = {
  [LOST_TREASURE_PIN_TYPE_TREASURE]: {},
  [LOST_TREASURE_PIN_TYPE_SURVEYS]: {},
  [LOST_TREASURE_PIN_TYPE_CLUES]: {},
}

function clearList(this: void, entries: Record<string, unknown>): undefined {
  for (const [key, value] of pairs(entries)) {
    if (type(value) === "table") {
      clearList(asStringRecord(value))
    } else {
      entries[key] = undefined
    }
  }
}

export function markOnUsingRemove(this: void, pinType: PinType, itemId: number): undefined {
  const value = LIST[pinType][itemId]
  LIST[pinType][itemId] = undefined
  if (value === true) {
    logger.Debug("%d has been removed from %s", itemId, pinType)
  } else {
    logger.Debug("%d has not been found in %s", itemId, pinType)
  }
}

export function markOnUsingDoesExist(this: void, pinType: PinType, itemId: number): boolean {
  return LIST[pinType][itemId] === true
}

export function markOnUsingAdd(this: void, pinType: PinType, itemId: number): undefined {
  LIST[pinType][itemId] = true
  logger.Debug("%d has been added to %s", itemId, pinType)
}

export function markOnUsingClear(this: void): undefined {
  clearList(asStringRecord(LIST))
  logger.Debug("LIST has been cleared")
}
