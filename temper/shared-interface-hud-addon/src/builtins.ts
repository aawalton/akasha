import { formatDuration, formatFramerate, formatLatency } from "./format"
import { registerHudField } from "./hud-bar"
import { getSavedVariables } from "./saved-variables"
import type { HudCell } from "./types"

function framerateCell(): HudCell {
  return { text: formatFramerate(GetFramerate()) }
}

function latencyCell(): HudCell {
  return { text: formatLatency(GetLatency()) }
}

function sessionCell(): HudCell {
  const elapsed = GetTimeStamp() - getSavedVariables().session.startTime
  return { text: formatDuration(elapsed) }
}

export function ensureSession(): undefined {
  const sv = getSavedVariables()
  if (sv.session.startTime === 0) resetSession()
}

export function resetSession(): undefined {
  getSavedVariables().session = { startTime: GetTimeStamp() }
}

export function installBuiltinFields(): undefined {
  ensureSession()
  registerHudField({ id: "framerate", order: 10, compute: framerateCell })
  registerHudField({ id: "latency", order: 20, compute: latencyCell })
  registerHudField({ id: "session", order: 30, compute: sessionCell })
}
