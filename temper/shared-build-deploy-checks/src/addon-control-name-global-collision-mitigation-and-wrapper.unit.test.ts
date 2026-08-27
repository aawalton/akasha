import { describe, expect, test } from "bun:test"
import {
  type CollisionFinding,
  findControlNameGlobalCollisions,
} from "./addon-control-name-global-collision"
import { parseAddonSource } from "./addon-global-ownership"

interface SourceFixture {
  readonly addonName: string
  readonly protectedGlobals: readonly string[]
  readonly files: readonly { readonly path: string; readonly source: string }[]
}

function collide(input: SourceFixture): readonly CollisionFinding[] {
  return findControlNameGlobalCollisions({
    addonName: input.addonName,
    protectedGlobals: input.protectedGlobals,
    files: input.files.map((file) => parseAddonSource(file.path, file.source)),
  })
}

function names(input: SourceFixture): readonly string[] {
  return collide(input).map((f) => f.name)
}

describe("findControlNameGlobalCollisions — mitigation-aware (98fea5f490 contract)", () => {
  test("does NOT flag a synchronous adjacent restore across a wrapper call (crafting restore shape)", () => {
    expect(
      names({
        addonName: "TemperCrafting",
        protectedGlobals: ["TemperCrafting"],
        files: [
          {
            path: "src/state.ts",
            source: `export const state = { Name: "TemperCrafting", Title: "CraftStore" }`,
          },
          {
            path: "src/settings/lam.ts",
            source: `export function RegisterSettings() {
  const panel = LAM.RegisterAddonPanel(state.Name, PanelData)
  LAM.RegisterOptionControls(state.Name, OptionsTable)
  return panel
}`,
          },
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  const settingsPanel = RegisterSettings()
  globalThis.TemperCrafting = craftStoreApi
  TemperCrafting.LAM = settingsPanel
}`,
          },
        ],
      })
    ).toEqual([])
  })

  test("does NOT flag a same-function synchronous adjacent restore", () => {
    expect(
      names({
        addonName: "TemperInline",
        protectedGlobals: ["TemperInline"],
        files: [
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  LAM.RegisterAddonPanel("TemperInline", PanelData)
  globalThis.TemperInline = api
}`,
          },
        ],
      })
    ).toEqual([])
  })

  test("FLAGS an unmitigated clobber with no restore anywhere (the bare hazard)", () => {
    expect(
      names({
        addonName: "TemperBare",
        protectedGlobals: ["TemperBare"],
        files: [
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  LAM.RegisterAddonPanel("TemperBare", PanelData)
}`,
          },
        ],
      })
    ).toEqual(["TemperBare"])
  })

  test("FLAGS a clobber whose only restore is DEFERRED inside zo_callLater (#13281 deferred case)", () => {
    expect(
      names({
        addonName: "TemperDeferred",
        protectedGlobals: ["TemperDeferred"],
        files: [
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  LAM.RegisterAddonPanel("TemperDeferred", PanelData)
  zo_callLater(() => {
    globalThis.TemperDeferred = api
  }, 0)
}`,
          },
        ],
      })
    ).toEqual(["TemperDeferred"])
  })

  test("FLAGS a direct restore positioned after a coroutine.yield (yield ends the synchronous window)", () => {
    expect(
      names({
        addonName: "TemperYield",
        protectedGlobals: ["TemperYield"],
        files: [
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  LAM.RegisterAddonPanel("TemperYield", PanelData)
  coroutine.yield()
  globalThis.TemperYield = api
}`,
          },
        ],
      })
    ).toEqual(["TemperYield"])
  })

  test("does NOT flag a direct restore that merely follows an unrelated zo_callLater (schedule != interrupt)", () => {
    expect(
      names({
        addonName: "TemperSched",
        protectedGlobals: ["TemperSched"],
        files: [
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  LAM.RegisterAddonPanel("TemperSched", PanelData)
  zo_callLater(() => DoSomethingLater(), 0)
  globalThis.TemperSched = api
}`,
          },
        ],
      })
    ).toEqual([])
  })
})

describe("findControlNameGlobalCollisions — the registerPanel wrapper (name at arg[1])", () => {
  test("flags a literal panel name behind the LAM handle, and names the wrapper", () => {
    const findings = collide({
      addonName: "TemperFoo",
      protectedGlobals: ["TemperFoo"],
      files: [
        { path: "src/settings.ts", source: `registerPanel(LAM, "TemperFoo", panelData, options)` },
      ],
    })
    expect(findings.map((f) => f.name)).toEqual(["TemperFoo"])
    expect(findings[0]?.fn).toBe("registerPanel")
  })

  test("FLAGS the #13375 site in today's call shape when the restore is gone", () => {
    expect(
      names({
        addonName: "TemperCrafting",
        protectedGlobals: ["TemperCrafting"],
        files: [
          {
            path: "src/state.ts",
            source: `export const state = { Name: "TemperCrafting", Title: "CraftStore" }`,
          },
          {
            path: "src/settings/lam.ts",
            source: `export function RegisterSettings() {
  return registerPanel(LAM, state.Name, PanelData, OptionsTable)
}`,
          },
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  TemperCrafting.LAM = RegisterSettings()
}`,
          },
        ],
      })
    ).toEqual(["TemperCrafting"])
  })

  test("does NOT flag that site as the tree stands — the caller restores it (crafting today)", () => {
    expect(
      names({
        addonName: "TemperCrafting",
        protectedGlobals: ["TemperCrafting"],
        files: [
          {
            path: "src/state.ts",
            source: `export const state = { Name: "TemperCrafting", Title: "CraftStore" }`,
          },
          {
            path: "src/settings/lam.ts",
            source: `export function RegisterSettings() {
  return registerPanel(LAM, state.Name, PanelData, OptionsTable)
}`,
          },
          {
            path: "src/events.ts",
            source: `export function OnAddOnLoaded() {
  const settingsPanel = RegisterSettings()
  globalThis.TemperCrafting = temperCraftingApi
  TemperCrafting.LAM = settingsPanel
}`,
          },
        ],
      })
    ).toEqual([])
  })

  test("does NOT read the LAM handle at arg[0] as the registered name", () => {
    expect(
      names({
        addonName: "TemperHandle",
        protectedGlobals: ["LAM"],
        files: [
          { path: "src/settings.ts", source: `registerPanel(LAM, "TemperHandle_LAM", pd, opts)` },
        ],
      })
    ).toEqual([])
  })

  test("shifts the wrapper's index by one under `.call` (receiver, then handle, then name)", () => {
    expect(
      names({
        addonName: "TemperShift",
        protectedGlobals: ["TemperShift"],
        files: [
          {
            path: "src/settings.ts",
            source: `helpers.registerPanel.call(helpers, LAM, "TemperShift", pd, opts)`,
          },
        ],
      })
    ).toEqual(["TemperShift"])
  })

  test("a suffixed name behind the handle is unresolvable and not flagged", () => {
    expect(
      names({
        addonName: "TemperFco",
        protectedGlobals: ["TemperFco"],
        files: [
          { path: "src/settings.ts", source: `registerPanel(lam, addonName + "_LAM", pd, opts)` },
        ],
      })
    ).toEqual([])
  })
})
