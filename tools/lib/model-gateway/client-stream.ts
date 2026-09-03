import { shape } from "@akasha/utils-narrow/shape"

const StreamFlagShape = shape.looseObject({ stream: shape.boolean().optional() })

export function parseClientStreamFlag(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  let parsed: ReturnType<typeof StreamFlagShape.safeParse>
  try {
    parsed = StreamFlagShape.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
  } catch {
    return false
  }
  return parsed.success && parsed.data.stream === true
}
