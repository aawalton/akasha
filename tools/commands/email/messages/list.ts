export const summary = "List Gmail messages matching a search query, as JSON summaries"

import type { CommandHelp } from "../../../ops/surface.ts"
import { emailGoogle } from "../../../lib/email-code.ts"
import { GMAIL_ENV_VARS } from "../../../lib/email-help.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--query",
      argLabel: "<gmail-query>",
      valueShape: "prose",
      description: "Gmail search syntax (from:, subject:, newer_than:7d, has:attachment, ...)",
    },
    { name: "--max", argLabel: "<n>", valueShape: "token", description: "Max results to return" },
    {
      name: "--label",
      argLabel: "<id>",
      valueShape: "token",
      repeat: true,
      description: "Restrict to a label ID",
    },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email messages list --query-file ./query.txt --max 10",
    "ops email messages list --label INBOX --max 5",
  ],
}

export default async function emailMessagesList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const labels = parsed.repeated("--label")
  const client = await google.makeGmailClient()
  const messages = await google.listMessages(client, {
    query: parsed.string("--query"),
    max: parsed.nonNegativeInt("--max"),
    labelIds: labels.length > 0 ? labels : undefined,
  })
  process.stdout.write(`${JSON.stringify(messages, null, 2)}\n`)
}
