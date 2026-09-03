import { shape } from "@akasha/utils-narrow/shape"
import type { Infer } from "@akasha/utils-narrow/shape-core"
import { isExtendedWire, stripExtendedWire } from "../model-vocab.ts"

const ModelRequestSchema = shape.looseObject({ model: shape.string().optional() })

function parseBody(bodyBuffer: ArrayBuffer): Infer<typeof ModelRequestSchema> | null {
  let parsed: ReturnType<typeof ModelRequestSchema.safeParse>
  try {
    parsed = ModelRequestSchema.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
  } catch {
    return null
  }
  return parsed.success ? parsed.data : null
}

export function isExtendedContextRequest(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  const model = parseBody(bodyBuffer)?.model
  return model != null && isExtendedWire(model)
}

export function rewriteModelToStrippedSibling(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  const body = parseBody(bodyBuffer)
  if (body == null) return null
  const model = body.model
  if (model == null || !isExtendedWire(model)) return null
  const stripped = stripExtendedWire(model)
  if (stripped === model) return null
  const rewritten = { ...body, model: stripped }
  return encodeToArrayBuffer(JSON.stringify(rewritten))
}

function encodeToArrayBuffer(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}
