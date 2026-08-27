import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { type Restated, restateSeatName } from "../lib/seat-name-restate.ts"
import type { Subprocess } from "bun"
import { readProcStartTicks, formatSeatProcKey } from "../lib/seat-proc-key.ts"

const AGENT = "019ec7c0-4f3e-713b-b150-8ba2d5a5bce6"

const HOLDER_ID = "019ec7c0-4f3e-713b-b150-8ba2d5a5bce7"

const DEAD_PROC_KEY = "4294967000-12345"

const NAMED = "athena-worker"

let tmp = ""
let memory = ""
let heldHome = ""
let heldMemory = ""
let other: Subprocess | null = null

function livingProcKey(): string {
  const pid = other?.pid
  if (pid === undefined) throw new Error("no process stands for a seat other than this one")
  return formatSeatProcKey({ pid, startTicks: readProcStartTicks(pid) ?? 0 })
}

beforeAll(() => {
  tmp = mkdtempSync("/var/tmp/seat-name-restate-")
  memory = join(tmp, "memory")
  mkdirSync(join(memory, "seats"), { recursive: true })
  heldHome = process.env.HOME ?? ""
  heldMemory = process.env.MEMORY_ROOT ?? ""
  process.env.HOME = tmp
  process.env.MEMORY_ROOT = memory
  other = Bun.spawn(["sleep", "600"], { stdout: "ignore", stderr: "ignore" })
})

afterAll(() => {
  process.env.HOME = heldHome
  if (heldMemory === "") delete process.env.MEMORY_ROOT
  else process.env.MEMORY_ROOT = heldMemory
  rmSync(tmp, { recursive: true, force: true })
  other?.kill()
})

interface Holder {
  readonly name: string
  readonly procKey: string | null
}

function holderPage(holder: Holder | null): void {
  const page = join(memory, "seats", "holder.md")
  const uncommitted = join(memory, "seats", "holder.uncommitted.yaml")
  rmSync(page, { force: true })
  rmSync(uncommitted, { force: true })
  if (holder === null) return
  writeFileSync(
    page,
    ["---", "page-type-slug: seat", `id: ${HOLDER_ID}`, `title: "${holder.name}"`, "---", ""].join("\n")
  )
  if (holder.procKey !== null) writeFileSync(uncommitted, `supervisor-process: "${holder.procKey}"\n`)
}

function seatPage(held: string): void {
  writeFileSync(
    join(memory, "seats", "seat.md"),
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      ...(held === "" ? [] : [`title: "${held}"`]),
      "domain-slug: agent-harness",
      "role-slug: worker",
      "---",
      "",
    ].join("\n")
  )
}

function say(restated: Restated): string {
  switch (restated.kind) {
    case "bound":
      return `bound ${restated.held ?? "(nameless)"} -> ${restated.name}`
    case "left-alone":
      return `left-alone ${restated.held}`
    case "unchanged":
      return `unchanged ${restated.name}`
    default:
      return `refused: ${restated.reason}`
  }
}

async function restate(
  held: string,
  args: { readonly name: string; readonly takeLiveName?: boolean },
  holder: Holder | null = null
): Promise<Restated> {
  seatPage(held)
  holderPage(holder)
  return restateSeatName({ agentId: AGENT, ...args })
}

describe("restateSeatName — what the name-claim guard settles about a prior holder", () => {
  it("refuses a name a seat with a process in it holds, naming the seat and the flag", async () => {
    const holder = { name: NAMED, procKey: livingProcKey() }
    const out = await restate("athena-recorder", { name: NAMED }, holder)
    expect(out.kind).toBe("refused")
    expect(say(out)).toContain("live-holder")
    expect(say(out)).toContain(HOLDER_ID)
    expect(say(out)).toContain("--take-live-name")
  })

  it("takes that same name where takeLiveName is passed", async () => {
    const holder = { name: NAMED, procKey: livingProcKey() }
    const out = await restate("athena-recorder", { name: NAMED, takeLiveName: true }, holder)
    expect(say(out)).toBe(`bound athena-recorder -> ${NAMED}`)
  })

  it.each([
    ["a name nobody holds", false, null],
    ["a DORMANT holder, whose name still moves", true, DEAD_PROC_KEY],
    ["a holder stating no process, which is not the same as live", true, null],
  ] as const)("binds over %s", async (_what, held, procKey) => {
    const holder = held ? { name: NAMED, procKey } : null
    const out = await restate("athena-recorder", { name: NAMED }, holder)
    expect(say(out)).toBe(`bound athena-recorder -> ${NAMED}`)
  })

  it("refuses a name matching no declared shape, listing the shapes that stand", async () => {
    const out = await restate("athena-recorder", { name: "athena-reviewer" })
    expect(out.kind).toBe("refused")
    expect(say(out)).toContain("undeclared-shape")
    expect(say(out)).toContain("matches no declared agent-name shape")
  })
})

describe("restateSeatName — whether a held name is one a seat's attributes compose", () => {
  it.each([
    ["a persona in her own default seat", "athena", "athena-worker"],
    ["a persona who has moved off it", "abby-recorder", "abby-worker"],
    ["a domain and a role, with no persona in the name", "agent-harness-recorder", "agent-harness-worker"],
    ["a name no family claims", "zzz-not-a-thing", "athena"],
  ])("moves: %s", async (_what, held, next) => {
    const out = await restate(held, { name: next })
    expect(say(out)).toBe(`bound ${held} -> ${next}`)
  })

  it.each([
    ["a person's own handle", "ki-handler", "ki-recorder"],
    ["Alan's, on the same rule", "alan-handler", "alan-recorder"],
    ["Alan bare", "alan", "alan-recorder"],
  ])("is left alone: %s", async (_what, held, next) => {
    const out = await restate(held, { name: next })
    expect(say(out)).toBe(`left-alone ${held}`)
  })
})

describe("restateSeatName — the boundaries around those decisions", () => {
  it("a seat wearing no name at all is bound the name it was given", async () => {
    const out = await restate("", { name: NAMED })
    expect(say(out)).toBe(`bound (nameless) -> ${NAMED}`)
  })

  it("a seat with no page is one no agent is present in, so it is bound the name it was given", async () => {
    holderPage(null)
    rmSync(join(memory, "seats", "seat.md"), { force: true })
    const out = await restateSeatName({ agentId: AGENT, name: NAMED })
    expect(say(out)).toBe(`bound (nameless) -> ${NAMED}`)
  })
})
