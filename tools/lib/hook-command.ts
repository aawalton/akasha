const UNREADABLE = 5

function fieldOf(payload: unknown, name: string, hook: string): unknown {
  if (payload === null) return null
  if (typeof payload !== "object" || Array.isArray(payload)) {
    process.stderr.write(`${hook}: the hook payload is not an object, so nothing was checked\n`)
    process.exit(UNREADABLE)
  }
  return (payload as Record<string, unknown>)[name]
}

function texted(held: unknown): string {
  if (held === null || held === undefined || held === false) return ""
  return typeof held === "string" ? held : String(held)
}

export function toolInputText(raw: string, key: string, hook: string): string {
  if (raw.trim() === "") return ""
  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    process.stderr.write(`${hook}: the hook payload would not parse, so nothing was checked\n`)
    process.exit(UNREADABLE)
  }
  return texted(fieldOf(fieldOf(payload, "tool_input", hook), key, hook))
}

export function payloadText(raw: string, key: string): string {
  if (raw.trim() === "") return ""
  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    return ""
  }
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) return ""
  return texted((payload as Record<string, unknown>)[key])
}
