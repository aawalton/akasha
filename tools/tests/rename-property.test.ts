import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import {
  applied,
  definitionDestination,
  freshlyDerived,
  frontmatterKeyAt,
  keyValuePatch,
  lineTextAt,
  rekeyedCarriers,
  sitesIn,
  termOf,
} from "../lib/rename-property.ts"
import type { PageType } from "../../page/page-types.ts"
import { resolveRoots } from "../../repo/roots/roots"

const PAGE = [
  "---",
  "page-type-slug: domain",
  "slug: alan-harness",
  "domain-parents:",
  "  - foundational-layers",
  "  - alan",
  "domain-owner: foundational-layers",
  "---",
  "",
  "# Definition",
  "",
  "- **Alan harness** — the domain-parents of this one are listed above.",
  "",
].join("\n")

describe("frontmatterKeyAt", () => {
  test("finds the top-level key and not the same word in prose", () => {
    const at = frontmatterKeyAt(PAGE, "domain-parents")
    expect(at.length).toBe(1)
    expect(PAGE.slice(at[0] as number, (at[0] as number) + "domain-parents".length)).toBe("domain-parents")
  })

  test("renames the key and leaves the prose and the values alone", () => {
    const at = frontmatterKeyAt(PAGE, "domain-parents")[0] as number
    const out = applied(PAGE, [{ start: at, end: at + "domain-parents".length, text: "domain-parent-slug" }])
    expect(out).toContain("domain-parent-slug:\n  - foundational-layers")
    expect(out).toContain("the domain-parents of this one")
    expect(out).toContain("domain-owner: foundational-layers")
  })

  test("finds nothing for a key the page does not state", () => {
    expect(frontmatterKeyAt(PAGE, "persona-champion-slug").length).toBe(0)
  })

  test("finds nothing for a word standing only as a list item", () => {
    expect(frontmatterKeyAt(PAGE, "alan").length).toBe(0)
  })
})

describe("rekeyedCarriers", () => {
  const CARRIER = "pages/domain/alan-harness.domain.md"
  const AHEAD = PAGE.replace("domain-parents:", "domain-parent-slug:")

  test("keeps the key rename on a body supplied for a page that carries it", () => {
    const authored = PAGE.replace("# Definition", "# Rewritten\n\n# Definition")
    const { patched, twice } = rekeyedCarriers(
      [CARRIER],
      () => authored,
      new Set([CARRIER]),
      "domain-parents",
      "domain-parent-slug"
    )
    expect(twice).toEqual([])
    expect(patched.get(CARRIER)).toContain("domain-parent-slug:\n  - foundational-layers")
    expect(patched.get(CARRIER)).toContain("# Rewritten")
  })

  test("takes a supplied body already stating the new key", () => {
    const { patched, twice } = rekeyedCarriers(
      [CARRIER],
      () => AHEAD,
      new Set([CARRIER]),
      "domain-parents",
      "domain-parent-slug"
    )
    expect(twice).toEqual([])
    expect(patched.has(CARRIER)).toBe(false)
  })

  test("refuses a carrier stating the key nowhere that nothing supplied a body for", () => {
    const { patched, twice } = rekeyedCarriers(
      [CARRIER],
      () => AHEAD,
      new Set<string>(),
      "domain-parents",
      "domain-parent-slug"
    )
    expect(twice.length).toBe(1)
    expect(patched.size).toBe(0)
  })
})

describe("sitesIn", () => {

  test("takes the whole token and not a longer one containing it", () => {
    expect(sitesIn("domain-parents: x", "domain-parents").length).toBe(1)
    expect(sitesIn("domain-parent-slug: x", "domain-parents").length).toBe(0)
    expect(sitesIn("a-domain-parents: x", "domain-parents").length).toBe(0)
    expect(sitesIn('stringAt(fm, "domain-parents")', "domain-parents").length).toBe(1)
  })

  test("takes a token at either end of the body", () => {
    expect(sitesIn("domain-owner", "domain-owner").length).toBe(1)
    expect(sitesIn("the domain-owner", "domain-owner").length).toBe(1)
  })

  test("takes a key an escape sequence runs straight into", () => {
    expect(sitesIn("`\\ndomain-owner: ${owner}`", "domain-owner").length).toBe(1)
    expect(sitesIn('"a\\tdomain-parents: global"', "domain-parents").length).toBe(1)
    expect(sitesIn("`\\ndomain-owner-not-a-parent`", "domain-owner").length).toBe(0)
  })
})

