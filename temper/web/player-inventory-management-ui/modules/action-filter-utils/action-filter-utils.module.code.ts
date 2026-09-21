interface ParsedActionFilter {
  action: string | null
  sub: string | null
  sub2: string | null
}

function encodeSegment(s: string): string {
  return s.replace(/%/g, "%25").replace(/:/g, "%3A")
}

function decodeSegment(s: string): string {
  return s.replace(/%3A/g, ":").replace(/%25/g, "%")
}

export function parseActionFilter(value: string | null): ParsedActionFilter {
  if (value == null || value === "") return { action: null, sub: null, sub2: null }
  const parts = value.split(":")
  const action = parts[0] != null && parts[0] !== "" ? parts[0] : null
  if (parts.length === 1) return { action, sub: null, sub2: null }
  const subDecoded = decodeSegment(parts[1] ?? "")
  const sub = subDecoded !== "" ? subDecoded : null
  if (parts.length === 2) return { action, sub, sub2: null }
  const sub2Decoded = decodeSegment(parts.slice(2).join(":"))
  const sub2 = sub2Decoded !== "" ? sub2Decoded : null
  return { action, sub, sub2 }
}

export function buildActionFilter(
  action: string | null,
  sub: string | null,
  sub2?: string | null
): string | null {
  if (action == null) return null
  if (sub == null) return action
  const encodedSub = encodeSegment(sub)
  if (sub2 == null) return `${action}:${encodedSub}`
  return `${action}:${encodedSub}:${encodeSegment(sub2)}`
}

export const NULL_SENTINEL = "__all__"
