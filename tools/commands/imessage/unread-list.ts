export const summary = "List the unread inbound iMessages (sender + text + timestamp)"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { imessageChatDb, imessageContactsDb, imessageRemote } from "../../lib/imessage-code.ts"
import { type ImessageMessage } from "@alanwalton/imessage/lib/chat-db"
import {
  formatLocalMinute,
  messageLabel,
  type NameFor,
  nameFor,
  singleLine,
} from "../../lib/imessage.ts"

export const help: CommandHelp = {
  flags: [
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
      aliases: ["--tail"],
      description: "Cap the number of messages returned (default: the full unread set)",
    },
    { name: "--json", description: "Emit a JSON array of structured message rows" },
  ],
  exits: [
    { code: 1, meaning: "input error: --limit not a positive integer" },
    { code: 2, meaning: "data error: --contact matched no contact or no iMessage handle" },
    { code: 3, meaning: "operational error: ssh/sqlite3 against the macbook failed" },
  ],
  examples: [
    "ops imessage unread-list",
    "ops imessage unread-list --json",
    "ops imessage unread-list --contact mary",
  ],
}

function emitUnread(
  messages: readonly ImessageMessage[],
  name: NameFor,
  json: boolean
): undefined {
  const oldestFirst = [...messages].reverse()
  if (json) {
    const records = oldestFirst.map((m) => ({
      rowid: m.rowid,
      guid: m.guid,
      date: formatLocalMinute(m.unixSeconds),
      unixSeconds: m.unixSeconds,
      sender: messageLabel(m, name),
      handleId: m.handleId,
      contact: m.handleId === null ? null : name(m.handleId),
      chatIdentifier: m.chatIdentifier,
      chatDisplayName: m.chatDisplayName,
      text: m.text,
    }))
    process.stdout.write(`${JSON.stringify(records)}\n`)
    return
  }
  for (const m of oldestFirst) {
    process.stdout.write(
      `${formatLocalMinute(m.unixSeconds)}\t${messageLabel(m, name)}\t${singleLine(m.text)}\n`
    )
  }
}

export default async function imessageUnreadList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const limit = parsed.nonNegativeInt("--limit")
  if (limit === 0) throw inputError("--limit must be a positive integer (got 0)")
  const contact = parsed.string("--contact")
  const json = parsed.boolean("--json")

  const remote = await imessageRemote()
  const chatDb = await imessageChatDb()
  const contactsDb = await imessageContactsDb()
  const handleRowids =
    contact === undefined ? undefined : await remote.resolveContactHandleRowids(contact)
  const [messages, contacts] = await Promise.all([
    remote.fetchMessages(chatDb.buildUnreadListSql({ limit, handleRowids })),
    remote.fetchContacts(),
  ])
  emitUnread(messages, nameFor(contactsDb, contacts), json)
}
