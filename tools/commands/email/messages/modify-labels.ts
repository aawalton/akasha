export const summary = "Add/remove label ids on a Gmail message and print its post-mutation labels"

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
      description: "Message to modify",
    },
    {
      name: "--add",
      argLabel: "<label-id>",
      valueShape: "token",
      repeat: true,
      description: "Label id to add",
    },
    {
      name: "--remove",
      argLabel: "<label-id>",
      valueShape: "token",
      repeat: true,
      description: "Label id to remove",
    },
  ],
  positionals: [
    {
      name: "message",
      required: false,
      aliasOfFlag: "--message",
      description: "Message to modify",
    },
  ],
  envVars: GMAIL_ENV_VARS,
  examples: [
    "ops email messages modify-labels 18c1f2a3b4d5e6f7 --remove INBOX",
    "ops email messages modify-labels --message 18c1f2a3b4d5e6f7 --remove INBOX",
    "ops email messages modify-labels --message 18c1f2a3b4d5e6f7 --add STARRED --remove UNREAD",
  ],
}

export default async function emailMessagesModifyLabels(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const google = await emailGoogle()
  const client = await google.makeGmailClient()
  const result = await google.modifyMessageLabels(client, parsed.requireString("--message"), {
    addLabelIds: parsed.repeated("--add"),
    removeLabelIds: parsed.repeated("--remove"),
  })
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
