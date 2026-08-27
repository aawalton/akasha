import { describe, expect, test } from "bun:test"
import {
  buildPackFromEntries,
  computeEnableActions,
  currentEnabledNames,
  isPackActive,
  packAddonNames,
} from "./packs-core"
import type { AddonEntry, Pack } from "./types"

function entry(name: string, enabled: boolean, index: number, isLibrary = false): AddonEntry {
  return { index, name, title: name, enabled, isLibrary }
}

const SNAPSHOT: AddonEntry[] = [
  entry("LibFoo", true, 1, true),
  entry("AddonA", true, 2),
  entry("AddonB", false, 3),
  entry("AddonC", true, 4),
]

describe("buildPackFromEntries", () => {
  test("captures only the enabled add-ons", () => {
    expect(buildPackFromEntries(SNAPSHOT)).toEqual({ LibFoo: true, AddonA: true, AddonC: true })
  })

  test("empty snapshot yields an empty pack", () => {
    expect(buildPackFromEntries([])).toEqual({})
  })
})

describe("computeEnableActions", () => {
  test("emits corrective actions only where state differs", () => {
    const pack: Pack = { AddonA: true, AddonB: true }
    const actions = computeEnableActions(pack, SNAPSHOT)
    expect(actions).toEqual([
      { index: 1, enabled: false },
      { index: 3, enabled: true },
      { index: 4, enabled: false },
    ])
  })

  test("no actions when the snapshot already matches the pack", () => {
    const pack = buildPackFromEntries(SNAPSHOT)
    expect(computeEnableActions(pack, SNAPSHOT)).toEqual([])
  })

  test("loading an empty pack disables every enabled add-on", () => {
    expect(computeEnableActions({}, SNAPSHOT)).toEqual([
      { index: 1, enabled: false },
      { index: 2, enabled: false },
      { index: 4, enabled: false },
    ])
  })
})

describe("packAddonNames / currentEnabledNames", () => {
  test("names come back sorted", () => {
    expect(packAddonNames({ Zeta: true, Alpha: true, Mid: true })).toEqual(["Alpha", "Mid", "Zeta"])
  })

  test("currentEnabledNames reflects only enabled entries, sorted", () => {
    expect(currentEnabledNames(SNAPSHOT)).toEqual(["AddonA", "AddonC", "LibFoo"])
  })
})

describe("isPackActive", () => {
  test("true when the pack equals the current enabled set", () => {
    expect(isPackActive(buildPackFromEntries(SNAPSHOT), SNAPSHOT)).toBe(true)
  })

  test("false when they differ", () => {
    expect(isPackActive({ AddonA: true }, SNAPSHOT)).toBe(false)
  })
})
