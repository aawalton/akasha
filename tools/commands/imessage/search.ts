export const summary = "Search iMessage history by text substring (decodes attributedBody blobs)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  imessageChatDb,
  imessageContactsDb,
  imessageRemote,
} from "../../lib/imessage-code.ts"
import { emitMessages, nameFor } from "../../lib/imessage.ts"

const OVERFETCH_FACTOR = 5

export const help: CommandHelp = {
  flags: [
    {
      name: "--query",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "Substring to search for",
    },
    {
      name: "--contact",
      argLabel: "<name-or-handle>",
      valueShape: "token",
      description: "Restrict to one contact's conversations (AddressBook name, phone, or email)",
    },
    {
      name: "--limit",
      argLabel: "<n>",
      valueShape: "token",
      default: "20",
      aliases: ["--tail"],
      description: "Maximum number of matches to return (newest matches win)",
    },
    { name: "--json", description: "Emit a JSON array of structured message rows" },
  ],
  positionals: [
    {
      name: "query",
      required: false,
      description: "Substring to search for",
      aliasOfFlag: "--query",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: missing --query, --limit not a positive integer" },
    { code: 2, meaning: "data error: --contact matched no contact or no iMessage handle" },
    { code: 3, meaning: "operational error: ssh/sqlite3 against the macbook failed" },
  ],
  examples: [
    "ops imessage search --query-file ./query.txt",
    "ops imessage search sleep --limit 5",
    "ops imessage search --query-file ./query.txt --contact mary --json",
  ],
}

export default async function imessageSearch(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const query = parsed.requireString("--query")
  const limit = parsed.nonNegativeInt("--limit") ?? 20
  if (limit === 0) throw inputError("--limit must be a positive integer (got 0)")
  const contact = parsed.string("--contact")
  const json = parsed.boolean("--json")

  const remote = await imessageRemote()
  const chatDb = await imessageChatDb()
  const contactsDb = await imessageContactsDb()
  const handleRowids =
    contact === undefined ? undefined : await remote.resolveContactHandleRowids(contact)
  const [candidates, contacts] = await Promise.all([
    remote.fetchMessages(
      chatDb.buildSearchSql({ query, limit: limit * OVERFETCH_FACTOR, handleRowids })
    ),
    remote.fetchContacts(),
  ])
  const needle = query.toLowerCase()
  const matches = candidates.filter((m) => m.text.toLowerCase().includes(needle)).slice(0, limit)
  emitMessages(matches, nameFor(contactsDb, contacts), json)
}
