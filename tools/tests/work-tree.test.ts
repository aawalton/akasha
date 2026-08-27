
import { describe, expect, test } from "bun:test"
import { workTree, walk } from "../lib/work-tree.ts"
import { at, initiatives, initiative } from "./work-tree-fixture.ts"

describe("the initiatives are the roots", () => {
  const built = workTree(
    initiatives({
      initiatives: [
        initiative("vera-graph-stands-outside-the-code"),
        initiative("aine-trusted-agents"),
        initiative("amy-stoplights-drive-behaviour"),
      ],
    }),
  )

  test("they stand alphabetical by slug, nothing above them ranking them", () => {
    expect(built.map((one) => one.key)).toEqual([
      "aine-trusted-agents",
      "amy-stoplights-drive-behaviour",
      "vera-graph-stands-outside-the-code",
    ])
  })

  test("an initiative nothing stands under is still a node of its own", () => {
    expect(at(built, "aine-trusted-agents")?.children).toHaveLength(0)
  })

  test("an initiative opens its own document", () => {
    expect(at(built, "aine-trusted-agents")?.relPath).toBe("initiatives/p/aine-trusted-agents.md")
  })

  test("the row carries the persona answering for it", () => {
    expect(at(built, "aine-trusted-agents")?.detail).toBe("p")
  })
})

describe("an initiative standing under another", () => {
  const built = workTree(
    initiatives({
      initiatives: [
        initiative("meta"),
        initiative("under", { parent: "meta" }),
        initiative("deeper", { parent: "under" }),
      ],
    }),
  )

  test("the child is drawn under its parent rather than standing as a root of its own", () => {
    expect(at(built, "meta", "under")).toBeDefined()
    expect(at(built, "under")).toBeUndefined()
  })

  test("nesting goes as deep as the initiatives declare it", () => {
    expect(at(built, "meta", "under", "deeper")).toBeDefined()
  })

  test("only the initiatives standing under none are roots", () => {
    expect(built.map((one) => one.key)).toEqual(["meta"])
  })

  test("a parent naming an initiative with no document leaves the child a root that says why", () => {
    const orphan = workTree(initiatives({ initiatives: [initiative("lost", { parent: "gone" })] }))
    expect(at(orphan, "lost")?.note).toBe(
      "drawn as a root: it names parent gone, which has no document",
    )
  })

  test("a parent chain that closes on itself is cut rather than dropped", () => {
    const cyclic = workTree(
      initiatives({ initiatives: [initiative("x", { parent: "y" }), initiative("y", { parent: "x" })] }),
    )
    expect(walk(cyclic).map((one) => one.key).sort()).toEqual(["x", "y"])
    expect(at(cyclic, "x")?.note).toBe(
      "drawn as a root: its parent chain through y closes on itself",
    )
  })

  test("no initiative is invented for a parent that resolves to nothing", () => {
    const orphan = workTree(initiatives({ initiatives: [initiative("lost", { parent: "gone" })] }))
    expect(walk(orphan).some((one) => one.key === "gone")).toBe(false)
  })
})

describe("the color a seat puts on a row", () => {
  const drawn = { byInitiative: new Map([["held", "blue"]]) }
  const built = workTree(initiatives({ initiatives: [initiative("held"), initiative("quiet")] }), drawn)

  test("an initiative a seat states is drawn in that seat's color", () => {
    expect(at(built, "held")?.color).toBe("blue")
  })

  test("a row no seat states carries no color, rather than inheriting one from beside it", () => {
    expect(at(built, "quiet")?.color).toBeNull()
  })

  test("a color keys on the slug an initiative declares, which is what a seat states", () => {
    const renamed = workTree(
      initiatives({ initiatives: [initiative("held", { relPath: "initiatives/p/other-name.md" })] }),
      drawn,
    )
    expect(at(renamed, "held")?.color).toBe("blue")
  })

  test("with nothing stated, every row carries no color", () => {
    const bare = workTree(initiatives({ initiatives: [initiative("quiet")] }))
    expect(walk(bare).every((one) => one.color === null)).toBe(true)
  })
})
