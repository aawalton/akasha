import { parseSender } from "@akasha/email-inbound/sender"
import type { ComposeInput } from "@akasha/google-email/types"
import type { ParsedArgs } from "./parse-args.ts"

export type EmailGoogle = typeof import("@akasha/google-email/messages") &
  typeof import("@akasha/google-email/drafts") &
  typeof import("@akasha/google-email/attachments") &
  typeof import("@akasha/google-email/client") &
  typeof import("@akasha/google-email/env") &
  typeof import("@akasha/google-email/schema") &
  typeof import("@akasha/google-email/unsubscribe")

interface Sender {
  readonly name: string
  readonly email: string
}

export async function emailGoogle(): Promise<EmailGoogle> {
  const parts = await Promise.all([
    import("@akasha/google-email/messages"),
    import("@akasha/google-email/drafts"),
    import("@akasha/google-email/attachments"),
    import("@akasha/google-email/client"),
    import("@akasha/google-email/env"),
    import("@akasha/google-email/schema"),
    import("@akasha/google-email/unsubscribe"),
  ])
  return Object.assign({}, ...parts) as EmailGoogle
}

function splitAddresses(values: readonly string[]): readonly string[] {
  return values
    .flatMap((value) => value.split(","))
    .map((part) => part.trim())
    .filter((part) => part !== "")
}

function stripSurroundingQuotes(s: string): string {
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1).trim()
  return s
}

function parseFromFlag(value: string | undefined): Sender | undefined {
  if (value === undefined) return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const lt = trimmed.indexOf("<")
  if (lt >= 0 && trimmed.endsWith(">")) {
    const name = stripSurroundingQuotes(trimmed.slice(0, lt).trim())
    const { address } = parseSender(trimmed.slice(lt))
    return { name, email: address }
  }
  const { address } = parseSender(trimmed)
  return { name: "", email: address }
}

export async function buildComposeInput(parsed: ParsedArgs): Promise<ComposeInput> {
  const cc = splitAddresses(parsed.repeated("--cc"))
  const bcc = splitAddresses(parsed.repeated("--bcc"))
  const google = await emailGoogle()
  const attachments = await Promise.all(
    parsed.repeated("--attach").map((path) => google.loadAttachmentFile(path))
  )
  return {
    to: splitAddresses(parsed.repeated("--to")),
    cc: cc.length > 0 ? cc : undefined,
    bcc: bcc.length > 0 ? bcc : undefined,
    subject: parsed.requireString("--subject"),
    body: parsed.requireString("--body"),
    threadId: parsed.string("--thread"),
    replyToMessageId: parsed.string("--reply-to-message"),
    from: parseFromFlag(parsed.string("--from")),
    attachments: attachments.length > 0 ? attachments : undefined,
  }
}
