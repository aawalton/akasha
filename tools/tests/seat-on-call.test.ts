
import { describe, expect, test } from "bun:test"
import { roleGrantsOnCall, roleOnCallStated } from "../lib/seat-on-call.ts"
import { scan } from "../lib/seat-resolve.ts"
import { fixture, type Fixture } from "./fixture.ts"

function plant(at: Fixture): void {
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
  at.document("pages/page-type/role.page-type.md", "slug: role\ndomain-parent-slug: global", 20)
  at.document("pages/role/recorder.role.md", "slug: recorder\ndomain-parent-slug: role\non-call: true", 20)
  at.document("pages/role/definer.role.md", "slug: definer\ndomain-parent-slug: role", 20)
}

function stands(slug: string | null, at: Fixture): boolean {
  return roleOnCallStated(at.root, slug)
}

function grants(slug: string | null, at: Fixture): boolean {
  return roleGrantsOnCall(slug, at.root, scan(at.root))
}

describe("a role claiming a standing on-call assignment", () => {
  test("grants it where the role declares the key", () => {
    const at = fixture()
    try {
      plant(at)
      expect(grants("recorder", at)).toBe(true)
    } finally {
      at.dispose()
    }
  })

  test("grants nothing where the role declares no key", () => {
    const at = fixture()
    try {
      plant(at)
      expect(grants("definer", at)).toBe(false)
    } finally {
      at.dispose()
    }
  })

  test("grants nothing for no role and for a slug the tree does not carry", () => {
    const at = fixture()
    try {
      plant(at)
      expect(grants(null, at)).toBe(false)
      expect(grants("gruyere", at)).toBe(false)
    } finally {
      at.dispose()
    }
  })

  test("the reading a turn state takes agrees with the grant, read off the role's own page", () => {
    const at = fixture()
    try {
      plant(at)
      expect(stands("recorder", at)).toBe(true)
      expect(stands("definer", at)).toBe(false)
      expect(stands(null, at)).toBe(false)
      expect(stands("gruyere", at)).toBe(false)
    } finally {
      at.dispose()
    }
  })

  test("grants nothing where two role documents claim the slug, whichever one carries the key", () => {
    const at = fixture()
    try {
      plant(at)
      at.document("pages/role/nested/recorder.role.md", "slug: recorder\ndomain-parent-slug: role\non-call: true", 20)
      expect(grants("recorder", at)).toBe(false)
    } finally {
      at.dispose()
    }
  })
})
