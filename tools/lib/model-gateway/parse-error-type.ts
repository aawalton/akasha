import { shape } from "@akasha/utils-narrow/shape"

const ErrorTypeEnvelopeSchema = shape.looseObject({
  error: shape.looseObject({ type: shape.string() }),
})

export function parseErrorType(bodyText: string): string | null {
  if (bodyText.length === 0) return null
  let parsed: ReturnType<typeof ErrorTypeEnvelopeSchema.safeParse>
  try {
    parsed = ErrorTypeEnvelopeSchema.safeParse(JSON.parse(bodyText))
  } catch {
    return null
  }
  return parsed.success ? parsed.data.error.type : null
}
