import { describe, expect, test } from "bun:test"
import { composeChapterPage, humanizeSlug, statedIdIn } from "../lib/story-publish.ts"

const CHAPTER = {
  pageTypeSlug: "story-chapter-played",
  storySlug: "the-tower",
  chapterNumber: 2,
  chapterTitle: "The Cistern",
  text: "Prose.",
  wordCount: 1,
}

describe("a chapter page carries the id the standing page states", () => {
  test("the id is written back where one was read", () => {
    const composed = composeChapterPage({
      ...CHAPTER,
      standingId: "01a02222-0000-7000-8000-0000000abcde",
    })
    expect(composed.content).toContain("id: 01a02222-0000-7000-8000-0000000abcde\n")
  })

  test("no id line is written where the page states none", () => {
    expect(composeChapterPage(CHAPTER).content).not.toContain("\nid:")
  })

  test("a page composed from a standing one recomposes byte-identically", () => {
    const first = composeChapterPage({
      ...CHAPTER,
      standingId: "01a02222-0000-7000-8000-0000000abcde",
    })
    const again = composeChapterPage({ ...CHAPTER, standingId: statedIdIn(first.content) })
    expect(again.content).toBe(first.content)
  })
})

describe("statedIdIn", () => {
  test("reads the id out of frontmatter", () => {
    expect(statedIdIn("---\npage-type-slug: x\nid: 019e-abc\ntitle: t\n---\n\nbody\n")).toBe(
      "019e-abc"
    )
  })

  test("is null where the frontmatter states none", () => {
    expect(statedIdIn("---\npage-type-slug: x\ntitle: t\n---\n\nbody\n")).toBeNull()
  })

  test("is null where there is no frontmatter at all, and on no text", () => {
    expect(statedIdIn("just a body\n")).toBeNull()
    expect(statedIdIn(null)).toBeNull()
  })

  test("does not mistake an id-suffixed key for the id", () => {
    expect(statedIdIn("---\nroyalRoadId: 3701682\ntitle: t\n---\n\nbody\n")).toBeNull()
  })
})

describe("humanizeSlug", () => {
  test("title-cases a hyphenated slug", () => {
    expect(humanizeSlug("coffee-shop-date")).toBe("Coffee Shop Date")
  })
})
