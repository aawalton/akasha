import { describe, expect, it } from "bun:test"
import { markedFrontmatter } from "../lib/oauth-page-mark.ts"

const PAGE = [
  "---",
  "page-type-slug: claude-account",
  'title: "Aawalton"',
  "alias-index: 1",
  "subscription-type: max",
  "scopes:",
  "  - user:inference",
  "  - user:profile",
  "---",
  "",
].join("\n")

function fm(text: string): readonly string[] {
  const lines = text.split("\n")
  return lines.slice(1, lines.indexOf("---", 1))
}

describe("markedFrontmatter — setting a mark", () => {
  it("adds a key the page did not carry, leaving the rest as it stood", () => {
    const next = markedFrontmatter(PAGE, { "terminal-at": "2026-08-17T09:00:00.000Z" })
    expect("text" in next).toBe(true)
    if (!("text" in next)) return
    expect(fm(next.text)).toEqual([
      "page-type-slug: claude-account",
      'title: "Aawalton"',
      "alias-index: 1",
      "subscription-type: max",
      "scopes:",
      "  - user:inference",
      "  - user:profile",
      "terminal-at: 2026-08-17T09:00:00.000Z",
    ])
  })

  it("replaces a key the page already carried, in the place it already stood", () => {
    const next = markedFrontmatter(PAGE, { "subscription-type": "pro" })
    expect("text" in next).toBe(true)
    if (!("text" in next)) return
    expect(fm(next.text)[3]).toBe("subscription-type: pro")
    expect(fm(next.text)).toHaveLength(7)
  })

  it("keeps the body below the frontmatter untouched", () => {
    const withBody = `${PAGE}# Definition\n\n- **Aawalton** — a login.\n`
    const next = markedFrontmatter(withBody, { "reauth-at": "2026-08-18T00:00:00.000Z" })
    expect("text" in next).toBe(true)
    if (!("text" in next)) return
    expect(next.text.endsWith("# Definition\n\n- **Aawalton** — a login.\n")).toBe(true)
  })
})

describe("markedFrontmatter — clearing a mark", () => {
  it("takes the key out where the mark is nothing", () => {
    const next = markedFrontmatter(PAGE, { "alias-index": null })
    expect("text" in next).toBe(true)
    if (!("text" in next)) return
    expect(fm(next.text)).not.toContain("alias-index: 1")
    expect(fm(next.text)).toHaveLength(6)
  })

  it("answers the page unchanged where the key was not there to clear", () => {
    const next = markedFrontmatter(PAGE, { "terminal-at": null })
    expect(next).toEqual({ text: PAGE })
  })

  it("answers the page unchanged where the mark is what already stood", () => {
    const next = markedFrontmatter(PAGE, { "subscription-type": "max" })
    expect(next).toEqual({ text: PAGE })
  })
})

describe("markedFrontmatter — what it refuses", () => {
  it("refuses a page with no frontmatter rather than writing one", () => {
    expect(markedFrontmatter("# Definition\n", { "terminal-at": "x" })).toEqual({
      why: "the page opens with no frontmatter block",
    })
  })

  it("refuses a frontmatter block that never closes", () => {
    const out = markedFrontmatter("---\ntitle: x\n", { "terminal-at": "y" })
    expect(out).toEqual({ why: "the page's frontmatter block is never closed" })
  })

  it("refuses to replace a key standing over several lines", () => {
    const out = markedFrontmatter(PAGE, { scopes: "user:inference" })
    expect("why" in out).toBe(true)
    if (!("why" in out)) return
    expect(out.why).toMatch(/more than one line/)
  })

  it("refuses a value carrying a newline rather than writing two keys", () => {
    const out = markedFrontmatter(PAGE, { "terminal-code": "invalid_grant\nrate-limit-tier: none" })
    expect("why" in out).toBe(true)
    if (!("why" in out)) return
    expect(out.why).toMatch(/newline/)
  })

  it("refuses an empty value rather than reading it as a removal", () => {
    const out = markedFrontmatter(PAGE, { "terminal-code": "  " })
    expect("why" in out).toBe(true)
    if (!("why" in out)) return
    expect(out.why).toMatch(/empty/)
  })

  it("refuses a key that is not the shape a page states", () => {
    const out = markedFrontmatter(PAGE, { "Terminal At": "x" })
    expect("why" in out).toBe(true)
    if (!("why" in out)) return
    expect(out.why).toMatch(/not a key this writes/)
  })
})
