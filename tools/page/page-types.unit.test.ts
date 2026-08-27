import { expect, test } from "bun:test"
import { claiming, typeSuffixIn, typeSuffixOf, type PageType } from "../../page/page-types.ts"

function typeOf(slug: string, place: string): PageType {
  return {
    slug,
    relPath: `pages/page-type/${slug}.page-type.md`,
    filed: [{ repo: "instructions", place }],
    extends: null,
    namedFor: null,
  }
}

const ALPHA = typeOf("alpha", "**/*.alpha.md")
const LEGACY = typeOf("legacy", "pages/legacy/**/*.md")
const BETA = typeOf("beta", "**/*.beta.md")

function claimed(relPath: string, types: readonly PageType[]): string {
  return claiming(relPath, "instructions", types)
    .map((one) => one.slug)
    .join(",")
}

test("a page file's type suffix is the segment its name ends on before the markdown one", () => {
  expect(typeSuffixOf("pages/x/alan.person.md")).toBe("person")
  expect(typeSuffixOf("pages/x/file-kind-ts.file-kind-domain.md")).toBe("file-kind-domain")
  expect(typeSuffixOf("pages/x/a.b.domain.md")).toBe("domain")
})

test("a name carrying no suffix but the markdown one names no type, so nothing claims it by name", () => {
  expect(typeSuffixOf("pages/x/alan.md")).toBe("")
  expect(typeSuffixOf("pages/domain/domain.md")).toBe("")
  expect(typeSuffixOf("pages/x/alan.person.json")).toBe("")
})

test("a glob matching by name anywhere names the type it matches; one naming a folder names none", () => {
  expect(typeSuffixIn("**/*.domain.md")).toBe("domain")
  expect(typeSuffixIn("pages/domain/**/*.md")).toBeNull()
  expect(typeSuffixIn("**/*.md")).toBeNull()
})

test("a page is claimed by the type its own name states", () => {
  expect(claimed("pages/anywhere/one.alpha.md", [ALPHA, LEGACY, BETA])).toBe("alpha")
  expect(claimed("pages/anywhere/one.md", [ALPHA, LEGACY, BETA])).toBe("")
})

test("a type stating a folder still claims what stands in that folder, name or no name", () => {
  expect(claimed("pages/legacy/one.md", [ALPHA, LEGACY, BETA])).toBe("legacy")
})

test("a page two types claim is handed back under both, in the order the registry states them", () => {
  expect(claimed("pages/legacy/one.beta.md", [ALPHA, LEGACY, BETA])).toBe("legacy,beta")
  expect(claimed("pages/legacy/one.beta.md", [BETA, LEGACY, ALPHA])).toBe("beta,legacy")
})

test("a type filed in another repo claims nothing here", () => {
  expect(claiming("pages/anywhere/one.alpha.md", "memory", [ALPHA]).length).toBe(0)
})
