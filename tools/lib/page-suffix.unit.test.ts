import { expect, test } from "bun:test"
import { identityOf, locationFreeGlob, rekeyReadings, suffixedPath } from "./page-suffix.ts"

test("a page file's suffixes are its page type and then its file kind", () => {
  expect(suffixedPath("pages/file-purpose/example-purpose.md", "file-purpose")).toBe(
    "pages/file-purpose/example-purpose.file-purpose.md"
  )
  expect(suffixedPath("pages/domain/example-domain.md", "domain")).toBe("pages/domain/example-domain.domain.md")
})

test("a page nested under its folder keeps every folder it sat in", () => {
  expect(suffixedPath("ops-cli/global/read/read.md", "command")).toBe(
    "ops-cli/global/read/read.command.md"
  )
})

test("a page type filed by name names no folder at all", () => {
  expect(locationFreeGlob("akasha", "domain")).toBe("akasha:**/*.domain.md")
  expect(locationFreeGlob("memory", "finding")).toBe("memory:**/*.finding.md")
})

test("a stated slug and a stated id survive the rename, being read off neither path", () => {
  const body = "---\nid: held-id\nslug: example-domain\n---\n\nbody\n"
  const was = identityOf("akasha", "pages/domain/example-domain.md", body)
  const now = identityOf("akasha", "pages/domain/example-domain.domain.md", body)
  expect(was).toEqual({ slug: "example-domain", id: "held-id" })
  expect(now).toEqual(was)
})

test("an unstated id is read off the path, so it does not survive the rename", () => {
  const body = "---\nslug: example-domain\n---\n\nbody\n"
  const was = identityOf("akasha", "pages/domain/example-domain.md", body)
  const now = identityOf("akasha", "pages/domain/example-domain.domain.md", body)
  expect(now.id).not.toBe(was.id)
})

test("a reading record follows the page it recorded, and keeps what it never named", () => {
  const text = JSON.stringify({
    "/repos/akasha/pages/domain/example-domain.md": { spans: [[1, 9]] },
    "/repos/akasha/pages/role/example-role.md": { spans: [[1, 2]] },
  })
  const moved = new Map([
    ["/repos/akasha/pages/domain/example-domain.md", "/repos/akasha/pages/domain/example-domain.domain.md"],
  ])
  const rewritten = rekeyReadings(text, moved)
  expect(rewritten).not.toBeNull()
  const held = JSON.parse(rewritten as string) as Record<string, unknown>
  expect(Object.keys(held).sort()).toEqual([
    "/repos/akasha/pages/domain/example-domain.domain.md",
    "/repos/akasha/pages/role/example-role.md",
  ])
  expect(held["/repos/akasha/pages/domain/example-domain.domain.md"]).toEqual({ spans: [[1, 9]] })
})

test("a reading record naming nothing that moved is left as it was written", () => {
  const text = JSON.stringify({ "/repos/akasha/pages/role/example-role.md": { spans: [[1, 2]] } })
  expect(rekeyReadings(text, new Map([["/repos/akasha/pages/domain/example-domain.md", "x"]]))).toBeNull()
})
