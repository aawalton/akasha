import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { pageRelIn, pageTypePathIn } from "../../page/page-types.ts"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

function rootOf(files: Readonly<Record<string, readonly string[]>>): string {
  const root = mkdtempSync("/var/tmp/page-file-suffixed-")
  made.push(root)
  for (const [dir, names] of Object.entries(files)) {
    mkdirSync(`${root}/${dir}`, { recursive: true })
    for (const one of names) writeFileSync(`${root}/${dir}/${one}`, "---\n---\n", "utf8")
  }
  return root
}

test("a page type whose own file took its suffix is still found by its slug", () => {
  const root = rootOf({ "pages/page-type": ["gadget.page-type.md"] })
  expect(pageTypePathIn(root, "gadget")).toBe("pages/page-type/gadget.page-type.md")
})

test("a page type whose file has not taken its suffix is found unchanged", () => {
  const root = rootOf({ "pages/page-type": ["gadget.md"] })
  expect(pageTypePathIn(root, "gadget")).toBe("pages/page-type/gadget.md")
})

test("a person whose file took its suffix is still found by their name", () => {
  const root = rootOf({ "pages/person": ["alan.person.md"] })
  expect(pageRelIn(root, "person", "alan")).toBe("pages/person/alan.person.md")
})

test("a page no file stands for reads back as where it would be written", () => {
  const root = rootOf({ "pages/person": ["alan.person.md"] })
  expect(pageRelIn(root, "person", "sam")).toBe("pages/person/sam.person.md")
})
