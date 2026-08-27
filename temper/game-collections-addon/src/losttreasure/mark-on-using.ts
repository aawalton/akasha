import {
  LOST_TREASURE_PIN_TYPE_CLUES,
  LOST_TREASURE_PIN_TYPE_SURVEYS,
  LOST_TREASURE_PIN_TYPE_TREASURE,
  type PinType,
} from "./constants"
import { createLogger } from "./logger"

const logger = createLogger("markOnUsing")

type StringRecord = Record<string, unknown>

function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

const list: Record<PinType, Record<number, true | undefined>> = {
  [LOST_TREASURE_PIN_TYPE_TREASURE]: {},
  [LOST_TREASURE_PIN_TYPE_SURVEYS]: {},
  [LOST_TREASURE_PIN_TYPE_CLUES]: {},
}

function clearList(this: void, table_: Record<string, unknown>): undefined {
  for (const [key, value] of pairs(table_)) {
    if (type(value) === "table") {
      clearList(asStringRecord(value))
    } else {
      table_[key] = undefined
    }
  }
}

export function markOnUsingRemove(this: void, pinType: PinType, itemId: number): undefined {
  const value = list[pinType][itemId]
  list[pinType][itemId] = undefined
  if (value === true) {
    logger.Debug("%d has been removed from %s", itemId, pinType)
  } else {
    logger.Debug("%d has not been found in %s", itemId, pinType)
  }
}

export function markOnUsingDoesExist(this: void, pinType: PinType, itemId: number): boolean {
  return list[pinType][itemId] === true
}

export function markOnUsingAdd(this: void, pinType: PinType, itemId: number): undefined {
  list[pinType][itemId] = true
  logger.Debug("%d has been added to %s", itemId, pinType)
}

export function markOnUsingClear(this: void): undefined {
  clearList(asStringRecord(list))
  logger.Debug("list has been cleared")
}
