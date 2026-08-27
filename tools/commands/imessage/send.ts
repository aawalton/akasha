export const summary = "Send an iMessage via the macbook's Messages app (--to name, phone, or email)"

import { readFileSync, statSync } from "node:fs"
import { basename, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { imessageContactsDb, imessageHost, imessageRemote, imessageSendScript, imessageSsh } from "../../lib/imessage-code.ts"
import { type SendAttachment } from "@alanwalton/imessage/imessage/send"

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024

export const help: CommandHelp = {
  positionals: [
    {
      name: "to",
      required: false,
      aliasOfFlag: "--to",
      description: "Recipient: phone number, email, or AddressBook name",
    },
  ],
  flags: [
    {
      name: "--to",
      argLabel: "<name-or-handle>",
      valueShape: "token",
      required: true,
      description: "Recipient: phone number, email, or AddressBook name",
    },
    {
      name: "--text",
      argLabel: "<body>",
      valueShape: "prose",
      description: "Message body to send",
    },
    {
      name: "--image",
      argLabel: "<path>",
      valueShape: "token",
      aliases: ["--attachment"],
      description: "Local path to an image/file to send as an attachment (≤ 10 MB)",
    },
    {
      name: "--json",
      description: "Emit { sent, to, text, image } instead of the confirmation line",
    },
  ],
  exits: [
    {
      code: 1,
      meaning:
        "input error: missing flag, neither --text nor --image given, name resolves to zero or multiple contacts, or --image path missing/unreadable/oversized",
    },
    { code: 3, meaning: "operational error: ssh/osascript against the macbook failed" },
  ],
  examples: [
    "ops imessage send --to +18013766506 --text-file ./message.md",
    'ops imessage send --to "Mary Walton" --image ~/Pictures/anchor.png',
    "ops imessage send --to +18013766506 --image shot.jpg --text-file ./message.md",
  ],
}

async function readAttachment(path: string): Promise<SendAttachment> {
  const abs = resolve(path)
  let stat: ReturnType<typeof statSync>
  try {
    stat = statSync(abs)
  } catch {
    throw inputError(`--image: file not found: ${path}`)
  }
  if (!stat.isFile()) throw inputError(`--image: not a regular file: ${path}`)
  if (stat.size > MAX_ATTACHMENT_BYTES) {
    throw inputError(
      `--image: file too large: ${stat.size} bytes (max ${MAX_ATTACHMENT_BYTES})`
    )
  }
  let bytes: Buffer
  try {
    bytes = readFileSync(abs)
  } catch {
    throw inputError(`--image: file not readable: ${path}`)
  }
  return { fileB64: bytes.toString("base64"), filename: basename(abs) }
}

async function resolveRecipient(to: string): Promise<string> {
  const contactsDb = await imessageContactsDb()
  if (contactsDb.isPhoneLike(to) || contactsDb.isEmailLike(to)) return to.trim()
  const remote = await imessageRemote()
  const matches = contactsDb.searchContacts(await remote.fetchContacts(), to)
  if (matches.length === 0) {
    throw inputError(
      `no contact matches "${to}" — pass a phone number, an email, or a more specific name`
    )
  }
  if (matches.length > 1) {
    const names = matches.map((c) => c.name).join(", ")
    throw inputError(`"${to}" is ambiguous — matches: ${names}`)
  }
  const contact = matches[0]
  if (contact === undefined) throw inputError(`no contact matches "${to}"`)
  const endpoint = contact.phones[0] ?? contact.emails[0]
  if (endpoint === undefined) {
    throw inputError(`contact "${contact.name}" has no phone number or email to send to`)
  }
  return endpoint
}

export default async function imessageSend(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const to = parsed.requireString("--to")
  const text = parsed.string("--text")
  const imagePath = parsed.string("--image")
  const json = parsed.boolean("--json")

  if (text === undefined && imagePath === undefined) {
    throw inputError("provide --text, --image, or both")
  }

  let attachment: SendAttachment | undefined
  let resolvedImagePath: string | undefined
  if (imagePath !== undefined) {
    attachment = await readAttachment(imagePath)
    resolvedImagePath = resolve(imagePath)
  }

  const recipient = await resolveRecipient(to)
  const [host, ssh, send] = await Promise.all([
    imessageHost(),
    imessageSsh(),
    imessageSendScript(),
  ])
  await ssh.runSshCapture(host.MACBOOK, send.buildSendScript(recipient, text, attachment))
  if (json) {
    process.stdout.write(
      `${JSON.stringify({ sent: true, to: recipient, text: text ?? null, image: resolvedImagePath ?? null })}\n`
    )
    return
  }
  process.stdout.write(`sent\t${recipient}\n`)
}
