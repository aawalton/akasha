/**
 * What the fidelity reader makes of a day page whose rows are divided across parts.
 *
 * A property past the entry ceiling is written to `<key>.partN.jsonl` beside `<key>.jsonl`. This
 * reader asked `besideAt`, which names the first file alone, so a part was read by nobody AND then
 * reported as "rows sit here that no page states" — a fault, which refuses the whole landing over
 * a file the page does state. Two failures from one missing rule.
 */

import { afterEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { readAkashaPageCorpus } from "./read-corpus.ts"

const PAGE = "day-2026-03-05.daily-tracking.ts"

const BODY = `export const day20260305 = {
  pageTypeSlug: "daily-tracking",
  date: "2026-03-05",
  sessions: "jsonl",
} as const
`

function sessionsAt(minute: number): string {
  return `{"startTime":"2026-03-05T0${minute}:00:00Z","endTime":"2026-03-05T0${minute}:30:00Z"}\n`
}

describe("a day page whose sessions are divided across parts", () => {
  const built: string[] = []

  afterEach(() => {
    for (const one of built) rmSync(one, { recursive: true, force: true })
    built.length = 0
  })

  function corpusHolding(rows: Readonly<Record<string, string>>): string {
    const at = mkdtempSync(join(tmpdir(), "read-corpus-parts-"))
    built.push(at)
    writeFileSync(join(at, PAGE), BODY)
    for (const [name, text] of Object.entries(rows)) writeFileSync(join(at, name), text)
    return at
  }

  test("every part is read, and the rows of all of them reach the corpus", async () => {
    const at = corpusHolding({
      "day-2026-03-05.daily-tracking.sessions.jsonl": sessionsAt(1),
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl": sessionsAt(2) + sessionsAt(3),
      "day-2026-03-05.daily-tracking.sessions.part10.jsonl": sessionsAt(4),
    })
    const corpus = await readAkashaPageCorpus(at)
    expect(corpus.faults).toEqual([])
    expect(corpus.sessions.length).toBe(4)
  })

  /**
   * The fault this reader raised over a legitimate part. It names no page, so the landing that
   * reads this corpus refuses — over a file the page beside it does state.
   */
  test("a part is no longer reported as rows no page states", async () => {
    const at = corpusHolding({
      "day-2026-03-05.daily-tracking.sessions.jsonl": sessionsAt(1),
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl": sessionsAt(2),
    })
    const corpus = await readAkashaPageCorpus(at)
    expect(corpus.faults.map((one) => one.reason)).not.toContain(
      "rows sit here that no page states, so nothing would ever read them"
    )
  })

  test("the rows keep one order across the parts, counted from the first", async () => {
    const at = corpusHolding({
      "day-2026-03-05.daily-tracking.sessions.jsonl": sessionsAt(1) + sessionsAt(2),
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl": sessionsAt(3),
    })
    const corpus = await readAkashaPageCorpus(at)
    expect(corpus.sessions.map((one) => one.ordinal)).toEqual([0, 1, 2])
    expect(corpus.sessions.map((one) => one.fields.get("start-time"))).toEqual([
      "2026-03-05T01:00:00Z",
      "2026-03-05T02:00:00Z",
      "2026-03-05T03:00:00Z",
    ])
    expect(corpus.sessions[2]?.locator).toContain(".sessions.part2.jsonl#1")
  })

  test("rows that truly no page states are still reported", async () => {
    const at = corpusHolding({
      "day-2026-03-05.daily-tracking.sessions.jsonl": sessionsAt(1),
      "nobody.daily-tracking.sessions.jsonl": sessionsAt(2),
    })
    const corpus = await readAkashaPageCorpus(at)
    expect(corpus.faults.map((one) => one.reason)).toContain(
      "rows sit here that no page states, so nothing would ever read them"
    )
    expect(corpus.faults.length).toBe(1)
  })

  test("a page whose property names a file that is nowhere is still a fault", async () => {
    const at = corpusHolding({})
    const corpus = await readAkashaPageCorpus(at)
    expect(corpus.faults.length).toBe(1)
    expect(corpus.faults[0]?.reason).toContain("no file is there")
  })
})
