import { shape } from "@akasha/utils-narrow/shape"
import { AnthropicErrorEnvelopeSchema } from "../oauth-schemas.ts"

const FORCED_TOOL_CHOICE_MESSAGE_PREFIX = "tool_choice forces tool use is not compatible"

export function isForcedToolChoiceRejection(status: number, body: string): boolean {
  if (status !== 400) return false
  let parsed: ReturnType<typeof AnthropicErrorEnvelopeSchema.safeParse>
  try {
    parsed = AnthropicErrorEnvelopeSchema.safeParse(JSON.parse(body))
  } catch {
    return false
  }
  if (!parsed.success) return false
  if (parsed.data.error.type !== "invalid_request_error") return false
  return parsed.data.error.message?.startsWith(FORCED_TOOL_CHOICE_MESSAGE_PREFIX) ?? false
}

const ToolChoiceRequestSchema = shape.looseObject({
  tool_choice: shape.looseObject({ type: shape.string() }).optional(),
})

export function rewriteForcedToolChoiceToAuto(bodyBuffer: ArrayBuffer): ArrayBuffer | null {
  let parsed: ReturnType<typeof ToolChoiceRequestSchema.safeParse>
  try {
    parsed = ToolChoiceRequestSchema.safeParse(JSON.parse(new TextDecoder().decode(bodyBuffer)))
  } catch {
    return null
  }
  if (!parsed.success) return null
  const toolChoiceType = parsed.data.tool_choice?.type
  if (toolChoiceType !== "tool" && toolChoiceType !== "any") return null
  const rewritten = { ...parsed.data, tool_choice: { type: "auto" } }
  return encodeToArrayBuffer(JSON.stringify(rewritten))
}

function encodeToArrayBuffer(text: string): ArrayBuffer {
  const encoded = new TextEncoder().encode(text)
  const out = new ArrayBuffer(encoded.byteLength)
  new Uint8Array(out).set(encoded)
  return out
}
