import { describe, expect, test } from "bun:test"
import {
  type AddonOwnershipInput,
  collectGlobalWritesFromSource,
  findOwnershipViolations,
  OWNED_GLOBAL_REMEDY,
} from "./addon-global-ownership"

describe("collectGlobalWritesFromSource", () => {
  test("captures globalThis.X = … property-access writes", () => {
    const src = `globalThis.TemperCharacters = { foo }\nglobalThis.TemperCharacters_Refresh = refresh`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([
      "TemperCharacters",
      "TemperCharacters_Refresh",
    ])
  })

  test('captures globalThis["X"] = … element-access writes', () => {
    const src = `globalThis["LibFoo"] = lib`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["LibFoo"])
  })

  test("ignores globalThis.X mentioned only in a comment", () => {
    const src = `// publish via globalThis.X = … without a cast\nconst y = 1`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("ignores globalThis.X mentioned only in a string literal", () => {
    const src = `const note = "lowers globalThis.X = ... to a bare write"`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("ignores reads — globalThis.X in expression position is not a write", () => {
    const src = `const sv = globalThis.TemperInventory_SavedVariables\nif (globalThis.TemperHud) {}`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("dedupes repeated writes of the same global", () => {
    const src = `globalThis.Foo = a\nglobalThis.Foo = b`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["Foo"])
  })
})

describe("collectGlobalWritesFromSource — every receiver the corpus publishes through", () => {
  test("the `_G` ambient is the same table as globalThis (LibScrollableMenu shape)", () => {
    const src = `declare const _G: Record<string, unknown>\n_G.LSM_Debug = lsmDebug\n_G["LSM_UPDATE_MODE_BOTH"] = 3`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([
      "LSM_Debug",
      "LSM_UPDATE_MODE_BOTH",
    ])
  })

  test("a local bound directly to the table (TemperCrafting slot-handler shape)", () => {
    const src = `const g: Record<string, unknown> = globalThis\ng["TemperCrafting_GetSlotHandlerStats"] = getStats`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([
      "TemperCrafting_GetSlotHandlerStats",
    ])
  })

  test("a local bound through a cast helper (votans-minimap / LibGPS shape)", () => {
    const src = `const glob = asAnyTable(globalThis)\nglob.SetMapToPlayerLocation = NoOp`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["SetMapToPlayerLocation"])
  })

  test("a cast helper inline in receiver position (LibGPS compatibility shape)", () => {
    const src = `asGlobalObjectTable(_G).LibGPS2 = compat`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["LibGPS2"])
  })

  test("an alias of an alias resolves — the receiver set is chased, not matched once", () => {
    const src = `const a = globalThis\nconst b = asRecord(a)\nb.LibFoo = lib`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["LibFoo"])
  })

  test("a helper this tree does not spell today is still a receiver — the arm is derived", () => {
    const src = `const t = someHelperAddedTomorrow(globalThis)\nt.LibNew = lib`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual(["LibNew"])
  })

  test("reading through an alias is not a claim (TemperItems bank-trace shape)", () => {
    const src = `const g: Record<string, unknown> = globalThis\nconst fn = g["TemperCrafting_GetSlotHandlerStats"]`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("a dynamic key is not attributable, through any receiver (LibStub idiom)", () => {
    const src = `const glob = _G\nglob[MAJOR] = lib\nglobalThis[computed] = other`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("a name also bound to something else in the file is not a receiver", () => {
    const src = `function a() { const g = asRecord(globalThis); g.LibFoo = lib }\nfunction b() { const g = row; g.total = 1 }`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })

  test("a write to an ordinary object named like a receiver is not a claim", () => {
    const src = `const window = pool.Acquire()\nwindow.key = key`
    expect(collectGlobalWritesFromSource(src, "a.ts")).toEqual([])
  })
})

describe("findOwnershipViolations", () => {
  const clean: readonly AddonOwnershipInput[] = [
    {
      addonName: "TemperInventory",
      writtenGlobals: ["TemperInventory"],
      savedVariables: ["TemperInventory_SavedVariables"],
    },
    {
      addonName: "TemperHud",
      writtenGlobals: ["TemperHud"],
      savedVariables: ["TemperHud_SavedVariables"],
    },
  ]

  test("clean tree — each global claimed by exactly one addon — no violations", () => {
    expect(findOwnershipViolations(clean)).toEqual([])
  })

  test("a consumer that only READS another addon's global is not a claimant", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      { addonName: "TemperInventory", writtenGlobals: ["TemperInventory"], savedVariables: [] },
      { addonName: "TemperHud", writtenGlobals: ["TemperHud"], savedVariables: [] },
    ]
    expect(findOwnershipViolations(inputs)).toEqual([])
  })

  test("flags a cross-addon double-write of the same namespace global", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      { addonName: "TemperInventory", writtenGlobals: ["TemperInventory"], savedVariables: [] },
      { addonName: "RogueAddon", writtenGlobals: ["TemperInventory"], savedVariables: [] },
    ]
    const v = findOwnershipViolations(inputs)
    expect(v).toHaveLength(1)
    expect(v[0]?.globalName).toBe("TemperInventory")
    expect(v[0]?.addons).toEqual(["RogueAddon", "TemperInventory"])
  })

  test("flags a savedVariable clobber — port writes another addon's SV", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      {
        addonName: "TemperInventory",
        writtenGlobals: [],
        savedVariables: ["TemperInventory_SavedVariables"],
      },
      {
        addonName: "RogueAddon",
        writtenGlobals: ["TemperInventory_SavedVariables"],
        savedVariables: [],
      },
    ]
    const v = findOwnershipViolations(inputs)
    expect(v).toHaveLength(1)
    expect(v[0]?.globalName).toBe("TemperInventory_SavedVariables")
    expect(v[0]?.addons).toEqual(["RogueAddon", "TemperInventory"])
  })

  test("flags a shared Lib* table written by two ports", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      { addonName: "LibFoo", writtenGlobals: ["LibFoo"], savedVariables: [] },
      { addonName: "TemperConsumer", writtenGlobals: ["LibFoo"], savedVariables: [] },
    ]
    const v = findOwnershipViolations(inputs)
    expect(v).toHaveLength(1)
    expect(v[0]?.globalName).toBe("LibFoo")
  })

  test("every violation carries the act that clears it", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      { addonName: "LibFoo", writtenGlobals: ["LibFoo"], savedVariables: [] },
      { addonName: "TemperConsumer", writtenGlobals: ["LibFoo"], savedVariables: [] },
    ]
    const remedy = findOwnershipViolations(inputs)[0]?.remedy
    expect(remedy).toBe(OWNED_GLOBAL_REMEDY)
    expect(remedy).toContain("READS")
    expect(remedy).toContain("ops temper addon global-name-dependents")
  })

  test("emits violations sorted by global name", () => {
    const inputs: readonly AddonOwnershipInput[] = [
      { addonName: "A", writtenGlobals: ["Zeta", "Alpha"], savedVariables: [] },
      { addonName: "B", writtenGlobals: ["Zeta", "Alpha"], savedVariables: [] },
    ]
    expect(findOwnershipViolations(inputs).map((x) => x.globalName)).toEqual(["Alpha", "Zeta"])
  })
})
