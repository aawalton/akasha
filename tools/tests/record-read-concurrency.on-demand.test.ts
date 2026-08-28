
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, readdirSync, readFileSync, utimesSync, writeFileSync } from "node:fs"
import { exclusively } from "../../exclusive/exclusive.ts"
import { canonicalize } from "../../repo/path/path"
import { type Fixture, fixture, installRepos } from "./fixture.ts"

const HOOK = `${import.meta.dir}/../hooks/agent-hook-record-read.agent-hook.code.attachment.ts`
const AGENT = "agent-parallel"
const EXCLUSIVE = `${import.meta.dir}/../../exclusive/exclusive.ts`
const WRITE_WHOLE = `${import.meta.dir}/../../write-whole/write-whole.ts`
const HOLDER = "held-by"

let at: Fixture

beforeEach(() => {
  at = fixture()
  // THE REPO PAGES SAY WHICH REPOSITORIES THERE ARE, read out of the root `AKASHA_ROOT` names, so
  // the spawned hook throws in `roots.ts` at import without them.
  installRepos(at.root)
  at.installRecorder(AGENT)
})

afterEach(() => {
  at.dispose()
})

function documents(count: number): { readonly rel: string[]; readonly keys: string[] } {
  const rel = Array.from({ length: count }, (_, i) => `domains/document-${i}.md`)
  for (const relPath of rel) at.document(relPath, "slug: x\ndomain-parent-slug: global", 5)
  return { rel, keys: rel.map((p) => canonicalize(`${at.root}/${p}`)).sort() }
}

function recordOne(relPath: string, call: Record<string, unknown> = {}): Promise<number> {
  return Bun.spawn({
    cmd: [process.execPath, HOOK],
    stdin: Buffer.from(
      JSON.stringify({ tool_input: { file_path: `${at.root}/${relPath}`, ...call } })
    ),
    // `AKASHA_ROOT` NAMES THE TEMP REPO. This set `MEMORY_ROOT`, naming a repository that is gone:
    // nothing reads it, so the hook recorded against the live checkout's seat pages instead.
    env: { ...process.env, HOME: at.home, AKASHA_ROOT: at.root, AGENT_ID: AGENT },
    stdout: "pipe",
    stderr: "pipe",
  }).exited
}

async function recordAllAtOnce(paths: readonly string[]): Promise<void> {
  await Promise.all(paths.map((relPath) => recordOne(relPath)))
}

function seatsDir(): string {
  return `${at.root}/agent/seat`
}

function recordPath(): string {
  return `${seatsDir()}/${AGENT}.seat.readings.uncommitted.attachment.json`
}

function recorded(): string[] {
  return Object.keys(JSON.parse(readFileSync(recordPath(), "utf8")) as object).sort()
}

function backdate(lock: string): void {
  const long = new Date(Date.now() - 600_000)
  utimesSync(lock, long, long)
}

function scriptAt(name: string, body: string): string {
  const path = `${at.home}/${name}`
  writeFileSync(path, body, "utf8")
  return path
}

const HOLD_BODY = `
import { appendFileSync, writeFileSync } from "node:fs"
import { exclusively } from ${JSON.stringify(EXCLUSIVE)}

const [, , target, marker, held] = process.argv
exclusively(target, () => {
  writeFileSync(marker, "in\\n")
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, Number(held))
  appendFileSync(marker, "out\\n")
})
`

const ENTER_BODY = `
import { appendFileSync } from "node:fs"
import { exclusively } from ${JSON.stringify(EXCLUSIVE)}

const [, , target, marker] = process.argv
exclusively(target, () => {
  appendFileSync(marker, "second\\n")
})
`

const REWRITE_BODY = `
import { readFileSync } from "node:fs"
import { exclusively } from ${JSON.stringify(EXCLUSIVE)}
import { writeWhole } from ${JSON.stringify(WRITE_WHOLE)}

const [, , target, key] = process.argv
exclusively(target, () => {
  const held = JSON.parse(readFileSync(target, "utf8"))
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 300)
  held[key] = true
  writeWhole(target, JSON.stringify(held) + "\\n")
})
`

async function waitFor(path: string): Promise<boolean> {
  for (let tries = 0; tries < 400; tries++) {
    if (existsSync(path)) return true
    await Bun.sleep(10)
  }
  return false
}

describe("every read in a parallel batch is recorded", () => {
  test.each([2, 3, 5, 10])("%i at once", async (count) => {
    const { rel, keys } = documents(count)
    await recordAllAtOnce(rel)
    expect(recorded()).toEqual(keys)
  })
})

