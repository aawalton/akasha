import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { fileIn } from "../../page/repo-claim.ts"
import { requiredReadingWhole } from "../required-reading.ts"
import { type Fixture, fixture } from "./fixture.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

const WIDGET = "ios-widget/ring/SurplusRing.swift"
const TOOL = "tools/lib/usage-widget.ts"

function plantFileKeyPages(): void {
  at.document(
    "pages/page-property-definition/readout-display-widget-path.page-property-definition.md",
    "slug: readout-display-widget-path\ndefined-on-slug: readout-display\nkey: widget-path\ntype: file",
    8
  )
  at.document(
    "pages/page-property-definition/readout-source-tool-path.md",
    "slug: readout-source-tool-path\ndefined-on-slug: readout-source\nkey: tool-path\ntype: file",
    8
  )
  at.document(
    "pages/readout-display/readout-display-surplus.readout-display.md",
    `slug: readout-display-surplus\nwidget-path: code:${WIDGET}\nrequired-reading-slugs:\n  - readout-system`,
    12
  )
  at.document(
    "pages/readout-source/readout-source-claude-usage.readout-source.md",
    `slug: readout-source-claude-usage\ntool-path: ${TOOL}`,
    12
  )
  at.document("readouts/readout-system.domain.md", "slug: readout-system\ndomain-parent-slug: global", 8)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 10)
}

describe("what a value names when it claims a repository", () => {
  test("a claimed value splits into the repository and the path", () => {
    expect(fileIn("code:packages/one.swift")).toEqual({ repo: "code", path: "packages/one.swift" })
  })

  test("a value claiming nothing names the instructions repository", () => {
    expect(fileIn("tools/one.ts")).toEqual({ repo: "instructions", path: "tools/one.ts" })
  })

  test("only the first colon divides, so the rest of the path keeps its own", () => {
    expect(fileIn("code:a/b:c.ts")).toEqual({ repo: "code", path: "a/b:c.ts" })
  })
})

describe("which repository a named file stands in", () => {
  test("a value naming a repository reaches that file in it", () => {
    plantFileKeyPages()
    expect(requiredReadingWhole(WIDGET, at.root, "code")).toContain(
      "pages/readout-display/readout-display-surplus.readout-display.md"
    )
  })

  test("what the page requires comes with it", () => {
    plantFileKeyPages()
    expect(requiredReadingWhole(WIDGET, at.root, "code")).toContain("readouts/readout-system.domain.md")
  })

  test("the same path in another repository is not reached", () => {
    plantFileKeyPages()
    expect(requiredReadingWhole(WIDGET, at.root)).not.toContain(
      "pages/readout-display/readout-display-surplus.readout-display.md"
    )
  })

  test("a value naming no repository reaches the instructions repository", () => {
    plantFileKeyPages()
    expect(requiredReadingWhole(TOOL, at.root)).toContain(
      "pages/readout-source/readout-source-claude-usage.readout-source.md"
    )
  })

  test("a value naming no repository reaches no other repository", () => {
    plantFileKeyPages()
    expect(requiredReadingWhole(TOOL, at.root, "code")).not.toContain(
      "pages/readout-source/readout-source-claude-usage.readout-source.md"
    )
  })
})
