import { expect, test } from "bun:test"
import { typeSuffixIn, typeSuffixOf } from "../../page/page-types.ts"

test("a page file's type suffix is the segment its name ends on before the markdown one", () => {
  expect(typeSuffixOf("pages/x/alan.person.md")).toBe("person")
  expect(typeSuffixOf("pages/x/file-kind-ts.file-kind-domain.md")).toBe("file-kind-domain")
  expect(typeSuffixOf("pages/x/a.b.domain.md")).toBe("domain")
})

test("a name carrying no suffix but the markdown one names no type", () => {
  expect(typeSuffixOf("pages/x/alan.md")).toBe("")
  expect(typeSuffixOf("pages/domain/domain.md")).toBe("")
  expect(typeSuffixOf("pages/x/alan.person.json")).toBe("")
})

test("a glob matching by name anywhere names the type it matches; one naming a folder names none", () => {
  expect(typeSuffixIn("**/*.domain.md")).toBe("domain")
  expect(typeSuffixIn("pages/domain/**/*.md")).toBeNull()
  expect(typeSuffixIn("**/*.md")).toBeNull()
})
