import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { takeOrphanedReadings } from "./subagent-page.ts"

const READINGS = ".readings.uncommitted.attachment.json"

let dir: string

beforeEach(() => {
  dir = mkdtempSync(`${tmpdir()}/subagent-page-orphans-`)
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function put(name: string, body: string): string {
  const at = `${dir}/${name}`
  writeFileSync(at, body, "utf8")
  return at
}

describe("a readings sidecar standing under a seat", () => {
  test("goes where no page stands beside it, nothing else being able to reach it", () => {
    const orphan = put(`astra--aaa.subagent${READINGS}`, "{}\n")
    expect(takeOrphanedReadings("astra", [dir])).toEqual([orphan])
    expect(existsSync(orphan)).toBe(false)
  })

  test("stays while its own page stands", () => {
    const kept = put(`astra--bbb.subagent${READINGS}`, "{}\n")
    put("astra--bbb.subagent.md", "---\nsubagent-id: bbb\n---\n")
    expect(takeOrphanedReadings("astra", [dir])).toEqual([])
    expect(existsSync(kept)).toBe(true)
  })

  test("stays where it stands under a seat other than the one being swept", () => {
    const kept = put(`nimue--ccc.subagent${READINGS}`, "{}\n")
    expect(takeOrphanedReadings("astra", [dir])).toEqual([])
    expect(existsSync(kept)).toBe(true)
  })

  test("is left alone where the file is not a readings sidecar", () => {
    const kept = put("astra--ddd.subagent.md", "---\nsubagent-id: ddd\n---\n")
    expect(takeOrphanedReadings("astra", [dir])).toEqual([])
    expect(existsSync(kept)).toBe(true)
  })
})