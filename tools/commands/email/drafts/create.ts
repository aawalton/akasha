export const summary = "Create a Gmail draft (same flags as send) and print it as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { buildComposeInput, emailGoogle } from "../../../lib/email-code.ts"
import { COMPOSE_FLAGS, GMAIL_ENV_VARS } from "../../../lib/email-help.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: COMPOSE_FLAGS,
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email drafts create --to aawalton@gmail.com --subject-file ./subject.txt --body-file ./body.md",
    "ops email drafts create --to a@x.com --subject-file ./subject.txt --body-file ./body.md --thread 18c1f2a3b4d5e6f7 --reply-to-message 18c1f2a3b4d5e6f8",
    "ops email drafts create --to aawalton@gmail.com --subject-file ./subject.txt --body-file ./body.md --attach ~/Documents/trust.pdf --attach ~/Documents/schedule.csv",
  ],
}

export default async function emailDraftsCreate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const input = await buildComposeInput(parsed)
  const client = await google.makeGmailClient()
  const draft = await google.createDraft(client, input)
  process.stdout.write(`${JSON.stringify(draft, null, 2)}\n`)
}
