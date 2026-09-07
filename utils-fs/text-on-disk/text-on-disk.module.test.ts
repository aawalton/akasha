import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { textOnDisk } from "./text-on-disk.module.code.ts"

function scratch(): string {
  return mkdtempSync(join(tmpdir(), "text-on-disk-"))
}

test("the text a file holds is answered", () => {
  const at = join(scratch(), "one.txt")
  writeFileSync(at, "held")
  expect(textOnDisk(at)).toBe("held")
})

test("a path holding no file answers nothing", () => {
  expect(textOnDisk(join(scratch(), "gone.txt"))).toBe(null)
})

test("a read that failed for another reason is carried rather than answered as nothing", () => {
  expect(() => textOnDisk(scratch())).toThrow()
})
