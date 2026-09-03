import { shape } from "@akasha/utils-narrow/shape"
import type { Infer } from "@akasha/utils-narrow/shape-core"

const FABLE_MODEL_PREFIX = "claude-fable-"

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

export function isFableRequest(bodyBuffer: ArrayBuffer | null): boolean {
  if (bodyBuffer == null) return false
  const model = parseBody(bodyBuffer)?.model
  return model?.startsWith(FABLE_MODEL_PREFIX) === true
}
