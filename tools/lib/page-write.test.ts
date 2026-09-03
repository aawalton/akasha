/**
 * What a page removal takes away with it when one of its properties is divided across parts.
 *
 * `ops rm` and `ops mv` both promise in words that "a page's own files go with it — an attachment,
 * a rows file AND ITS PARTS". The removal asked `rowsFileOf`, which names the first file only, so
 * every part stayed on disk after the page that named it had gone. Five such files, 17.8 MB, are
 * sitting under `pages/seat-log-day/` now: unreachable, because no page names them, and undeleted.
 */

import { afterEach, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { rowsFileOf } from "@akasha/markdown-pages/rows-file"
import { rowsPartsFor } from "./page-write.ts"

const PAGE = "day-2026-03-05.daily-tracking.md"

describe("every file one property's rows are in", () => {
  const built: string[] = []

  afterEach(() => {
    for (const one of built) rmSync(one, { recursive: true, force: true })
    built.length = 0
  })

  function dirHolding(names: readonly string[]): string {
    const at = mkdtempSync(join(tmpdir(), "page-write-parts-"))
    built.push(at)
    for (const one of names) writeFileSync(join(at, one), '{"one":1}\n')
    return at
  }

  test("a divided property answers with every part, and the first is the bare name", () => {
    const at = dirHolding([
      "day-2026-03-05.daily-tracking.sessions.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part10.jsonl",
    ])
    const found = rowsPartsFor(rowsFileOf(join(at, PAGE), "sessions"), rowsFileOf(PAGE, "sessions"))
    expect(found.map((one) => one.at)).toEqual([
      "day-2026-03-05.daily-tracking.sessions.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part10.jsonl",
    ])
  })

  test("removing every file it names leaves the property with nothing on disk", () => {
    const at = dirHolding([
      "day-2026-03-05.daily-tracking.sessions.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part3.jsonl",
      "day-2026-03-05.daily-tracking.completed-tasks.jsonl",
    ])
    for (const one of rowsPartsFor(
      rowsFileOf(join(at, PAGE), "sessions"),
      rowsFileOf(PAGE, "sessions")
    )) {
      rmSync(one.path, { force: true })
    }
    expect(readdirSync(at)).toEqual(["day-2026-03-05.daily-tracking.completed-tasks.jsonl"])
  })

  test("another property's parts are left where they are", () => {
    const at = dirHolding([
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl",
      "day-2026-03-05.daily-tracking.completed-tasks.part2.jsonl",
    ])
    const found = rowsPartsFor(rowsFileOf(join(at, PAGE), "sessions"), rowsFileOf(PAGE, "sessions"))
    expect(found.map((one) => one.at)).toEqual([
      "day-2026-03-05.daily-tracking.sessions.part2.jsonl",
    ])
    expect(existsSync(join(at, "day-2026-03-05.daily-tracking.completed-tasks.part2.jsonl"))).toBe(
      true
    )
  })

  test("rows kept outside the commit are divided by the same rule", () => {
    const at = dirHolding([
      "day-2026-03-05.daily-tracking.sessions.uncommitted.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part2.uncommitted.jsonl",
      "day-2026-03-05.daily-tracking.sessions.jsonl",
    ])
    const found = rowsPartsFor(
      rowsFileOf(join(at, PAGE), "sessions", true),
      rowsFileOf(PAGE, "sessions", true)
    )
    expect(found.map((one) => one.at)).toEqual([
      "day-2026-03-05.daily-tracking.sessions.uncommitted.jsonl",
      "day-2026-03-05.daily-tracking.sessions.part2.uncommitted.jsonl",
    ])
  })

  test("a property with nothing on disk is nothing to take away", () => {
    const at = dirHolding([])
    expect(
      rowsPartsFor(rowsFileOf(join(at, PAGE), "sessions"), rowsFileOf(PAGE, "sessions"))
    ).toEqual([])
  })

  test("a page folder that is not there is answered rather than thrown at", () => {
    expect(rowsPartsFor(`${tmpdir()}/nowhere-at-all/${PAGE}`, PAGE)).toEqual([])
  })
})
