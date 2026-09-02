import { afterEach, describe, expect, test } from "bun:test"
import { appendFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { driftBetween, fingerprintOf } from "./fingerprint.ts"

const made: string[] = []

function corpus(): string {
  const at = mkdtempSync(join(tmpdir(), "landing-fingerprint-"))
  made.push(at)
  writeFileSync(join(at, "2026-03-05.daily-tracking.md"), "---\nid: one\n---\n")
  writeFileSync(join(at, "2026-03-05.daily-tracking.sessions.jsonl"), '{"id":"a"}\n')
  return at
}

afterEach(() => {
  for (const at of made.splice(0)) rmSync(at, { recursive: true, force: true })
})

describe("what a corpus held at one instant", () => {
  test("a corpus that has not moved drifts in nothing", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    expect(driftBetween(before, fingerprintOf(at))).toEqual([])
    expect(before.files.size).toBe(2)
  })

  test("a session row appended is named, and named as growth", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    appendFileSync(join(at, "2026-03-05.daily-tracking.sessions.jsonl"), '{"id":"b"}\n')
    const drift = driftBetween(before, fingerprintOf(at))
    expect(drift).toHaveLength(1)
    expect(drift[0]?.name).toBe("2026-03-05.daily-tracking.sessions.jsonl")
    expect(drift[0]?.kind).toBe("grew")
  })

  test("a new day appearing is named, which midnight makes happen on its own", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    writeFileSync(join(at, "2026-03-06.daily-tracking.md"), "---\nid: two\n---\n")
    const drift = driftBetween(before, fingerprintOf(at))
    expect(drift).toHaveLength(1)
    expect(drift[0]?.kind).toBe("appeared")
  })

  test("a row edited in place is caught though the file is the length it was", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    writeFileSync(join(at, "2026-03-05.daily-tracking.sessions.jsonl"), '{"id":"z"}\n')
    const drift = driftBetween(before, fingerprintOf(at))
    expect(drift).toHaveLength(1)
    expect(drift[0]?.kind).toBe("rewritten")
  })

  test("a file taken away is caught", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    rmSync(join(at, "2026-03-05.daily-tracking.sessions.jsonl"))
    const drift = driftBetween(before, fingerprintOf(at))
    expect(drift).toHaveLength(1)
    expect(drift[0]?.kind).toBe("vanished")
  })

  test("two files holding one another's contents are held apart, name by name", () => {
    const at = corpus()
    const before = fingerprintOf(at)
    const one = join(at, "2026-03-05.daily-tracking.md")
    const two = join(at, "2026-03-05.daily-tracking.sessions.jsonl")
    writeFileSync(one, '{"id":"a"}\n')
    writeFileSync(two, "---\nid: one\n---\n")
    expect(driftBetween(before, fingerprintOf(at))).toHaveLength(2)
  })
})

describe("what a fingerprint refuses to answer", () => {
  test("a directory in a flat corpus, rather than reading past it", () => {
    const at = corpus()
    mkdirSync(join(at, "archive"))
    expect(() => fingerprintOf(at)).toThrow("flat")
  })

  test("a root that is no directory, rather than answering that it holds nothing", () => {
    expect(() => fingerprintOf(join(tmpdir(), "landing-fingerprint-nowhere"))).toThrow("unknown")
  })
})
