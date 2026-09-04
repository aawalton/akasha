import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
export function getPerfTracingLevel(): "none" | "minimal" {
  const level = getInventoryConfig().logging?.perfTracing
  return level === "minimal" ? "minimal" : "none"
}

export function finishPerfTrace(startMs: number): { loadTimeMs: number } {
  const endMs = GetGameTimeMilliseconds()
  const loadTimeMs = endMs - startMs
  const result = { loadTimeMs }

  if (getPerfTracingLevel() === "minimal") {
    const msg = `[${ADDON_NAME}] Loaded in ${loadTimeMs}ms`
    const eventName = ADDON_NAME + "_PerfLog"
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
