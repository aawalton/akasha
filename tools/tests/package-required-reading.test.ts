import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { packageSlugOf } from "../lib/package-manifest.ts"
import { requiredReadingWhole } from "../required-reading.ts"
import { type Fixture, fixture } from "./fixture.ts"

const CORE = "packages/shared/graph/core/src/index.ts"
const DEEP = "packages/shared/graph/core/src/reach/one/two.ts"
const CORE_PAGE = "pages/package/shared-graph-core.package.md"
const TOOLS_PAGE = "pages/package/shared-graph-core-tools.package.md"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

function workspace(dir: string, name: string | null): void {
  at.put(`${dir}/package.json`, JSON.stringify(name === null ? { version: "0.1.0" } : { name }))
}

function packagePage(slug: string, repo: string, requires: string | null): void {
  const requiring = requires === null ? "" : `\nrequired-reading-slugs:\n  - ${requires}`
  at.document(
    `pages/package/${slug}.package.md`,
    `page-type-slug: package\nslug: ${slug}\nrepo: ${repo}\ndomain-parent-slug: graph-system${requiring}`,
    12
  )
}

function plantPackagePages(): void {
  workspace("packages/shared/graph/core", "@shared/graph-core")
  packagePage("shared-graph-core", "code", "graph-system")
  at.document("pages/domain/graph-system.domain.md", "slug: graph-system\ndomain-parent-slug: global", 10)
}

describe("what a package name slugs to", () => {
  test("a scope becomes part of the name rather than a prefix on it", () => {
    expect(packageSlugOf("@shared/graph-core")).toBe("shared-graph-core")
  })

  test("an unscoped name slugs to itself", () => {
    expect(packageSlugOf("chess")).toBe("chess")
  })
})

describe("which package page a file is read off", () => {
  test("a file reaches the page of the workspace declaring it", () => {
    plantPackagePages()
    expect(requiredReadingWhole(CORE, at.root, "code")).toContain(CORE_PAGE)
  })

  test("what the package page requires comes with it", () => {
    plantPackagePages()
    expect(requiredReadingWhole(CORE, at.root, "code")).toContain("pages/domain/graph-system.domain.md")
  })

  test("a file any depth below the workspace root reaches the same page", () => {
    plantPackagePages()
    expect(requiredReadingWhole(DEEP, at.root, "code")).toContain(CORE_PAGE)
  })

  test("the nearest workspace above a file is the one it is read off", () => {
    plantPackagePages()
    workspace("packages/shared/graph/core/src", "@shared/graph-core-tools")
    packagePage("shared-graph-core-tools", "code", null)
    expect(requiredReadingWhole(CORE, at.root, "code")).toContain(TOOLS_PAGE)
  })

  test("a workspace nearer the file shuts out the one above it", () => {
    plantPackagePages()
    workspace("packages/shared/graph/core/src", "@shared/graph-core-tools")
    packagePage("shared-graph-core-tools", "code", null)
    expect(requiredReadingWhole(CORE, at.root, "code")).not.toContain(CORE_PAGE)
  })

  test("a workspace declaring no name reaches no page at all", () => {
    plantPackagePages()
    workspace("packages/shared/graph/core/src", null)
    expect(requiredReadingWhole(CORE, at.root, "code")).not.toContain(CORE_PAGE)
  })

  test("a file with no workspace above it reaches no package page", () => {
    plantPackagePages()
    expect(requiredReadingWhole("packages/shared/graph/README.md", at.root, "code")).not.toContain(CORE_PAGE)
  })

  test("a file with no workspace above it is still answered", () => {
    plantPackagePages()
    at.document("pages/domain/code-repo.md", "slug: code-repo\ndomain-parent-slug: global", 10)
    expect(requiredReadingWhole("packages/shared/graph/README.md", at.root, "code")).toContain(
      "pages/domain/code-repo.md"
    )
  })

  test("a page standing for another repository is not reached", () => {
    workspace("packages/shared/graph/core", "@shared/graph-core")
    packagePage("shared-graph-core", "instructions", null)
    expect(requiredReadingWhole(CORE, at.root, "code")).not.toContain(CORE_PAGE)
  })

  test("a page standing for the repository being resolved is reached in it", () => {
    at.put("packages/shared/graph/core/package.json", JSON.stringify({ name: "@shared/graph-core" }))
    packagePage("shared-graph-core", "instructions", null)
    expect(requiredReadingWhole(CORE, at.root, "instructions")).toContain(CORE_PAGE)
  })
})
