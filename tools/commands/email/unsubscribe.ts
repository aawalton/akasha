export const summary = "Unsubscribe from a message via its List-Unsubscribe headers (RFC 8058 one-click / mailto)"

import type { CommandHelp } from "../../ops/surface.ts"
import { emailGoogle } from "../../lib/email-code.ts"
import { GMAIL_ENV_VARS } from "../../lib/email-help.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--message",
      argLabel: "<id>",
      valueShape: "token",
      required: true,
      description: "Message to unsubscribe from",
    },
    { name: "--dry-run", description: "Print the parsed unsubscribe intent without acting" },
  ],
  positionals: [
    { name: "message", required: false, description: "Message ID", aliasOfFlag: "--message" },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email unsubscribe --message 18c1f2a3b4d5e6f7 --dry-run",
    "ops email unsubscribe --message 18c1f2a3b4d5e6f7",
  ],
}

export default async function emailUnsubscribeCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const message = await google.getRawMessage(client, parsed.requireString("--message"))
  const intent = google.parseListUnsubscribe(
    google.getHeader(message, "List-Unsubscribe"),
    google.getHeader(message, "List-Unsubscribe-Post")
  )
  if (parsed.boolean("--dry-run")) {
    process.stdout.write(`${JSON.stringify(intent, null, 2)}\n`)
    return
  }
  const result = await google.executeUnsubscribe(client, intent)
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
