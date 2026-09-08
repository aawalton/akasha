import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { sizeOnDisk } from "./file-size.module.code.ts"

const SCRATCH = "/var/tmp"

function scratch(): string {
  return mkdtempSync(join(SCRATCH, "file-size-"))
}

test("the bytes a file holds are counted", () => {
  const at = join(scratch(), "one.txt")
  writeFileSync(at, "held")
  expect(sizeOnDisk(at)).toBe(4)
})

test("a path holding no file counts no bytes", () => {
  expect(sizeOnDisk(join(scratch(), "gone.txt"))).toBe(0)
})

test("a path holding a folder counts no bytes", () => {
  expect(sizeOnDisk(scratch())).toBe(0)
})

test("a path under a file counts no bytes", () => {
  const at = join(scratch(), "one.txt")
  writeFileSync(at, "held")
  expect(sizeOnDisk(join(at, "under.txt"))).toBe(0)
})
