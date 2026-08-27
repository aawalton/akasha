export const summary = "Send a Gmail message (optionally a threaded reply) and print the result as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { buildComposeInput, emailGoogle } from "../../../lib/email-code.ts"
import { COMPOSE_FLAGS, GMAIL_ENV_VARS } from "../../../lib/email-help.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: COMPOSE_FLAGS,
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email messages send --to aawalton@gmail.com --subject-file ./subject.txt --body-file ./body.md",
    "ops email messages send --to a@x.com --cc b@y.com,c@z.com --subject-file ./subject.txt --body-file ./body.md --thread 18c1f2a3b4d5e6f7 --reply-to-message 18c1f2a3b4d5e6f8",
    "ops email messages send --to aawalton@gmail.com --subject-file ./subject.txt --body-file ./body.md --attach ~/Documents/trust.pdf --attach ~/Documents/schedule.csv",
  ],
}

export default async function emailMessagesSend(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const input = await buildComposeInput(parsed)
  const client = await google.makeGmailClient()
  const result = await google.sendMessage(client, input)
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
