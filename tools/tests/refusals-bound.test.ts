
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { afterAll, beforeEach, describe, expect, test } from "bun:test"
import { refusalsBound } from "../audits/refusals-bound.ts"
import { HOLES_KEY } from "../../page/document/holes.ts"
import type { RepoView } from "../lib/check.ts"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { pageFileIn } from "../../page/page-file.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const root = mkdtempSync("/var/tmp/refusals-bound-")
afterAll(() => rmSync(root, { recursive: true, force: true }))

function put(relPath: string, body: string): void {
  const path = join(root, relPath)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
}

beforeEach(() => {
  rmSync(join(root, "pages/refusal"), { recursive: true, force: true })
  rmSync(join(root, "tools"), { recursive: true, force: true })
  rmSync(join(root, "services"), { recursive: true, force: true })
})

const view: RepoView = {
  roots: rootsNamed({ akasha: root }, "akasha"),
  name: "akasha",
  documents: [],
  read: () => "",
  exists: () => false,
}

const document = (holes: readonly string[]): string =>
  `---\nholes:\n${holes.map((h) => `  - ${h}\n`).join("")}---\n\n# Refusal\n\n${holes.map((h) => `{${h}}`).join(" ")}\n`

const printer = (values: string): string =>
  `export const g = (s) => refusalText("slug-stem", ${values}, s.roots.akasha, s.read)\n`

const pair = (holes: readonly string[], values: string): void => {
  put("pages/refusal/slug-stem.refusal.md", document(holes))
  put("tools/gates/slug-stem.ts", printer(values))
}

const live = join(import.meta.dir, "..", "..")

const OWN = [
  "refusal-slug-not-literal",
  "refusal-values-unreadable",
  "refusal-document-absent",
  "refusal-hole-unfilled",
  "refusal-value-surplus",
  "refusal-document-unprinted",
] as const

function ownWords(): void {
  const calls: string[] = []
  for (const slug of OWN) {
    const relPath = pageFileIn(live, "pages/refusal", slug)
    if (relPath === null) throw new Error(`no refusal page is slugged ${slug}`)
    const body = readFileSync(join(live, relPath), "utf8")
    put(relPath, body)
    const held = parseFrontmatter(body).fields.get(HOLES_KEY)
    const holes = Array.isArray(held) ? held.map((name) => String(name)) : []
    calls.push(`export const p${calls.length} = (s) => refusalText("${slug}", { ${holes.map((name) => `${name}: s`).join(", ")} }, r, s.read)`)
  }
  put("tools/gates/own-words.ts", `${calls.join("\n")}\n`)
}

describe("a refusal document against the instrument that prints it", () => {
  test("passes where every hole is a value and every value is a hole", () => {
    pair(["path", "stem"], "{ path: s.relPath, stem }")
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("is refused where the document marks a hole the caller hands over nothing for", () => {
    ownWords()
    pair(["path", "stem"], "{ path: s.relPath }")
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("is refused where the caller hands over a value the document marks nowhere", () => {
    ownWords()
    pair(["path"], "{ path: s.relPath, stem }")
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("reads a shorthand key and an explicit one alike, both being one name", () => {
    pair(["path"], "{ path }")
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("splits on the commas between values and not the ones inside them", () => {
    pair(["path"], "{ path: pick(a, b) }")
    expect(refusalsBound(view).verdict).toBe("pass")
  })
})

describe("a half of the pair standing alone", () => {
  test("a document nothing prints is refused, being words no agent is shown", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("an instrument whose document is absent is refused", () => {
    ownWords()
    put("tools/gates/slug-stem.ts", printer("{ path }"))
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("a repo with neither passes over an empty population rather than silently", () => {
    const outcome = refusalsBound(view)
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population?.measured).toBe(0)
  })
})

describe("what it will not read", () => {
  test("a first argument that is not a quoted slug is refused, being a pair it cannot find", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("tools/gates/slug-stem.ts", `const NAME = "slug-stem"\nexport const g = (s) => refusalText(NAME, { path }, r, s.read)\n`)
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("an instrument outside tools/ is read, a printer being found wherever it stands", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("services/slug-stem.ts", printer("{ path }"))
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("a document is found by the slug at the call and not by the file printing it", () => {
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("tools/gates/anything-at-all.ts", printer("{ path }"))
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("values that are not a plain object literal are refused rather than skipped", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("tools/gates/slug-stem.ts", `export const g = (s) => refusalText("slug-stem", built(s), r, s.read)\n`)
    expect(refusalsBound(view).verdict).toBe("fail")
  })
})

describe("a call that picks between slugs", () => {
  const picker = `export const g = (s) => refusalText(a ? "slug-stem" : "other-stem", { path }, r, s.read)\n`

  test("binds every branch, one decision printing either document being one call", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("pages/refusal/other-stem.refusal.md", document(["path"]))
    put("tools/gates/slug-stem.ts", picker)
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("a branch whose document is absent is refused, that half of the pair standing alone", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("tools/gates/slug-stem.ts", picker)
    expect(refusalsBound(view).verdict).toBe("fail")
  })

  test("a quoted string in the condition is not a slug, standing after neither branch mark", () => {
    ownWords()
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put("pages/refusal/other-stem.refusal.md", document(["path"]))
    put(
      "tools/gates/slug-stem.ts",
      `export const g = (s) => refusalText(m === "strict" ? "slug-stem" : "other-stem", { path }, r, s.read)\n`
    )
    expect(refusalsBound(view).verdict).toBe("pass")
  })
})

describe("a value holding a string literal", () => {
  test("a comma inside a string separates nothing, being text rather than syntax", () => {
    ownWords()
    pair(["path", "stem"], `{ path: "a, b", stem }`)
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("a brace inside a string closes nothing, so the object runs to its own", () => {
    ownWords()
    pair(["path", "stem"], `{ path: "}", stem }`)
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("a quote a backslash escapes leaves the string standing", () => {
    ownWords()
    pair(["path", "stem"], `{ path: "a \\" b, c", stem }`)
    expect(refusalsBound(view).verdict).toBe("pass")
  })

  test("a template's text is text and its substitution is code", () => {
    ownWords()
    pair(["path", "stem"], "{ path: `a, b ${pick(c, d)} e`, stem }")
    expect(refusalsBound(view).verdict).toBe("pass")
  })
})

describe("a file where the function is itself declared", () => {
  const namedIn = (relPath: string): readonly string[] =>
    refusalsBound(view).messages.filter((said) => said.includes(relPath))

  test("a call beside the definition is read, the definition licensing its own occurrence and nothing else", () => {
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put(
      "tools/gates/slug-stem.ts",
      `export function refusalText(slug, values) {\n  return slug\n}\nexport const g = (s) => refusalText(NAME, { path }, r, s.read)\n`
    )
    expect(namedIn("tools/gates/slug-stem.ts")).not.toEqual([])
  })

  test("a declaration is no call, a type declaration standing for the function rather than reaching it", () => {
    put("pages/refusal/slug-stem.refusal.md", document(["path"]))
    put(
      "tools/gates/slug-stem.d.ts",
      `export declare function refusalText(slug: string, values: Readonly<Record<string, string>>): string;\n`
    )
    expect(namedIn("tools/gates/slug-stem.d.ts")).toEqual([])
  })
})
