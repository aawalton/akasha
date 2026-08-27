import { describe, expect, test } from "bun:test"
import {
  buildDirIndex,
  type CatalogEntry,
  distinctUids,
  findCatalogEntryByName,
  type InstalledAddon,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
  versionsMatch,
} from "./plan"

const catalog: readonly CatalogEntry[] = [
  { uid: "7", name: "LibAddonMenu-2.0", version: "2.0 r43", dirs: ["LibAddonMenu-2.0"] },
  {
    uid: "13",
    name: "Ravalox Quest Tracker",
    version: "3.8.3.1",
    dirs: ["Ravalox'QuestTracker", "RavaloxsQuestTracker"],
  },
  { uid: "99", name: "AdvancedFilters", version: "1.6.5.3", dirs: ["AdvancedFilters"] },
  { uid: "1245", name: "Tamriel Trade Centre", version: "5.31", dirs: ["TamrielTradeCentre"] },
]

const ROSTER: ReadonlySet<string> = new Set(["TemperInventory", "LibAddonMenu-2.0"])
const NO_ROSTER: ReadonlySet<string> = new Set()

function installed(
  entries: ReadonlyArray<readonly [string, string | undefined]>
): readonly InstalledAddon[] {
  return entries.map(([dir, version]) => ({ dir, version }))
}

describe("versionsMatch", () => {
  test("equal after whitespace normalization", () => {
    expect(versionsMatch("2.0  r43", "2.0 r43")).toBe(true)
    expect(versionsMatch(" 1.0 ", "1.0")).toBe(true)
  })
  test("missing installed version never matches", () => {
    expect(versionsMatch(undefined, "1.0")).toBe(false)
  })
  test("different versions do not match", () => {
    expect(versionsMatch("2.0 r26", "2.0 r43")).toBe(false)
  })
})

describe("buildDirIndex", () => {
  test("indexes every UIDir; first entry wins on collision", () => {
    const dup: readonly CatalogEntry[] = [
      { uid: "1", name: "A", version: "1", dirs: ["Shared"] },
      { uid: "2", name: "B", version: "2", dirs: ["Shared"] },
    ]
    const index = buildDirIndex(dup)
    expect(index.get("Shared")?.uid).toBe("1")
  })
})

describe("planUpdates", () => {
  test("a Lib* folder on the deploy roster classifies deploy-owned, not outdated", () => {
    const plan = planUpdates(
      installed([["LibAddonMenu-2.0", "2.0 r26"]]),
      catalog,
      new Set(["LibAddonMenu-2.0"])
    )
    expect(plan.addons[0]?.status).toBe("deploy-owned")
    expect(plan.addons[0]?.uid).toBeUndefined()
    expect(plan.addons[0]?.latestVersion).toBeUndefined()
  })

  test("a Temper-prefixed folder absent from the roster is NOT skipped", () => {
    const plan = planUpdates(installed([["TemperFoo", "1.0.0"]]), catalog, NO_ROSTER)
    expect(plan.addons[0]?.status).toBe("unmatched")
  })

  test("classifies deploy-owned, unmatched, outdated, up-to-date", () => {
    const plan = planUpdates(
      installed([
        ["TemperInventory", "1.0.0"],
        ["LibAddonMenu-2.0", "2.0 r26"],
        ["LibMediaProvider-1.0", "5"],
        ["TamrielTradeCentre", "5.30"],
        ["AdvancedFilters", "1.6.5.3"],
      ]),
      catalog,
      ROSTER
    )
    const byDir = (dir: string) => plan.addons.find((a) => a.dir === dir)
    expect(byDir("TemperInventory")?.status).toBe("deploy-owned")
    expect(byDir("LibAddonMenu-2.0")?.status).toBe("deploy-owned")
    expect(byDir("LibMediaProvider-1.0")?.status).toBe("unmatched")
    expect(byDir("TamrielTradeCentre")?.status).toBe("outdated")
    expect(byDir("TamrielTradeCentre")?.uid).toBe("1245")
    expect(byDir("AdvancedFilters")?.status).toBe("up-to-date")
  })

  test("a foreign folder with a catalog match still classifies outdated / up-to-date", () => {
    const plan = planUpdates(
      installed([
        ["TamrielTradeCentre", "5.30"],
        ["AdvancedFilters", "1.6.5.3"],
      ]),
      catalog,
      ROSTER
    )
    const byDir = (dir: string) => plan.addons.find((a) => a.dir === dir)
    expect(byDir("TamrielTradeCentre")?.status).toBe("outdated")
    expect(byDir("AdvancedFilters")?.status).toBe("up-to-date")
  })

  test("a foreign folder with no catalog match still classifies unmatched", () => {
    const plan = planUpdates(installed([["LibMediaProvider-1.0", "5"]]), catalog, ROSTER)
    expect(plan.addons[0]?.status).toBe("unmatched")
    expect(plan.addons[0]?.uid).toBeUndefined()
  })

  test("missing manifest version is treated as outdated", () => {
    const plan = planUpdates(installed([["AdvancedFilters", undefined]]), catalog, ROSTER)
    expect(plan.addons[0]?.status).toBe("outdated")
  })
})

