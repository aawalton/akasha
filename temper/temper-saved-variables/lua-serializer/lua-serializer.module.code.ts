function escapeLuaString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
}

function formatLuaKey(key: string): string {
  if (/^\d{1,9}$/.test(key)) return `[${key}]`
  return `["${escapeLuaString(key)}"]`
}

function serializeLuaValue(value: unknown, indent: string): string {
  if (value === null || value === undefined) return "nil"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "number") return String(value)
  if (typeof value === "string") return `"${escapeLuaString(value)}"`

  if (Array.isArray(value)) {
    if (value.length === 0) return "{}"

    const innerIndent = indent + "    "
    const lines: string[] = ["{"]
    for (const item of value) {
      lines.push(`${innerIndent}${serializeLuaValue(item, innerIndent)},`)
    }
    lines.push(`${indent}}`)
    return lines.join("\n")
  }

  if (typeof value === "object") {
    const entries: [string, unknown][] = Object.entries(value)
    if (entries.length === 0) return "{}"

    const innerIndent = indent + "    "
    const lines: string[] = ["{"]
    for (const [key, val] of entries) {
      const luaKey = formatLuaKey(key)
      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        lines.push(`${innerIndent}${luaKey} =`)
        lines.push(`${innerIndent}${serializeLuaValue(val, innerIndent)},`)
      } else {
        lines.push(`${innerIndent}${luaKey} = ${serializeLuaValue(val, innerIndent)},`)
      }
    }
    lines.push(`${indent}}`)
    return lines.join("\n")
  }

  return "nil"
}

export function serializeLuaBlock(key: string, value: unknown, indent: string): readonly string[] {
  const lines: string[] = []
  lines.push(`${indent}["${escapeLuaString(key)}"] =`)
  lines.push(`${indent}${serializeLuaValue(value, indent)},`)
  return lines
}
