import { describe, expect, test } from "bun:test"
import {
  collectFloorsFor,
  decideFolderOwnership,
  decideInstallAction,
  type FolderOwnership,
  foreignCopySatisfies,
  OWNERSHIP_MARKER_FILE,
  parseFloorFor,
} from "./folder-ownership"

describe("decideFolderOwnership", () => {
  test("a missing folder is absent, not foreign", () => {
    expect(decideFolderOwnership({ dirExists: false, markerPresent: undefined })).toBe("absent")
  })

  test("a folder carrying the marker is ours", () => {
    expect(decideFolderOwnership({ dirExists: true, markerPresent: true })).toBe("temper-owned")
  })

  test("a folder demonstrably lacking the marker is foreign", () => {
    expect(decideFolderOwnership({ dirExists: true, markerPresent: false })).toBe("foreign")
  })

  test("an unreadable folder is unknown — absent evidence is never read as foreign", () => {
    expect(decideFolderOwnership({ dirExists: true, markerPresent: undefined })).toBe("unknown")
  })

  test("dirExists dominates: a missing folder stays absent even if a stale probe claims a marker", () => {
    expect(decideFolderOwnership({ dirExists: false, markerPresent: true })).toBe("absent")
  })
})

describe("parseFloorFor", () => {
  test("reads the floor when the entry names this provider", () => {
    expect(parseFloorFor("LibAddonMenu-2.0", "LibAddonMenu-2.0>=43")).toBe(43)
  })

  test("ignores an entry naming a different provider", () => {
    expect(parseFloorFor("LibCustomMenu", "LibAddonMenu-2.0>=43")).toBeUndefined()
  })

  test("a bare name declares no floor", () => {
    expect(parseFloorFor("LibCustomMenu", "LibCustomMenu")).toBeUndefined()
  })

  test("names containing digits, dots and dashes are not truncated", () => {
    expect(parseFloorFor("LibMapPins-1.0", "LibMapPins-1.0>=10047")).toBe(10047)
    expect(parseFloorFor("LibTableFunctions-1.0", "LibTableFunctions-1.0>=101")).toBe(101)
  })

  test("a zero-padded floor parses to its numeric value", () => {
    expect(parseFloorFor("LibShifterBox", "LibShifterBox>=000700")).toBe(700)
  })

  test("a comparator other than >= is not a floor and is not read as one", () => {
    expect(parseFloorFor("LibSets", "LibSets<=9020")).toBeUndefined()
    expect(parseFloorFor("LibSets", "LibSets=9020")).toBeUndefined()
  })

  test("a non-numeric version is not a floor", () => {
    expect(parseFloorFor("LibSets", "LibSets>=9.0.2")).toBeUndefined()
  })

  test("a prefix of the provider name does not match it", () => {
    expect(parseFloorFor("LibMap", "LibMapPins-1.0>=10047")).toBeUndefined()
  })
})

describe("collectFloorsFor", () => {
  test("gathers every floor the fleet declares against one provider", () => {
    expect(
      collectFloorsFor("LibAddonMenu-2.0", [
        ["LibAddonMenu-2.0>=43", "TemperHud"],
        ["LibAddonMenu-2.0>=41"],
        ["LibCustomMenu>=730"],
      ])
    ).toEqual([43, 41])
  })

  test("keeps duplicates so the highest floor still governs", () => {
    const floors = collectFloorsFor("LibAddonMenu-2.0", [
      ["LibAddonMenu-2.0>=40"],
      ["LibAddonMenu-2.0>=43"],
    ])
    expect(floors).toEqual([40, 43])
    expect(foreignCopySatisfies(42, floors)).toBe(false)
  })

  test("a fleet that names the provider without a floor demands nothing", () => {
    expect(collectFloorsFor("LibCustomMenu", [["LibCustomMenu"], ["TemperHud"]])).toEqual([])
  })

  test("no declared floors is satisfied by any readable version", () => {
    const floors = collectFloorsFor("TamrielTradeCentre", [["LibAddonMenu-2.0>=43"]])
    expect(floors).toEqual([])
    expect(foreignCopySatisfies(1, floors)).toBe(true)
  })

  test("an unreadable version is unverifiable even when nothing is demanded", () => {
    expect(foreignCopySatisfies(undefined, collectFloorsFor("LibCustomMenu", []))).toBeUndefined()
  })
})

describe("foreignCopySatisfies", () => {
  test("a newer foreign copy satisfies every floor", () => {
    expect(foreignCopySatisfies(44, [43, 40])).toBe(true)
  })

  test("an equal foreign copy satisfies an exact floor — the zero-headroom case", () => {
    expect(foreignCopySatisfies(730, [730, 692])).toBe(true)
  })

  test("one unmet floor among several fails the whole set", () => {
    expect(foreignCopySatisfies(42, [43, 40])).toBe(false)
  })

  test("no declared floors is vacuously satisfied", () => {
    expect(foreignCopySatisfies(1, [])).toBe(true)
  })

  test("an unreadable version is unverifiable, never a pass", () => {
    expect(foreignCopySatisfies(undefined, [43])).toBeUndefined()
    expect(foreignCopySatisfies(undefined, [])).toBeUndefined()
  })
})

describe("decideInstallAction", () => {
  test("installs when nothing is there", () => {
    expect(decideInstallAction("absent", "TemperHud", undefined, "").action).toBe("install")
  })

  test("installs over our own folder", () => {
    expect(decideInstallAction("temper-owned", "LibAddonMenu-2.0", undefined, "").action).toBe(
      "install"
    )
  })

  test("SKIPS a compatible foreign folder — never replaces a Minion-managed copy", () => {
    const decision = decideInstallAction("foreign", "LibCustomMenu", true, "found 731")
    expect(decision.action).toBe("skip")
  })

  test("the skip says out loud that we did NOT install, and names the folder and evidence", () => {
    const decision = decideInstallAction("foreign", "LibCustomMenu", true, "found 731")
    expect(decision.reason).toContain("LibCustomMenu")
    expect(decision.reason).toContain(OWNERSHIP_MARKER_FILE)
    expect(decision.reason).toContain("found 731")
    expect(decision.reason).toContain("NOT installed")
  })

  test("REFUSES a foreign folder that fails a declared floor, rather than picking a winner", () => {
    const decision = decideInstallAction("foreign", "LibCustomMenu", false, "found 722")
    expect(decision.action).toBe("refuse")
    expect(decision.reason).toContain("found 722")
  })

  test("REFUSES a foreign folder whose version is unreadable — unverifiable is not compatible", () => {
    expect(
      decideInstallAction("foreign", "LibCustomMenu", undefined, "manifest unreadable").action
    ).toBe("refuse")
  })

  test("REFUSES an unknown folder — we never delete on missing evidence", () => {
    expect(decideInstallAction("unknown", "LibCustomMenu", true, "").action).toBe("refuse")
    expect(decideInstallAction("unknown", "LibCustomMenu", undefined, "").action).toBe("refuse")
  })

  test("every state yields a non-empty reason, so no branch can act silently", () => {
    const states: readonly FolderOwnership[] = ["absent", "temper-owned", "foreign", "unknown"]
    for (const state of states) {
      for (const satisfies of [true, false, undefined]) {
        expect(
          decideInstallAction(state, "TemperInventory", satisfies, "probe").reason.length
        ).toBeGreaterThan(0)
      }
    }
  })
})
