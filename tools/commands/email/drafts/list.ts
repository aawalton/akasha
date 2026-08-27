export const summary = "List Gmail drafts as JSON"

import type { CommandHelp } from "../../../ops/surface.ts"
import { emailGoogle } from "../../../lib/email-code.ts"
import { GMAIL_ENV_VARS } from "../../../lib/email-help.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    { name: "--max", argLabel: "<n>", valueShape: "token", description: "Max results to return" },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: ["ops email drafts list", "ops email drafts list --max 5"],
}

export default async function emailDraftsList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const drafts = await google.listDrafts(client, parsed.nonNegativeInt("--max"))
  process.stdout.write(`${JSON.stringify(drafts, null, 2)}\n`)
}
