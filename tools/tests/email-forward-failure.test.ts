import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs"
import { afterAll, describe, expect, test } from "bun:test"
import type { Action, Rule } from "../lib/email-rules.ts"
import type { Mailbox, Message } from "../lib/gmail.ts"

const homeBefore = process.env.HOME
const root = mkdtempSync("/var/tmp/email-worker-")
mkdirSync(`${root}/pages/person`, { recursive: true })
writeFileSync(`${root}/pages/person/jenny.person.md`, "---\nemail: jen@example.com\n---\n")
process.env.HOME = root

const { carry } = await import("../lib/email-worker.ts")

if (homeBefore === undefined) delete process.env.HOME
else process.env.HOME = homeBefore

afterAll(() => rmSync(root, { recursive: true, force: true }))

const rule = (...actions: readonly Action[]): Rule => ({
  slug: "a-rule",
  relPath: "pages/email-rule-code/alan/a-rule.md",
  kind: "code",
  filing: "archive",
  actions,
  forwardToSlug: "jenny",
  delayMinutes: 0,
  judgment: "",
  conditions: [],
})

const message: Message = {
  id: "m1",
  threadId: "t1",
  from: '"Amazon.com" <ship@amazon.com>',
  fromAddress: "ship@amazon.com",
  to: "alan@example.com",
  subject: "Shipped",
  listId: "",
  labelIds: ["INBOX"],
  arrivedAt: new Date(0),
  unsubscribe: "",
  oneClickUnsubscribe: false,
}

function mailbox(sending: () => Promise<void>): { readonly box: Mailbox; readonly archived: string[] } {
  const archived: string[] = []
  return {
    archived,
    box: {
      profile: () => Promise.resolve({ emailAddress: "alan@example.com", historyId: "1" }),
      addedSince: () => Promise.resolve(null),
      inboxIds: () => Promise.resolve([]),
      message: () => Promise.resolve(message),
      rawOf: () => Promise.resolve(Buffer.from("Subject: Shipped\r\n\r\nbody\r\n", "latin1")),
      modify: (id, change) => {
        if (change.remove?.includes("INBOX") === true) archived.push(id)
        return Promise.resolve()
      },
      send: sending,
    },
  }
}

describe("carry, on a rule that forwards and then archives", () => {
  test("a send that fails leaves the mail in the inbox", async () => {
    const { box, archived } = mailbox(() => Promise.reject(new Error("Gmail said no")))
    await expect(carry(rule(), message, box, root)).rejects.toThrow("Gmail said no")
    expect(archived).toEqual([])
  })

  test("a forward with nowhere to go leaves the mail in the inbox", async () => {
    const { box, archived } = mailbox(() => Promise.resolve())
    await expect(carry({ ...rule(), forwardToSlug: "nobody" }, message, box, root)).rejects.toThrow()
    expect(archived).toEqual([])
  })

  test("a send that succeeds is what lets the archive happen", async () => {
    const { box, archived } = mailbox(() => Promise.resolve())
    await carry(rule(), message, box, root)
    expect(archived).toEqual(["m1"])
  })
})
