
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { assertBootFiles, type BootFile, REQUIRED_BOOT_FILES } from "../lib/supervisor-config.ts"

let dir: string

beforeEach(() => {
  dir = mkdtempSync("/var/tmp/supervisor-boot-files-")
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

const FIXTURE: BootFile = {
  path: "",
  noun: "boot file",
  consequence: "The session would start without it and never say so.",
}

function bootFileAt(path: string): BootFile {
  return { ...FIXTURE, path }
}

describe("REQUIRED_BOOT_FILES", () => {
  it("declares nothing: no path may halt every agent at once without its own argument", () => {
    expect(REQUIRED_BOOT_FILES).toEqual([])
  })
})

describe("assertBootFiles refuses", () => {
  it("a dangling symlink — the target does not exist", () => {
    const link = join(dir, "system-prompt.md")
    symlinkSync(join(dir, "nowhere.md"), link)
    expect(() => assertBootFiles([bootFileAt(link)])).toThrow(link)
  })

  it("a path with nothing at it", () => {
    expect(() => assertBootFiles([bootFileAt(join(dir, "absent.md"))])).toThrow("not found")
  })

  it("a directory — present, but not a regular file", () => {
    const asDir = join(dir, "system-prompt.md")
    mkdirSync(asDir)
    expect(() => assertBootFiles([bootFileAt(asDir)])).toThrow("not a regular file")
  })

  it("a later entry, not only the first — every declared file is checked", () => {
    const good = join(dir, "system-prompt.md")
    writeFileSync(good, "ok")
    const bad = join(dir, "other.md")
    symlinkSync(join(dir, "nowhere.md"), bad)
    expect(() => assertBootFiles([{ ...bootFileAt(good), noun: "first" }, bootFileAt(bad)])).toThrow(
      bad
    )
  })
})

describe("assertBootFiles permits", () => {
  it("a symlink to a real file — the workstation shape", () => {
    const target = join(dir, "target.md")
    writeFileSync(target, "# a boot file\n")
    const link = join(dir, "system-prompt.md")
    symlinkSync(target, link)
    expect(() => assertBootFiles([bootFileAt(link)])).not.toThrow()
  })

  it("a plain regular file — legitimate on a host with no symlink layout", () => {
    const plain = join(dir, "other.md")
    writeFileSync(plain, "# a boot file\n")
    expect(() => assertBootFiles([bootFileAt(plain)])).not.toThrow()
  })

  it("a symlink pointing somewhere other than the declared target", () => {
    const elsewhere = join(dir, "some-other-file.md")
    writeFileSync(elsewhere, "# a boot file\n")
    const link = join(dir, "system-prompt.md")
    symlinkSync(elsewhere, link)
    expect(() => assertBootFiles([bootFileAt(link)])).not.toThrow()
  })

  it("an empty file", () => {
    const empty = join(dir, "other.md")
    writeFileSync(empty, "")
    expect(() => assertBootFiles([bootFileAt(empty)])).not.toThrow()
  })

  it("content that says nothing about principles", () => {
    const unrelated = join(dir, "other.md")
    writeFileSync(unrelated, "just some text\n")
    expect(() => assertBootFiles([bootFileAt(unrelated)])).not.toThrow()
  })

  it("an empty file set", () => {
    expect(() => assertBootFiles([])).not.toThrow()
  })
})

describe("the failure message repairs the reader", () => {
  it("names the path, the consequence, and the repair when the file is missing", () => {
    const link = join(dir, "system-prompt.md")
    symlinkSync(join(dir, "nowhere.md"), link)
    let message = ""
    try {
      assertBootFiles([bootFileAt(link)])
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message).toContain(link)
    expect(message).toContain(FIXTURE.consequence)
    expect(message).toContain("setup-symlinks.sh")
  })

  it("names the path, the consequence, and the repair when the file is not regular", () => {
    const asDir = join(dir, "system-prompt.md")
    mkdirSync(asDir)
    let message = ""
    try {
      assertBootFiles([bootFileAt(asDir)])
    } catch (err) {
      message = err instanceof Error ? err.message : String(err)
    }
    expect(message).toContain(asDir)
    expect(message).toContain(FIXTURE.consequence)
    expect(message).toContain("setup-symlinks.sh")
  })
})
