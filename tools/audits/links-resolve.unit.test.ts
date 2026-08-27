import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { afterAll, describe, expect, test } from "bun:test"
import type { RepoView } from "../lib/check.ts"
import { refusalDirIn } from "../lib/refusal.ts"
import { REPOS } from "../../repo/roots/roots"
import { linksResolve } from "./links-resolve.ts"

const base = mkdtempSync("/var/tmp/links-resolve-")
afterAll(() => rmSync(base, { recursive: true, force: true }))

const places: Record<string, string> = {}
for (const name of REPOS) places[name] = join(base, name)

const instructions = places.instructions as string
const memory = places.memory as string

const live = join(import.meta.dir, "..", "..")

function put(root: string, relPath: string, body: string): void {
  const path = join(root, relPath)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, body)
}

const refusals = refusalDirIn(instructions)
for (const slug of ["link-target-absent", "link-quote-absent"])
  put(
    instructions,
    `${refusals}/${slug}.refusal.md`,
    readFileSync(join(live, refusals, `${slug}.refusal.md`), "utf8")
  )

for (const slug of ["initiative", "car-make"])
  put(
    instructions,
    `pages/page-type/${slug}.page-type.md`,
    readFileSync(join(live, "pages", "page-type", `${slug}.page-type.md`), "utf8")
  )

function viewOf(name: "memory" | "instructions", documents: readonly string[]): RepoView {
  return {
    roots: { ...places, target: name },
    name,
    documents,
    read: (at: string) => readFileSync(join(places[name] as string, at), "utf8"),
    exists: existsSync,
  }
}

put(memory, "pages/domain/stands.md", "# Intent\n\nA line that stands.\n")
put(memory, "pages/initiative/quote-holds.initiative.md", '- ["A line that stands."](../domain/stands.md)\n')
put(memory, "pages/initiative/quote-gone.initiative.md", '- ["A line that went."](../domain/stands.md)\n')
put(memory, "pages/initiative/target-gone.initiative.md", '- ["A line that stands."](../domain/absent.md)\n')
put(memory, "pages/car-make/target-gone.md", "- [a make that went](./absent.md)\n")
put(
  memory,
  "pages/car-make/points-at-initiative.car-make.md",
  "- [an initiative that went](../initiative/gone.initiative.md)\n"
)
put(instructions, "pages/initiative/target-gone.initiative.md", '- ["A line that stands."](../domain/absent.md)\n')

describe("a page type whose pages are mortal", () => {
  test("a quote that no longer matches is refused, being wrong from the moment it was written", () => {
    expect(linksResolve(viewOf("memory", ["pages/initiative/quote-gone.initiative.md"])).verdict).toBe("fail")
  })

  test("a target that has gone is passed, a mortal page being deleted when its purpose ends", () => {
    expect(linksResolve(viewOf("memory", ["pages/initiative/target-gone.initiative.md"])).verdict).toBe("pass")
  })

  test("a quote standing word for word passes, as it does anywhere", () => {
    expect(linksResolve(viewOf("memory", ["pages/initiative/quote-holds.initiative.md"])).verdict).toBe("pass")
  })
})

describe("a page type whose pages are not mortal", () => {
  test("a target that has gone is refused, in the repository a mortal page is passed in", () => {
    expect(linksResolve(viewOf("memory", ["pages/car-make/target-gone.md"])).verdict).toBe("fail")
  })

  test("a link to a mortal page that has gone is passed, either end of a link answering", () => {
    expect(linksResolve(viewOf("memory", ["pages/car-make/points-at-initiative.car-make.md"])).verdict).toBe("pass")
  })

  test("the same path under a repository its page type does not name is judged whole", () => {
    expect(linksResolve(viewOf("instructions", ["pages/initiative/target-gone.initiative.md"])).verdict).toBe(
      "fail"
    )
  })
})

describe("what the sweep reports", () => {
  test("the fixture stands for every repository declared, so one added later cannot go missing", () => {
    expect(Object.keys(places).sort()).toEqual([...REPOS].sort())
  })

  test("it counts the documents judged each way, so a mixed sweep never reads as a whole one", () => {
    const outcome = linksResolve(
      viewOf("memory", ["pages/initiative/quote-holds.initiative.md", "pages/car-make/points-at-initiative.car-make.md"])
    )
    expect(outcome.detail).toContain("1 judged whole, 1 mortal")
  })
})
