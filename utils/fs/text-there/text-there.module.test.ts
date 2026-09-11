import { expect, test } from "bun:test"
import { mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { textThere } from "akasha/utils/fs/text-there/text-there.module.code.ts"

const SCRATCH = "/var/tmp"

function scratch(): string {
  return mkdtempSync(join(SCRATCH, "text-there-"))
}

test("the text a file holds is answered", () => {
  const at = join(scratch(), "one.txt")
  writeFileSync(at, "held")
  expect(textThere(at)).toBe("held")
})

test("a path holding no file answers nothing", () => {
  expect(textThere(join(scratch(), "gone.txt"))).toBe(null)
})

test("a read that failed for another reason answers nothing rather than throwing", () => {
  expect(textThere(scratch())).toBe(null)
})
