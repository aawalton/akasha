export const summary = "List the newest iMessages (all chats, or one contact's with --contact)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  imessageChatDb,
  imessageContactsDb,
  imessageRemote,
} from "../../lib/imessage-code.ts"
import { emitMessages, nameFor } from "../../lib/imessage.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "20",
      aliases: ["--tail"],
      description: "Number of messages to return",
    },
    {
      name: "--contact",
      argLabel: "<name-or-handle>",
      valueShape: "token",
      description: "Restrict to one contact's conversations (AddressBook name, phone, or email)",
    },
    { name: "--json", description: "Emit a JSON array of structured message rows" },
  ],
  exits: [
    { code: 1, meaning: "input error: --limit not a positive integer" },
    { code: 2, meaning: "data error: --contact matched no contact or no iMessage handle" },
    { code: 3, meaning: "operational error: ssh/sqlite3 against the macbook failed" },
  ],
  examples: [
    "ops imessage recent",
    "ops imessage recent --limit 50",
    "ops imessage recent --contact mary --json",
  ],
}

export default async function imessageRecent(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const limit = parsed.nonNegativeInt("--limit") ?? 20
  if (limit === 0) throw inputError("--limit must be a positive integer (got 0)")
  const contact = parsed.string("--contact")
  const json = parsed.boolean("--json")

  const remote = await imessageRemote()
  const chatDb = await imessageChatDb()
  const contactsDb = await imessageContactsDb()
  const handleRowids =
    contact === undefined ? undefined : await remote.resolveContactHandleRowids(contact)
  const [messages, contacts] = await Promise.all([
    remote.fetchMessages(chatDb.buildRecentSql({ limit, handleRowids })),
    remote.fetchContacts(),
  ])
  emitMessages(messages, nameFor(contactsDb, contacts), json)
}
