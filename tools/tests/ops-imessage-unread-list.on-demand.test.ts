import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { resolveRoots } from "../../repo/roots/roots"
const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`
const PKG = "node_modules/@alanwalton/imessage"
const SRC = "src/lib"
const MARY_PHONE = "+16085551234"
const SHORT_CODE = "83356"
const MINUTE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/

const REMOTE = `export async function fetchMessages() { return JSON.parse(process.env.OPS_IMESSAGE_MESSAGES) }
export async function fetchContacts() { return JSON.parse(process.env.OPS_IMESSAGE_CONTACTS) }
export async function fetchUnreadCount() { return 0 }
export async function resolveContactHandleRowids() { return [] }
`

interface Message {
  readonly rowid: number
  readonly guid?: string
  readonly text?: string
  readonly isFromMe?: boolean
  readonly unixSeconds?: number
  readonly handleId?: string | null
  readonly chatIdentifier?: string | null
  readonly chatDisplayName?: string | null
}

interface Row {
  readonly sender: string
  readonly text: string
  readonly date: string
}

const CONTACTS = [{ name: "Mary", phones: [MARY_PHONE], emails: [] }]

function message(over: Message): Required<Message> {
  return {
    rowid: over.rowid,
    guid: over.guid ?? `g${over.rowid}`,
    text: over.text ?? "body",
    isFromMe: false,
    unixSeconds: over.unixSeconds ?? 1_700_000_000,
    handleId: over.handleId ?? null,
    chatIdentifier: over.chatIdentifier ?? null,
    chatDisplayName: over.chatDisplayName ?? null,
  }
}

let tmp = ""
let root = ""

function realPackageDir(): string {
  return join(resolveRoots().instructions, "packages/alanwalton/imessage")
}

const STUB_MANIFEST = {
  name: "@alanwalton/imessage",
  version: "0.1.0",
  type: "module",
  exports: {
    "./lib/chat-db": "./src/lib/chat-db.ts",
    "./lib/contacts-db": "./src/lib/contacts-db.ts",
    "./lib/remote": "./src/lib/remote.ts",
  },
}

beforeAll(() => {
  tmp = mkdtempSync("/var/tmp/ops-imessage-unread-")
  root = join(tmp, "root")
  const pkg = join(root, PKG)
  mkdirSync(join(pkg, SRC), { recursive: true })
  writeFileSync(join(pkg, "package.json"), `${JSON.stringify(STUB_MANIFEST, null, 2)}\n`)
  writeFileSync(join(pkg, SRC, "remote.ts"), REMOTE)
  for (const real of ["chat-db", "contacts-db"]) {
    writeFileSync(
      join(pkg, SRC, `${real}.ts`),
      `export * from ${JSON.stringify(join(realPackageDir(), SRC, `${real}.ts`))}\n`
    )
  }
})

afterAll(() => {
  rmSync(tmp, { recursive: true, force: true })
})

interface Ran {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number
}

async function runCli(messages: readonly Message[], args: readonly string[] = []): Promise<Ran> {
  const proc = Bun.spawn(["bun", CLI_PATH, "imessage", "unread-list", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: {
      ...process.env,
      OPS_IMESSAGE_ROOT: root,
      OPS_IMESSAGE_CONTACTS: JSON.stringify(CONTACTS),
      OPS_IMESSAGE_MESSAGES: JSON.stringify(messages.map(message)),
    },
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

async function lines(messages: readonly Message[]): Promise<readonly string[]> {
  const ran = await runCli(messages)
  expect(ran.exitCode).toBe(0)
  return ran.stdout.replace(/\n$/, "").split("\n")
}

async function columns(messages: readonly Message[]): Promise<readonly string[]> {
  const only = await lines(messages)
  expect(only).toHaveLength(1)
  return (only[0] ?? "").split("\t")
}

async function rows(messages: readonly Message[]): Promise<readonly Row[]> {
  const ran = await runCli(messages, ["--json"])
  expect(ran.exitCode).toBe(0)
  return JSON.parse(ran.stdout) as readonly Row[]
}

describe("ops imessage unread-list — the default line is minute, sender and text", () => {
  it("emits exactly three tab-separated columns", async () => {
    const cols = await columns([{ rowid: 1, handleId: MARY_PHONE, text: "hi there" }])
    expect(cols).toHaveLength(3)
    expect(cols[0]).toMatch(MINUTE)
    expect(cols[1]).toBe("Mary")
    expect(cols[2]).toBe("hi there")
  })

  it("falls back to the raw handle when the sender resolves to no contact", async () => {
    const cols = await columns([
      { rowid: 1, handleId: SHORT_CODE, text: "Your code is 000000" },
    ])
    expect(cols[1]).toBe(SHORT_CODE)
  })

  it("prefixes the sender with a named group chat's display name", async () => {
    const cols = await columns([
      { rowid: 1, handleId: MARY_PHONE, chatDisplayName: "Book Club", text: "tonight?" },
    ])
    expect(cols[1]).toBe("Book Club: Mary")
  })

  it("renders oldest-first, the query handing them over newest-first", async () => {
    const emitted = await lines([
      { rowid: 2, handleId: MARY_PHONE, unixSeconds: 1_700_000_200, text: "newer" },
      { rowid: 1, handleId: MARY_PHONE, unixSeconds: 1_700_000_100, text: "older" },
    ])
    expect(emitted.map((line) => line.split("\t")[2])).toEqual(["older", "newer"])
  })
})

describe("ops imessage unread-list — a body that spans lines", () => {
  it("is flattened into the single line the column layout admits", async () => {
    const cols = await columns([
      { rowid: 1, handleId: MARY_PHONE, text: "line one\nline two" },
    ])
    expect(cols).toHaveLength(3)
    expect(cols[2]).toBe("line one ⏎ line two")
  })

  it("reaches --json intact, the flattening being the TSV layout's alone", async () => {
    const emitted = await rows([{ rowid: 1, handleId: MARY_PHONE, text: "line one\nline two" }])
    expect(emitted[0]?.text).toBe("line one\nline two")
  })
})

describe("ops imessage unread-list — --json", () => {
  it("carries a resolved sender, the text and the same minute stamp per row", async () => {
    const emitted = await rows([{ rowid: 1, handleId: MARY_PHONE, text: "hi there" }])
    expect(emitted).toHaveLength(1)
    expect(emitted[0]?.sender).toBe("Mary")
    expect(emitted[0]?.text).toBe("hi there")
    expect(emitted[0]?.date).toMatch(MINUTE)
  })

  it("is oldest-first as well, so both renderings order alike", async () => {
    const emitted = await rows([
      { rowid: 2, handleId: MARY_PHONE, unixSeconds: 1_700_000_200, text: "newer" },
      { rowid: 1, handleId: MARY_PHONE, unixSeconds: 1_700_000_100, text: "older" },
    ])
    expect(emitted.map((row) => row.text)).toEqual(["older", "newer"])
  })

  it("an empty unread set is an empty array, exit 0", async () => {
    expect(await rows([])).toEqual([])
  })
})

describe("ops imessage unread-list — arg parsing", () => {
  it("--limit 0 asks for nothing, which is the caller's mistake, exit 1", async () => {
    const ran = await runCli([], ["--limit", "0"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("--limit")
    expect(ran.stdout).toBe("")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const ran = await runCli([], ["--bogus"])
    expect(ran.exitCode).toBe(1)
    expect(ran.stderr).toContain("--bogus")
  })
})
