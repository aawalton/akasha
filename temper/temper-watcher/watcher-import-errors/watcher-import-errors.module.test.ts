import { expect, test } from "bun:test"
import { mkdtempSync } from "node:fs"
import { join } from "node:path"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import type {
  ErrorDecision,
  TemperErrorEnvelope,
} from "../watcher-error-emissions/watcher-error-emissions.module.code.ts"
import {
  buildVerdicts,
  errorLogLines,
  runImportErrors,
} from "./watcher-import-errors.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const FRONTIER = 1_700_000_000
const HOUR = 3600

const LEGACY_ENVELOPE_LINE =
  'TemperErrors: {"kind":"temper-error","signature":"fresh boom\\n","traceback":"stack traceback: chunk:12","message":"fresh boom","count":2,"firstSeenAt":"2023-11-14T22:12:20.000Z","lastSeenAt":"2023-11-14T22:13:20.000Z","eventCode":7,"account":"@alan","character":"Vex","triage":"unknown"}'

interface Seed {
  readonly message: string
  readonly count: number
  readonly lastSeenAt: number
}

function entryLua(seed: Seed, index: number): string {
  return `[${index}] = {
    ["message"] = "${seed.message}",
    ["traceback"] = "stack traceback: chunk:12",
    ["count"] = ${seed.count},
    ["firstSeenAt"] = ${seed.lastSeenAt - 60},
    ["lastSeenAt"] = ${seed.lastSeenAt},
    ["account"] = "@alan",
    ["character"] = "Vex",
    ["world"] = "NA Megaserver",
    ["esoVersion"] = "10.1.0",
    ["apiVersion"] = 101045,
    ["eventCode"] = 7,
},
`
}

function savedFile(seeds: readonly Seed[]): string {
  return `TemperErrors_SavedVariables = {
  ["Default"] = {
    ["@alan"] = {
      ["$AccountWide"] = {
        ["version"] = 1,
        ["entries"] = {
${seeds.map((seed, index) => entryLua(seed, index + 1)).join("")}        },
      },
    },
  },
}
`
}

function entry(message: string, lastSeenAt: number): ErrorEntry {
  return {
    message,
    traceback: "stack traceback: chunk:12",
    count: 1,
    firstSeenAt: lastSeenAt - 60,
    lastSeenAt,
    account: "@alan",
    character: "Vex",
    world: "NA Megaserver",
    esoVersion: "10.1.0",
    apiVersion: 101_045,
    eventCode: 7,
  }
}

function freshCursorPath(): string {
  return join(mkdtempSync(join(SCRATCH_AT, "watcher-import-errors-")), "cursor.json")
}

async function linesFrom(content: string, cursorPath: string): Promise<readonly string[]> {
  const lines: string[] = []
  await runImportErrors(
    content,
    (message) => {
      lines.push(message)
    },
    { cursorPath, deployedFor: () => Promise.resolve(undefined) }
  )
  return lines
}

const FRESH: Seed = { message: "fresh boom", count: 2, lastSeenAt: FRONTIER }
const LONG_UNSEEN: Seed = { message: "old boom", count: 5, lastSeenAt: FRONTIER - 48 * HOUR }

function envelope(signature: string): TemperErrorEnvelope {
  return {
    kind: "temper-error",
    signature,
    traceback: "stack traceback: chunk:12",
    message: signature,
    count: 1,
    firstSeenAt: "2023-11-14T22:12:20.000Z",
    lastSeenAt: "2023-11-14T22:13:20.000Z",
    eventCode: 7,
    account: "@alan",
    character: "Vex",
    triage: "unknown",
  }
}

function decision(envelopes: number, suppressed: number): ErrorDecision {
  return {
    envelopes: Array.from({ length: envelopes }, (_, index) => envelope(`boom ${index}`)),
    nextSeen: new Map(),
    suppressed,
  }
}

test("an error never carried up before is logged as one line of json", async () => {
  const lines = await linesFrom(savedFile([FRESH]), freshCursorPath())
  expect(lines[0]).toBe(LEGACY_ENVELOPE_LINE)
  expect(lines).toHaveLength(2)
})

test("how many errors were held back is logged before any error is logged", async () => {
  const lines = await linesFrom(savedFile([FRESH, LONG_UNSEEN]), freshCursorPath())
  expect(lines).toEqual([
    "TemperErrors: suppressed 1 stale-residue entry",
    LEGACY_ENVELOPE_LINE,
    "TemperErrors: recorded 1 error envelope",
  ])
})

test("a second run over the same cursor carries nothing up", async () => {
  const cursorPath = freshCursorPath()
  const content = savedFile([FRESH, LONG_UNSEEN])
  await linesFrom(content, cursorPath)
  expect(await linesFrom(content, cursorPath)).toEqual(["TemperErrors: no new or recurred errors"])
})

test("a file holding no errors at all carries nothing up", async () => {
  expect(await linesFrom(savedFile([]), freshCursorPath())).toEqual([
    "TemperErrors: no new or recurred errors",
  ])
})

test("a run over the same content twice logs the same lines the second time", async () => {
  const content = savedFile([FRESH])
  const first = await linesFrom(content, freshCursorPath())
  const second = await linesFrom(content, freshCursorPath())
  expect(second).toEqual(first)
})

test("a file naming no errors table is refused", async () => {
  await expect(linesFrom("nothing = {}\n", freshCursorPath())).rejects.toThrow()
})

test("no entries at all are judged", async () => {
  expect((await buildVerdicts([])).size).toBe(0)
})

test("an error unseen for longer than a day past the latest error is stale", async () => {
  const entries = [entry("fresh", FRONTIER), entry("old", FRONTIER - 48 * HOUR)]
  const verdicts = await buildVerdicts(entries, () => Promise.resolve(undefined))
  expect(verdicts.get(entries[0] as ErrorEntry)?.stale).toBe(false)
  expect(verdicts.get(entries[1] as ErrorEntry)?.stale).toBe(true)
})

test("the staleness allowed is a day unless the caller names another", async () => {
  const entries = [entry("fresh", FRONTIER), entry("old", FRONTIER - 48 * HOUR)]
  const wider = await buildVerdicts(entries, () => Promise.resolve(undefined), 72)
  expect(wider.get(entries[1] as ErrorEntry)?.stale).toBe(false)
})

test("an error attributed to no addon is judged unknown", async () => {
  const entries = [entry("fresh", FRONTIER)]
  const verdicts = await buildVerdicts(entries, () => Promise.resolve(undefined))
  expect(verdicts.get(entries[0] as ErrorEntry)?.triage).toBe("unknown")
})

test("a log of errors carried up ends with how many were carried up", () => {
  const lines = errorLogLines(decision(2, 0))
  expect(lines).toHaveLength(3)
  expect(lines[2]).toBe("TemperErrors: recorded 2 error envelopes")
})

test("one error held back reads as an entry and two read as entries", () => {
  expect(errorLogLines(decision(0, 1))[0]).toBe("TemperErrors: suppressed 1 stale-residue entry")
  expect(errorLogLines(decision(0, 2))[0]).toBe("TemperErrors: suppressed 2 stale-residue entries")
})

test("errors held back with none carried up logs both facts", () => {
  expect(errorLogLines(decision(0, 3))).toEqual([
    "TemperErrors: suppressed 3 stale-residue entries",
    "TemperErrors: no new or recurred errors",
  ])
})