describe("applied", () => {
  test("lands several patches without shifting each other", () => {
    expect(applied("abcdef", [{ start: 0, end: 1, text: "AAA" }, { start: 4, end: 6, text: "Z" }])).toBe("AAAbcdZ")
  })
})

describe("lineTextAt", () => {
  test("gives the whole line a position sits on", () => {
    expect(lineTextAt("one\n  two three\nfour", 8)).toBe("two three")
  })
})

describe("definitionDestination", () => {
  const TYPES = [{ slug: "page-property-definition" }] as unknown as readonly PageType[]
  const AT = "pages/page-property-definition/agent-hook-code.page-property-definition.md"

  test("the file a rename moves to carries the page type the definition's name carries", () => {
    expect(definitionDestination(AT, TYPES, "agent-hook", "kind")).toBe(
      "pages/page-property-definition/agent-hook-kind.page-property-definition.md"
    )
  })

  test("a rename whose file name does not change reads back as the file it already stands at", () => {
    expect(definitionDestination(AT, TYPES, "agent-hook", "code")).toBe(AT)
  })

  test("a definition whose name carries no page type names no file to move to", () => {
    expect(definitionDestination("pages/page-property-definition/agent-hook-code.md", TYPES, "agent-hook", "kind")).toBe(
      null
    )
  })
})

const DEFINITION = [
  "---",
  "page-type-slug: page-property-definition",
  "defined-on-slug: domain",
  "key: domain-owner",
  "type: relation-slug",
  "slug: domain-owner",
  "---",
  "",
  "# Definition",
  "",
  "- **Domain owner** — the parent a domain's ownership descends through.",
  "",
].join("\n")

describe("keyValuePatch", () => {
  test("rewrites the value of `key:` and nothing else spelled the same", () => {
    const patch = keyValuePatch(DEFINITION, "somewhere.md", "domain-owner-slug")
    if (typeof patch === "string") throw new Error(patch)
    const out = applied(DEFINITION, [patch])
    expect(out).toContain("key: domain-owner-slug")
    expect(out).toContain("slug: domain-owner\n")
    expect(out).toContain("- **Domain owner** —")
  })

  test("says so where no scalar `key:` stands", () => {
    expect(typeof keyValuePatch("---\ntype: text\n---\n", "somewhere.md", "x")).toBe("string")
  })
})

describe("freshlyDerived", () => {
  const roots = resolveRoots("instructions")
  const CARRIER = "pages/domain/thing.md"
  const STOOD = "---\nslug: thing\ndomain-parents: global\n---\n\n# Definition\n\n- **Thing** — a thing.\n"
  const RENAMED = STOOD.replace("domain-parents:", "domain-parent-slug:")

  function tree(): string {
    const root = mkdtempSync("/var/tmp/rename-property-")
    mkdirSync(`${root}/pages/domain`, { recursive: true })
    return root
  }

  const entry = (body: string, authored: boolean) => [{ relPath: CARRIER, body, at: 0, authored }]

  const run = (root: string, entries: ReturnType<typeof entry>) =>
    freshlyDerived(entries, root, new Set([CARRIER]), new Map(), roots, "domain-parents", "domain-parent-slug")

  test("derives again from the file as it stands, so a change landing under the call survives", () => {
    const root = tree()
    try {
      writeFileSync(`${root}/${CARRIER}`, STOOD.replace("a thing.", "what they wrote instead."))
      const { refreshed, rederived } = run(root, entry(RENAMED, false))
      expect(rederived).toBe(1)
      expect(refreshed[0]?.body).toContain("domain-parent-slug: global")
      expect(refreshed[0]?.body).toContain("what they wrote instead.")
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("leaves an authored body as composed, a stale one being the caller's to refuse", () => {
    const root = tree()
    try {
      writeFileSync(`${root}/${CARRIER}`, STOOD.replace("a thing.", "what they wrote instead."))
      const { refreshed, rederived } = run(root, entry(RENAMED, true))
      expect(rederived).toBe(0)
      expect(refreshed[0]?.body).toBe(RENAMED)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("drops a derived file that went while the call ran rather than writing it back", () => {
    const root = tree()
    try {
      const { refreshed, gone } = run(root, entry(RENAMED, false))
      expect(gone).toBe(1)
      expect(refreshed.length).toBe(0)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})

describe("termOf", () => {
  test("reads the bold term back so the call can name it as owed", () => {
    expect(termOf(DEFINITION)).toBe("Domain owner")
  })

  test("gives nothing where no definition bullet stands", () => {
    expect(termOf("---\nkey: a\n---\n")).toBe(null)
  })
})
