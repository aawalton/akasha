export const summary = "Search the macbook's AddressBook by name; prints phones and emails"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { imessageContactsDb, imessageRemote } from "../../lib/imessage-code.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--query",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Name substring to search for",
    },
    { name: "--json", description: "Emit a JSON array of { name, phones, emails }" },
  ],
  positionals: [
    {
      name: "query",
      required: false,
      description: "Name substring to search for",
      aliasOfFlag: "--query",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: missing --query" },
    { code: 3, meaning: "operational error: ssh/sqlite3 against the macbook failed" },
  ],
  examples: ["ops imessage contacts --query mary", "ops imessage contacts walton --json"],
}

export default async function imessageContacts(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const query = parsed.requireString("--query")
  const json = parsed.boolean("--json")

  const remote = await imessageRemote()
  const contactsDb = await imessageContactsDb()
  const matches = contactsDb.searchContacts(await remote.fetchContacts(), query)
  if (json) {
    process.stdout.write(`${JSON.stringify(matches)}\n`)
    return
  }
  for (const contact of matches) {
    process.stdout.write(
      `${contact.name}\t${contact.phones.join(",")}\t${contact.emails.join(",")}\n`
    )
  }
}
