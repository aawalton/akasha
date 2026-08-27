import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { requiredReadingWhole } from "../required-reading.ts"
import { type Fixture, fixture } from "./fixture.ts"

let at: Fixture

const SUBJECT = "pages/domain/child.md"

beforeEach(() => {
  at = fixture()
  at.document(
    "pages/page-type/initiative.page-type.md",
    "page-type-slug: page-type\nslug: initiative\nfiles: memory:pages/initiative/**/*.md"
  )
  at.document("pages/domain/global.domain.md", "slug: global\nrequired-reading-slugs:\n  - initiative/the-plan")
  at.document(SUBJECT, "slug: child\ndomain-parent-slug: domain/global")
})

afterEach(() => {
  at.dispose()
})

function requiredFor(relPath: string): readonly string[] {
  return requiredReadingWhole(relPath, at.root)
}

describe("a required reading slug naming a page in another repository", () => {
  test("comes back as the absolute path of the page it names", () => {
    at.memoryDocument("pages/initiative/the-plan.md", "page-type-slug: initiative\nslug: the-plan")
    expect(requiredFor(SUBJECT)).toContain(`${at.memory}/pages/initiative/the-plan.md`)
  })

  test("carries what that page itself names as required reading", () => {
    at.document("pages/domain/wanted.md", "slug: wanted")
    at.memoryDocument(
      "pages/initiative/the-plan.md",
      "page-type-slug: initiative\nslug: the-plan\nrequired-reading-slugs:\n  - wanted"
    )
    expect(requiredFor(SUBJECT)).toContain("pages/domain/wanted.md")
  })

  test("is left out where no page is written at that address", () => {
    expect(requiredFor(SUBJECT).some((one) => one.includes("the-plan"))).toBe(false)
  })
})

describe("what the change leaves alone", () => {
  test("a slug declared in the same repo is still a relative path", () => {
    at.document("pages/domain/nearby.md", "slug: nearby")
    at.document("pages/domain/other.md", "slug: other\nrequired-reading-slugs:\n  - nearby")
    expect(requiredReadingWhole("pages/domain/other.md", at.root)).toContain("pages/domain/nearby.md")
  })
})
