import { describe, expect, test } from "bun:test"
import { hold, shapeOf } from "../../page/shape/shape.ts"
import type { Verdict } from "../../page/document/types.ts"

const AT = "pages/page-type/refusal-fixture.page-type.md"

const typeText = (keys: readonly string[]): string =>
  [
    "---",
    ...keys,
    "blocks:",
    "  refusal:",
    "    repeat: 1-4",
    "slots:",
    "  refusal:",
    "    max: lg",
    "---",
    "",
    "# Refusal",
    "",
    "{refusal}",
    "",
  ].join("\n")

const BOUND = typeText(["holes: true"])
const UNBOUND = typeText([])

const page = (frontmatter: readonly string[], body: string): string =>
  ["---", ...frontmatter, "---", "", "# Refusal", "", body, ""].join("\n")

function held(type: string, frontmatter: readonly string[], body: string): Verdict {
  const shape = shapeOf("refusal-fixture", AT, type)
  expect(shape.why).toBeNull()
  return hold(shape, "refusals/one.md", page(frontmatter, body))
}

const said = (verdict: Verdict): string =>
  verdict.ok ? "" : verdict.refusals.map((one) => `${one.part} — expected ${one.expected}, measured ${one.measured}`).join("\n")

describe("a page type binding its pages' body holes to their `holes:` key", () => {
  test("a body marking exactly what the key lists holds", () => {
    expect(held(BOUND, ["holes:", "  - path"], "Name the {path} it wanted.").ok).toBe(true)
  })

  test("a body marking a name the key does not carry is refused, naming the hole", () => {
    const verdict = held(BOUND, ["holes:", "  - path"], "Name the {remedy} it wanted.")
    expect(verdict.ok).toBe(false)
    expect(said(verdict)).toContain("the hole `{remedy}`")
    expect(said(verdict)).toContain("a name it does not carry")
  })

  test("a name the key lists and the body never marks is refused, naming that name", () => {
    const verdict = held(BOUND, ["holes:", "  - path", "  - unused"], "Name the {path} it wanted.")
    expect(verdict.ok).toBe(false)
    expect(said(verdict)).toContain("the hole `{unused}`")
    expect(said(verdict)).toContain("marked in the body")
  })

  test("a page stating no `holes:` key at all is held to its shape and to nothing about holes", () => {
    expect(held(BOUND, [], "Name the {remedy} it wanted.").ok).toBe(true)
  })

  test("a page type stating no binding leaves both halves of it unjudged", () => {
    expect(held(UNBOUND, ["holes:", "  - path"], "Name the {remedy} it wanted.").ok).toBe(true)
    expect(held(UNBOUND, ["holes:", "  - path", "  - unused"], "Name the {path} it wanted.").ok).toBe(true)
  })

  test("the binding carries down the chain from the page type that states it", () => {
    const above = [{ relPath: AT, text: BOUND }]
    const heir = shapeOf("heir", "pages/page-type/heir.page-type.md", "---\n---\n")
    expect(heir.bindsHoles).toBe(false)
    const shape = shapeOf("heir", "pages/page-type/heir.page-type.md", "---\n---\n", above)
    expect(shape.why).toBeNull()
    expect(shape.bindsHoles).toBe(true)
    expect(hold(shape, "refusals/one.md", page(["holes:", "  - path"], "Name the {remedy} it wanted.")).ok).toBe(false)
  })

  test("a `holes:` stating anything but `true` compiles to no shape, and the refusal says what it means", () => {
    const shape = shapeOf("refusal-fixture", AT, typeText(["holes: yes"]))
    expect(shape.compiled).toBeNull()
    expect(shape.why).toContain("`holes: yes` is not `true`")
    expect(shape.why).toContain("every `{name}` in a page's body is one its `holes:` key lists")
  })
})
