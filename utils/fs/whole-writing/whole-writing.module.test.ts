import { afterAll, expect, test } from "bun:test"
import { Buffer } from "node:buffer"
import { closeSync, openSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writtenWhole } from "akasha/utils/fs/whole-writing/whole-writing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function openedAt(name: string): { readonly fd: number; readonly at: string } {
  const at = join(scratch.rootFor("akasha-whole-writing-"), name)
  return { fd: openSync(at, "w"), at }
}

test("every byte handed in reaches the destination", () => {
  const held = openedAt("held.txt")
  writtenWhole(held.fd, Buffer.from("one\ntwo\n"))
  closeSync(held.fd)
  expect(readFileSync(held.at, "utf8")).toBe("one\ntwo\n")
})

test("a run of no bytes is written nowhere", () => {
  const held = openedAt("empty.txt")
  writtenWhole(held.fd, Buffer.from(""))
  closeSync(held.fd)
  expect(readFileSync(held.at, "utf8")).toBe("")
})

test("a destination refusing bytes for any other reason raises", () => {
  const held = openedAt("closed.txt")
  closeSync(held.fd)
  expect(() => writtenWhole(held.fd, Buffer.from("one\n"))).toThrow()
})
