export const summary = "Fetch one Gmail message with decoded plain-text body, as JSON"

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
      description: "Message to fetch",
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
    "ops email messages get --message 18c1f2a3b4d5e6f7",
    "ops email messages get 18c1f2a3b4d5e6f7",
  ],
}

export default async function emailMessagesGet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const message = await google.getMessage(client, parsed.requireString("--message"))
  process.stdout.write(`${JSON.stringify(message, null, 2)}\n`)
}
