export const summary = "Fetch one attachment's base64url bytes by id, as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { emailGoogle } from "../../../lib/email-code.ts"
import { GMAIL_ENV_VARS } from "../../../lib/email-help.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--message",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Message id",
    },
    {
      name: "--attachment-id",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Attachment id",
    },
  ],
  positionals: [
    {
      name: "message",
      required: false,
      aliasOfFlag: "--message",
      description: "Message id",
    },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email attachments get 18c1f2a3b4d5e6f7 --attachment-id ANGjdJ8...",
    "ops email attachments get --message 18c1f2a3b4d5e6f7 --attachment-id ANGjdJ8...",
  ],
}

export default async function emailAttachmentsGet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const result = await google.getAttachment(
    client,
    parsed.requireString("--message"),
    parsed.requireString("--attachment-id")
  )
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
