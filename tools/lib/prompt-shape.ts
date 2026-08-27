
import { shape } from "./shape.ts"

export const CHANNEL_ENVELOPE_PREFIX = "<channel "

export const SUPERVISOR_NOTICE_PREFIX = "[supervisor]"

export const TASK_NOTIFICATION_PREFIX = "<task-notification>"

export const SLASH_COMMAND_PREFIX = "/"

export const SYSTEM_SENDER = "system"

export const SYSTEM_SOURCE_TYPE = "system"

const capturesAtLeast = (least: number) =>
  shape.array(shape.string()).refine((items) => items.length >= least, {
    message: `Too small: expected array to have >=${least} items`,
  })

const channelMatchSchema = capturesAtLeast(3)
const attrMatchSchema = capturesAtLeast(2)

export interface ChannelEnvelope {
  readonly source: string
  readonly sourceType: string
  readonly sender: string
  readonly text: string
}

function readAttr(attrs: string, name: string): string | null {
  const m = attrMatchSchema.safeParse(new RegExp(`${name}="([^"]*)"`).exec(attrs))
  return m.success ? (m.data[1] ?? null) : null
}

export function parseChannelEnvelope(content: string): ChannelEnvelope | null {
  if (!content.includes(CHANNEL_ENVELOPE_PREFIX)) return null
  const match = channelMatchSchema.safeParse(
    /<channel\b([^>]*)>([\s\S]*?)<\/channel>/.exec(content)
  )
  if (!match.success) return null
  const attrs = match.data[1] ?? ""
  const text = (match.data[2] ?? "").trim()
  return {
    source: readAttr(attrs, "source") ?? "",
    sourceType: readAttr(attrs, "source_type") ?? "user",
    sender: readAttr(attrs, "sender") ?? SYSTEM_SENDER,
    text,
  }
}

export type PromptShape =
  | { readonly kind: "channel"; readonly envelope: ChannelEnvelope }
  | { readonly kind: "bare"; readonly text: string }

export function classifyPromptShape(promptText: string): PromptShape {
  const envelope = parseChannelEnvelope(promptText)
  if (envelope !== null) return { kind: "channel", envelope }
  return { kind: "bare", text: promptText }
}

export function isBareKeyboardPrompt(promptText: string): boolean {
  const shape = classifyPromptShape(promptText)
  if (shape.kind !== "bare") return false
  const text = shape.text.trim()
  if (text === "") return false
  if (text.startsWith(SLASH_COMMAND_PREFIX)) return false
  if (text.startsWith(SUPERVISOR_NOTICE_PREFIX)) return false
  if (text.startsWith(TASK_NOTIFICATION_PREFIX)) return false
  return true
}

export function isAlanAuthoredPrompt(promptText: string): boolean {
  if (isBareKeyboardPrompt(promptText)) return true
  const shape = classifyPromptShape(promptText)
  return (
    shape.kind === "channel" &&
    shape.envelope.sender === SYSTEM_SENDER &&
    shape.envelope.sourceType !== SYSTEM_SOURCE_TYPE
  )
}
