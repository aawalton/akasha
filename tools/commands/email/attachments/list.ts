export const summary = "List a Gmail message's attachments as JSON (filename, mimeType, attachmentId, size)"

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
      description: "Message to inspect",
    },
  ],
  positionals: [
    { name: "message", required: false, description: "Message ID", aliasOfFlag: "--message" },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: ["ops email attachments list --message 18c1f2a3b4d5e6f7"],
}

export default async function emailAttachmentsList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const message = await google.getRawMessage(client, parsed.requireString("--message"))
  const refs = google.listAttachments(message)
  process.stdout.write(`${JSON.stringify(refs, null, 2)}\n`)
}
