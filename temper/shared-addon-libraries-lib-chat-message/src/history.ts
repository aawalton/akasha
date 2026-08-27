import { asString } from "./casts"
import { MAX_HISTORY_LENGTH, TRIMMED_HISTORY_LENGTH } from "./constants"
import { lib } from "./lib-state"
import { writeToSavedVariable } from "./saved-data"
import type { HistoryEntry } from "./types"

export function getFormattedTime(this: void, timeStamp: number): string {
  const settings = lib.settings ?? lib.defaultSettings
  return asString(os.date(settings.timePrefixFormat, timeStamp))
}

export function getTimeStampForEvent(this: void): LuaMultiReturn<[number, boolean]> {
  if (lib.nextEventTimeStamp !== undefined) {
    return $multi(lib.nextEventTimeStamp, true)
  }
  return $multi(GetTimeStamp(), false)
}

export function storeChatEvent(
  this: void,
  timeStamp: number,
  eventType: string | number,
  ...args: unknown[]
): undefined {
  if (!lib.chatHistoryActive) {
    return
  }
  const entry: HistoryEntry = [timeStamp, eventType]
  const count = select("#", ...args)
  for (let i = 1; i <= count; i += 1) {
    const [value] = select(i, ...args)
    entry[entry.length] = writeToSavedVariable(value)
  }

  let chatHistory = lib.chatHistory
  chatHistory[chatHistory.length] = entry
  if (chatHistory.length > MAX_HISTORY_LENGTH) {
    const newHistory: HistoryEntry[] = []
    const startIndex = chatHistory.length - TRIMMED_HISTORY_LENGTH
    for (let i = startIndex; i <= chatHistory.length; i += 1) {
      const item = chatHistory[i - 1]
      if (item !== undefined) {
        newHistory[newHistory.length] = item
      }
    }
    chatHistory = newHistory
  }
}