describe("selectTargets", () => {
  const plan = planUpdates(
    installed([
      ["TemperInventory", "1.0.0"],
      ["LibAddonMenu-2.0", "2.0 r26"],
      ["AdvancedFilters", "1.6.5.3"],
      ["RavaloxsQuestTracker", "3.8.3.0"],
      ["TamrielTradeCentre", "5.30"],
    ]),
    catalog,
    ROSTER
  )

  test("never returns a deploy-owned entry, even under --force or --only", () => {
    const ownedDirs = plan.addons.filter((a) => a.status === "deploy-owned").map((a) => a.dir)
    expect([...ownedDirs].sort()).toEqual(["LibAddonMenu-2.0", "TemperInventory"])
    for (const opts of [
      { force: false, only: [] },
      { force: true, only: [] },
      { force: true, only: ["LibAddonMenu-2.0", "TemperInventory"] },
    ]) {
      const selected = selectTargets(plan, opts)
      expect(selected.filter((a) => a.status === "deploy-owned")).toEqual([])
      for (const dir of ownedDirs) expect(selected.map((a) => a.dir)).not.toContain(dir)
    }
  })

  test("default selects only outdated matched addons", () => {
    const sel = selectTargets(plan, { force: false, only: [] }).map((a) => a.dir)
    expect([...sel].sort()).toEqual(["RavaloxsQuestTracker", "TamrielTradeCentre"])
  })

  test("force selects all matched (outdated + up-to-date), never deploy-owned/unmatched", () => {
    const sel = selectTargets(plan, { force: true, only: [] }).map((a) => a.dir)
    expect([...sel].sort()).toEqual([
      "AdvancedFilters",
      "RavaloxsQuestTracker",
      "TamrielTradeCentre",
    ])
  })

  test("only restricts to named folders", () => {
    const sel = selectTargets(plan, { force: false, only: ["TamrielTradeCentre"] }).map(
      (a) => a.dir
    )
    expect(sel).toEqual(["TamrielTradeCentre"])
  })

  test("only with force can target an up-to-date addon", () => {
    const sel = selectTargets(plan, { force: true, only: ["AdvancedFilters"] }).map((a) => a.dir)
    expect(sel).toEqual(["AdvancedFilters"])
  })
})

describe("unknownOnlyDirs", () => {
  const plan = planUpdates(
    installed([
      ["TemperInventory", "1.0.0"],
      ["LibAddonMenu-2.0", "2.0 r26"],
      ["AdvancedFilters", "1.6.5.3"],
    ]),
    catalog,
    ROSTER
  )
  test("deploy-owned and absent folders are not installable", () => {
    const unknown = unknownOnlyDirs(plan, [
      "TemperInventory",
      "LibAddonMenu-2.0",
      "Nope",
      "AdvancedFilters",
    ])
    expect([...unknown].sort()).toEqual(["LibAddonMenu-2.0", "Nope", "TemperInventory"])
  })
})

describe("findCatalogEntryByName", () => {
  test("matches on UIName (display name with spaces)", () => {
    expect(findCatalogEntryByName(catalog, "Tamriel Trade Centre")?.uid).toBe("1245")
  })

  test("matches on an install folder name (UIDir)", () => {
    expect(findCatalogEntryByName(catalog, "TamrielTradeCentre")?.uid).toBe("1245")
    expect(findCatalogEntryByName(catalog, "AdvancedFilters")?.uid).toBe("99")
  })

  test("returns undefined when neither name nor folder matches", () => {
    expect(findCatalogEntryByName(catalog, "NoSuchAddon")).toBeUndefined()
  })

  test("first catalog entry wins when a folder name collides", () => {
    const dup: readonly CatalogEntry[] = [
      { uid: "1", name: "First", version: "1", dirs: ["Shared"] },
      { uid: "2", name: "Second", version: "2", dirs: ["Shared"] },
    ]
    expect(findCatalogEntryByName(dup, "Shared")?.uid).toBe("1")
  })

  test("UIName match takes precedence over a later folder match", () => {
    expect(findCatalogEntryByName(catalog, "AdvancedFilters")?.name).toBe("AdvancedFilters")
  })
})

describe("distinctUids", () => {
  test("dedupes uids while preserving order", () => {
    const plan = planUpdates(
      installed([
        ["Ravalox'QuestTracker", "0"],
        ["RavaloxsQuestTracker", "0"],
        ["TamrielTradeCentre", "0"],
      ]),
      catalog,
      NO_ROSTER
    )
    const sel = selectTargets(plan, { force: false, only: [] })
    expect(distinctUids(sel)).toEqual(["13", "1245"])
  })
})
