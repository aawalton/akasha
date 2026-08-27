import { describe, expect, test } from "bun:test"
import { hold, type Shape } from "../../page/shape/shape.ts"
import { shapeFor } from "../../page/shape/chain.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { pageTypeAt } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { resolveRoots } from "../../repo/roots/roots"

const roots = resolveRoots()
const tree = diskFileTree(roots)

function shapeAt(at: string): Shape {
  const type = pageTypeAt(at, textAt(roots.instructions, at)!)
  if (type === null) throw new Error(`${at} declares no page type this reads`)
  return shapeFor(type, tree)
}

const MEMBERS = "- **Alpha** — the member a list names first.\n- **Beta** — the member a list names second."

function listing(slug: string, members: string = MEMBERS): string {
  const front = [
    "---",
    "page-type-slug: list",
    `slug: ${slug}`,
    "domain-parent-slug: domain",
    "---",
  ]
  const body = ["", "# Definition", "", `- **${slug}** — the set under test.`, "", "# List", "", members]
  return `${[...front, ...body].join("\n")}\n`
}

function domain(manifest: string | null): string {
  const front = [
    "---",
    "page-type-slug: domain",
    "slug: subject",
    "domain-parent-slug: agent-harness",
  ]
  if (manifest !== null) front.push(manifest)
  front.push("---")
  return `${[...front, "", "# Definition", "", "- **Subject** — the domain under test."].join("\n")}\n`
}

const DOMAIN_AT = "pages/domain/subject.md"

const asList = (body: string): boolean => hold(shapeAt("pages/page-type/list.page-type.md"), "pages/list/thing.md", body).ok
const asDomain = (body: string): boolean => hold(shapeAt("pages/page-type/domain.page-type.md"), DOMAIN_AT, body).ok

describe("what a list document must hold", () => {
  test("a definition and a bulleted set of handles and glosses holds", () => {
    expect(asList(listing("thing"))).toBe(true)
  })

  test("refuses one carrying no `# List`, a list document holding no list saying nothing", () => {
    const body = listing("thing").replace(/\n# List\n[\s\S]*$/, "\n")
    expect(asList(body)).toBe(false)
  })

  test("refuses a numbered set, a numbered list claiming an order a set does not carry", () => {
    expect(asList(listing("thing", "1. **Alpha** — the first member."))).toBe(false)
  })

  test("refuses a member with no gloss, a handle alone naming without saying", () => {
    expect(asList(listing("thing", "- **Alpha**"))).toBe(false)
  })

  test("a set of glosses with no handles holds, that being the other shape a list may take", () => {
    expect(asList(listing("thing", "- a line, and no handle in front of it.\n- a second line."))).toBe(true)
  })

  test("a gloss with no handle may quote the path it names, only the bold being barred", () => {
    expect(asList(listing("thing", "- `tools/page/document/check.ts`, and *the* line naming it."))).toBe(true)
  })

  test("refuses a list written half in each shape, one list taking one shape throughout", () => {
    expect(asList(listing("thing", "- **Alpha** — the first member.\n- a line with no handle."))).toBe(false)
  })

  test("refuses a handleless line past 200 characters", () => {
    expect(asList(listing("thing", `- ${"a".repeat(200)}`))).toBe(true)
    expect(asList(listing("thing", `- ${"a".repeat(201)}`))).toBe(false)
  })

  test("refuses a 1001st member, the cap being a backstop under the file's own byte ceiling", () => {
    const members = (n: number) =>
      Array.from({ length: n }, (_, at) => `- **Member ${at}** — the member at ${at}.`).join("\n")
    expect(asList(listing("thing", members(1000)))).toBe(true)
    expect(asList(listing("thing", members(1001)))).toBe(false)
  })

  test("admits no `# List` on an ordinary domain, the section being the kind's alone", () => {
    expect(asDomain(`${domain(null).trimEnd()}\n\n# List\n\n${MEMBERS}\n`)).toBe(false)
  })
})
