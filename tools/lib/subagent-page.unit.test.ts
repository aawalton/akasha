import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { keepingReadings, takeOrphanedReadings } from "./subagent-page.ts"

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

describe("an act that takes a subagent's page", () => {
  test("leaves the readings standing where the act took them with the page", () => {
    const page = put("astra--eee.subagent.md", "---\nsubagent-id: eee\n---\n")
    const readings = put(`astra--eee.subagent${READINGS}`, '{"/f/a.md":{"oid":"aaa","seenAt":1}}\n')
    keepingReadings(page, () => {
      rmSync(page, { force: true })
      rmSync(readings, { force: true })
    })
    expect(existsSync(readings)).toBe(true)
    expect(readFileSync(readings, "utf8")).toBe('{"/f/a.md":{"oid":"aaa","seenAt":1}}\n')
    expect(existsSync(page)).toBe(false)
  })

  test("hands back what the act returned, the page still going", () => {
    const page = put("astra--fff.subagent.md", "---\nsubagent-id: fff\n---\n")
    put(`astra--fff.subagent${READINGS}`, "{}\n")
    const gave = keepingReadings(page, () => {
      rmSync(page, { force: true })
      return "taken"
    })
    expect(gave).toBe("taken")
    expect(existsSync(page)).toBe(false)
  })

  test("writes nothing back where there were no readings to keep", () => {
    const page = put("astra--ggg.subagent.md", "---\nsubagent-id: ggg\n---\n")
    keepingReadings(page, () => {
      rmSync(page, { force: true })
    })
    expect(existsSync(`${dir}/astra--ggg.subagent${READINGS}`)).toBe(false)
  })
})

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