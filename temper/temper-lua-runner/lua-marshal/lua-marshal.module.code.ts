const ESCAPES: Readonly<Record<string, string>> = {
  "\\": "\\\\",
  '"': '\\"',
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
  "\b": "\\b",
  "\f": "\\f",
}

const LEAST_PRINTABLE = 32

export function luaStringLiteral(value: string): string {
  let out = '"'
  for (const ch of value) {
    const replacement = ESCAPES[ch]
    if (replacement !== undefined) {
      out += replacement
      continue
    }
    const code = ch.charCodeAt(0)
    if (code < LEAST_PRINTABLE) {
      out += `\\${code.toString().padStart(3, "0")}`
      continue
    }
    out += ch
  }
  return `${out}"`
}

export function marshalLuaValue(value: unknown): string {
  if (value === null || value === undefined) return "nil"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") {
    if (Number.isNaN(value)) return "0/0"
    if (value === Number.POSITIVE_INFINITY) return "math.huge"
    if (value === Number.NEGATIVE_INFINITY) return "-math.huge"
    return String(value)
  }
  if (typeof value === "string") return luaStringLiteral(value)
  if (Array.isArray(value)) {
    return `{${value.map((entry) => marshalLuaValue(entry)).join(", ")}}`
  }
  if (typeof value === "object") {
    const parts: string[] = []
    for (const [key, one] of Object.entries(value)) {
      parts.push(`[${luaStringLiteral(key)}] = ${marshalLuaValue(one)}`)
    }
    return `{${parts.join(", ")}}`
  }
  throw new Error(`a ${typeof value} has no Lua literal to be written as`)
}

export function luaLongStringLiteral(value: string): string {
  let level = 0
  while (value.includes(`]${"=".repeat(level)}]`)) {
    level += 1
  }
  const eqs = "=".repeat(level)
  return `[${eqs}[\n${value}]${eqs}]`
}
