import { isObjectRecord } from "@temper/shared-narrow"

export function startPerfTrace(): number {
  return GetGameTimeMilliseconds()
}

declare global {
  var TemperInventory_SavedVariables: unknown
}

function getPerfTracingLevel(): "none" | "minimal" {
  const invSv: unknown = globalThis.TemperInventory_SavedVariables
  if (!isObjectRecord(invSv)) return "none"
  const defaultTable = invSv["Default"]
  if (!isObjectRecord(defaultTable)) return "none"
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = defaultTable[key]
      if (!isObjectRecord(accountTable)) continue
      const accountWide = accountTable["$AccountWide"]
      if (!isObjectRecord(accountWide)) continue
      const logging = accountWide["logging"]
      if (!isObjectRecord(logging)) return "none"
      const level = logging["perfTracing"]
      return level === "minimal" ? "minimal" : "none"
    }
  }
  return "none"
}

export function finishPerfTrace(addonName: string, startMs: number): { loadTimeMs: number } {
  const endMs = GetGameTimeMilliseconds()
  const loadTimeMs = endMs - startMs
  const result = { loadTimeMs }

  if (getPerfTracingLevel() === "minimal") {
    const msg = `[${addonName}] Loaded in ${loadTimeMs}ms`
    const eventName = addonName + "_PerfLog"
    EVENT_MANAGER.RegisterForEvent(
      eventName,
      EVENT_PLAYER_ACTIVATED,
      function (this: void): undefined {
        EVENT_MANAGER.UnregisterForEvent(eventName, EVENT_PLAYER_ACTIVATED)
        d(msg)
      }
    )
  }

  return result
}
