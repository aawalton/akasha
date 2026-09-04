import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

internal.LEGACY_EVENT_ID_OFFSET = 3000000000

export function convertEventIdToLegacyId64(this: void, eventId: number): unknown {
  let idString = tostring(eventId)
  assert(idString.length < 10, "eventId is too large to convert")[0]
  while (idString.length < 9) {
    idString = "0" + idString
  }
  return StringToId64("3" + idString)
}

function asId64(value: unknown): Id64 {
  return value as Id64
}

function convertLegacyId64ToEventId(this: void, id64: string): number | undefined {
  const idString = Id64ToString(asId64(id64))
  if (idString === "0") {
    return 0
  }

  let idNumber: number | undefined
  let lostPrecision: boolean | undefined
  if (idString.length === 10 && string.sub(idString, 1, 1) === "3") {
    const id = StringToId64(string.sub(idString, 2))
    ;[idNumber, lostPrecision] = Id64ToNumber(id)
    if (lostPrecision === true) {
      logger.Warn("Lost precision converting legacy eventId", idString)
    }
  }
  if (idNumber == null) {
    logger.Warn("Could not convert legacy eventId", idString)
  }
  return idNumber
}
internal.ConvertLegacyId64ToEventId = convertLegacyId64ToEventId
