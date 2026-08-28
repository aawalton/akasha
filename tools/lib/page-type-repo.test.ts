import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { placedElsewhere } from "./page-type-repo.ts"
import type { Roots } from "../../page/page.ts"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function tmp(name: string): string {
  const at = mkdtempSync(`/var/tmp/${name}-`)
  made.push(at)
  return at
}

function rootsWith(files: Readonly<Record<string, readonly string[]>>): Roots {
  const akasha = tmp("placed-akasha")
  const codeEditor = tmp("placed-code-editor")
  mkdirSync(`${akasha}/pages/page-type`, { recursive: true })
  writeFileSync(
    `${akasha}/pages/page-type/gadget.page-type.md`,
    "---\nslug: gadget\nfiles: \"code-editor:**/*.gadget.md\"\n---\n",
    "utf8"
  )
  for (const [dir, names] of Object.entries(files)) {
    mkdirSync(`${codeEditor}/${dir}`, { recursive: true })
    for (const one of names) writeFileSync(`${codeEditor}/${dir}/${one}`, "---\n---\n", "utf8")
  }
  return { akasha, "code-editor": codeEditor } as Roots
}

const from = (roots: Roots): string => roots["akasha"] as string

test("a page no file stands for is addressed by the name its page type gives it", () => {
  const roots = rootsWith({})
  expect(placedElsewhere("gadget/widget", from(roots), roots)?.relPath).toBe("pages/gadget/widget.gadget.md")
})

test("the address for an absent page is one its page type claims", () => {
  const roots = rootsWith({})
  const found = placedElsewhere("gadget/widget", from(roots), roots)
  expect(found?.absolute).toBe(`${roots["code-editor"] as string}/pages/gadget/widget.gadget.md`)
})

test("a page standing with its type in its name is found where it stands", () => {
  const roots = rootsWith({ "pages/gadget": ["widget.gadget.md"] })
  expect(placedElsewhere("gadget/widget", from(roots), roots)?.relPath).toBe("pages/gadget/widget.gadget.md")
})

test("a page standing under a bare spelling is found under that spelling", () => {
  const roots = rootsWith({ "pages/gadget": ["widget.md"] })
  expect(placedElsewhere("gadget/widget", from(roots), roots)?.relPath).toBe("pages/gadget/widget.md")
})
