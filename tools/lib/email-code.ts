import type { ComposeInput } from "@alanwalton/email-google/types"
import { parseSender } from "@alanwalton/email-inbound/sender"
import type { ParsedArgs } from "./parse-args.ts"

export type EmailGoogle = typeof import("@alanwalton/email-google/messages") &
  typeof import("@alanwalton/email-google/drafts") &
  typeof import("@alanwalton/email-google/attachments") &
  typeof import("@alanwalton/email-google/client") &
  typeof import("@alanwalton/email-google/env") &
  typeof import("@alanwalton/email-google/schema") &
  typeof import("@alanwalton/email-google/unsubscribe")

interface Sender {
  readonly name: string
  readonly email: string
}

export async function emailGoogle(): Promise<EmailGoogle> {
  const parts = await Promise.all([
    import("@alanwalton/email-google/messages"),
    import("@alanwalton/email-google/drafts"),
    import("@alanwalton/email-google/attachments"),
    import("@alanwalton/email-google/client"),
    import("@alanwalton/email-google/env"),
    import("@alanwalton/email-google/schema"),
    import("@alanwalton/email-google/unsubscribe"),
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
