export const summary = "Archive a Gmail message (remove INBOX label) and print its post-mutation labels"

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
      description: "Message to archive",
    },
  ],
  positionals: [
    {
      name: "message",
      required: false,
      description: "Message ID",
      aliasOfFlag: "--message",
    },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email messages archive --message 18c1f2a3b4d5e6f7",
    "ops email messages archive 18c1f2a3b4d5e6f7",
  ],
}

export default async function emailMessagesArchive(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const result = await google.archiveMessage(client, parsed.requireString("--message"))
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
