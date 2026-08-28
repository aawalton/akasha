import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { pageFileIn } from "../../page/page-file.ts"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function treeOf(names: readonly string[]): { root: string; dir: string } {
  const root = mkdtempSync(`${process.env.TMPDIR ?? "/var/tmp"}/page-file-named-`)
  made.push(root)
  const dir = "pages/gadget"
  mkdirSync(`${root}/${dir}`, { recursive: true })
  for (const one of names) writeFileSync(`${root}/${dir}/${one}`, "---\n---\n", "utf8")
  return { root, dir }
}

test("a file named only for the page is found by that name", () => {
  const { root, dir } = treeOf(["widget.md"])
  expect(pageFileIn(root, dir, "widget")).toBe("pages/gadget/widget.md")
})

test("a file carrying its page type between stem and markdown is found by its stem", () => {
  const { root, dir } = treeOf(["widget.gadget.md"])
  expect(pageFileIn(root, dir, "widget")).toBe("pages/gadget/widget.gadget.md")
})

test("the name is matched whole, never as the head of a longer stem", () => {
  const { root, dir } = treeOf(["widget-holder.gadget.md"])
  expect(pageFileIn(root, dir, "widget")).toBeNull()
})

test("a page no file is named for is found nowhere", () => {
  const { root, dir } = treeOf(["widget.gadget.md"])
  expect(pageFileIn(root, dir, "sprocket")).toBeNull()
})

test("a directory that is not there holds no page", () => {
  const { root } = treeOf([])
  expect(pageFileIn(root, "pages/absent", "widget")).toBeNull()
})

test("where a bare name and a suffixed one both stand, the bare one is the page", () => {
  const { root, dir } = treeOf(["widget.md", "widget.gadget.md"])
  expect(pageFileIn(root, dir, "widget")).toBe("pages/gadget/widget.md")
})

test("a file of another kind beside the page is not the page", () => {
  const { root, dir } = treeOf(["widget.readings.attachment.json"])
  expect(pageFileIn(root, dir, "widget")).toBeNull()
})