describe("a read of part of a file", () => {
  test("starting past line 1 leaves no record, an entry meaning the whole body", async () => {
    const { rel } = documents(1)
    await recordOne(rel[0] as string, { offset: 2 })
    expect(existsSync(recordPath())).toBe(false)
  })

  test("stopping short of the end leaves none either", async () => {
    const { rel } = documents(1)
    await recordOne(rel[0] as string, { limit: 3 })
    expect(existsSync(recordPath())).toBe(false)
  })

  test("a limit that reaches the end records it whole", async () => {
    const { rel, keys } = documents(1)
    await recordOne(rel[0] as string, { limit: 500 })
    expect(recorded()).toEqual(keys)
  })
})

describe("what the recording leaves behind", () => {
  test("nothing beside the page but the record itself", async () => {
    const { rel } = documents(5)
    await recordAllAtOnce(rel)
    const beside = readdirSync(seatsDir())
      .filter((name) => name.startsWith(`${AGENT}.`))
      .sort()
    expect(beside).toEqual([`${AGENT}.seat.md`, `${AGENT}.seat.readings.uncommitted.attachment.json`])
  })
})

describe("a lock whose holder died does not stop the recording", () => {
  test("the record still lands, and the lock is gone after", async () => {
    const { rel, keys } = documents(1)
    const lock = `${recordPath()}.lock`
    mkdirSync(lock, { recursive: true })
    backdate(lock)
    await recordAllAtOnce(rel)
    expect(recorded()).toEqual(keys)
    expect(existsSync(lock)).toBe(false)
  })
})

describe("writers that overlap keep every entry", () => {
  test("six rewriting one record lose none of it", async () => {
    const target = `${at.home}/record.json`
    writeFileSync(target, "{}\n", "utf8")
    const script = scriptAt("rewrite.ts", REWRITE_BODY)
    const keys = Array.from({ length: 6 }, (_, i) => `key-${i}`)
    await Promise.all(
      keys.map(
        (key) =>
          Bun.spawn({
            cmd: [process.execPath, script, target, key],
            stdout: "pipe",
            stderr: "pipe",
          }).exited
      )
    )
    expect(Object.keys(JSON.parse(readFileSync(target, "utf8")) as object).sort()).toEqual(keys)
  })
})

describe("a lock a running process holds is never taken from it", () => {
  test("the waiter enters only once the holder has left", async () => {
    const target = `${at.home}/guarded`
    const marker = `${at.home}/order`
    const hold = scriptAt("hold.ts", HOLD_BODY)
    const enter = scriptAt("enter.ts", ENTER_BODY)
    const holder = Bun.spawn({
      cmd: [process.execPath, hold, target, marker, "1500"],
      stdout: "pipe",
      stderr: "pipe",
    })
    expect(await waitFor(`${target}.lock`)).toBe(true)
    const waiter = Bun.spawn({
      cmd: [process.execPath, enter, target, marker],
      stdout: "pipe",
      stderr: "pipe",
    })
    await Promise.all([holder.exited, waiter.exited])
    expect(readFileSync(marker, "utf8").trim().split("\n")).toEqual(["in", "out", "second"])
  })
})

describe("a lock whose holder was killed is taken back at once", () => {
  test("the next caller names itself and never waits the lock out", async () => {
    const target = `${at.home}/orphaned`
    const marker = `${at.home}/after`
    const hold = scriptAt("hold.ts", HOLD_BODY)
    const enter = scriptAt("enter.ts", ENTER_BODY)
    const holder = Bun.spawn({
      cmd: [process.execPath, hold, target, marker, "60000"],
      stdout: "pipe",
      stderr: "pipe",
    })
    expect(await waitFor(`${target}.lock/${HOLDER}`)).toBe(true)
    holder.kill("SIGKILL")
    await holder.exited
    const began = Date.now()
    const waiter = Bun.spawn({
      cmd: [process.execPath, enter, target, marker],
      stdout: "pipe",
      stderr: "pipe",
    })
    expect(await waiter.exited).toBe(0)
    expect(readFileSync(marker, "utf8")).toContain("second")
    expect(Date.now() - began).toBeLessThan(9_000)
  })
})

describe("a caller whose lock was taken leaves its successor alone", () => {
  test("the lock standing in another holder's name survives the release", () => {
    const target = `${at.home}/successor`
    exclusively(target, () => {
      writeFileSync(`${target}.lock/${HOLDER}`, "2147483646 1", "utf8")
    })
    expect(existsSync(`${target}.lock`)).toBe(true)
  })
})

describe("the lock hands the act's outcome back either way", () => {
  test("a value", () => {
    expect(exclusively(`${at.home}/thing`, () => 41 + 1)).toBe(42)
  })

  test("a throw, and the next act still runs", () => {
    expect(() =>
      exclusively(`${at.home}/thing`, () => {
        throw new Error("no")
      })
    ).toThrow("no")
    expect(exclusively(`${at.home}/thing`, () => "after")).toBe("after")
  })
})
