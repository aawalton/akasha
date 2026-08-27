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

describe("findControlNameGlobalCollisions — positives (the clobber class)", () => {
  test("flags a literal panel name equal to an owned global (#13375 shape, simplest)", () => {
    expect(
      names({
        addonName: "TemperFoo",
        protectedGlobals: ["TemperFoo"],
        files: [
          {
            path: "src/settings.ts",
            source: `LAM.RegisterAddonPanel("TemperFoo", panelData)`,
          },
        ],
      })
    ).toEqual(["TemperFoo"])
  })

  test("flags an imported const panel id equal to an owned global (dungeon-champions shape)", () => {
    expect(
      names({
        addonName: "TemperDungeonChampions",
        protectedGlobals: ["TemperDungeonChampions"],
        files: [
          {
            path: "src/constants.ts",
            source: `export const ADDON_NAME = "TemperDungeonChampions"`,
          },
          {
            path: "src/settings.ts",
            source: `LibAddonMenu2.RegisterAddonPanel(ADDON_NAME, panelData)`,
          },
        ],
      })
    ).toEqual(["TemperDungeonChampions"])
  })

  test("flags an object-literal property panel id resolving to an owned global (#13375 real shape: state.Name)", () => {
    expect(
      names({
        addonName: "TemperCrafting",
        protectedGlobals: ["TemperCrafting"],
        files: [
          {
            path: "src/state.ts",
            source: `export const state: StateType = { Name: "TemperCrafting", Title: "CraftStore" }`,
          },
          {
            path: "src/settings/lam.ts",
            source: `const panel = LAM.RegisterAddonPanel(state.Name, PanelData)`,
          },
        ],
      })
    ).toEqual(["TemperCrafting"])
  })

  test("flags a direct CreateControl name equal to an owned global", () => {
    expect(
      names({
        addonName: "TemperBar",
        protectedGlobals: ["TemperBar"],
        files: [
          {
            path: "src/ui.ts",
            source: `WINDOW_MANAGER.CreateControl("TemperBar", parent, CT_CONTROL)`,
          },
        ],
      })
    ).toEqual(["TemperBar"])
  })

  test("flags a name equal to a SavedVariable-derived protected global", () => {
    expect(
      names({
        addonName: "TemperSv",
        protectedGlobals: ["TemperSv_Data"],
        files: [
          {
            path: "src/menu.ts",
            source: `LAM.RegisterAddonPanel("TemperSv_Data", panelData)`,
          },
        ],
      })
    ).toEqual(["TemperSv_Data"])
  })

  test("flags a `.call`-invoked RegisterAddonPanel whose name arg (arg[1]) collides", () => {
    expect(
      names({
        addonName: "LibThing",
        protectedGlobals: ["LibThing"],
        files: [
          {
            path: "src/settings.ts",
            source: `lam.RegisterAddonPanel.call(lam, "LibThing", panelData)`,
          },
        ],
      })
    ).toEqual(["LibThing"])
  })
})

describe("findControlNameGlobalCollisions — negatives (no false positives)", () => {
  test("a suffixed concatenation can never equal a bare global (fco* / postmaster / unboxer shape)", () => {
    expect(
      names({
        addonName: "TemperFco",
        protectedGlobals: ["TemperFco"],
        files: [
          {
            path: "src/settings-menu.ts",
            source: `lam.RegisterAddonPanel(addonName + "_LAM", panelData)`,
          },
        ],
      })
    ).toEqual([])
  })

  test("a template-literal-suffixed name is not flagged", () => {
    expect(
      names({
        addonName: "TemperUnbox",
        protectedGlobals: ["TemperUnbox"],
        files: [
          {
            path: "src/settings-panel.ts",
            source: "LibAddonMenu2.RegisterAddonPanel(`${ADDON_NAME}Options`, panelData)",
          },
        ],
      })
    ).toEqual([])
  })

  test("a runtime-computed name (GetString) is unresolvable and not flagged (skill-point-finder shape)", () => {
    expect(
      names({
        addonName: "USPF",
        protectedGlobals: ["USPF"],
        files: [
          {
            path: "src/menu.ts",
            source: `const addonName = GetString(USPF_GUI_TITLE)\nlam.RegisterAddonPanel(addonName, panelData)`,
          },
        ],
      })
    ).toEqual([])
  })

  test("a distinct literal panel id does not collide with the global (the safe norm)", () => {
    expect(
      names({
        addonName: "TemperCombat",
        protectedGlobals: ["TemperCombat"],
        files: [
          {
            path: "src/menu/menu.ts",
            source: `menu.RegisterAddonPanel("TemperCombat_Options", panelData)`,
          },
        ],
      })
    ).toEqual([])
  })

  test("a const panel id resolving to a distinct value (potionmaker shape: ADDON_NAME != global)", () => {
    expect(
      names({
        addonName: "PotionMaker",
        protectedGlobals: ["PotMaker"],
        files: [
          {
            path: "src/constants.ts",
            source: `export const ADDON_NAME = "PotionMaker"`,
          },
          {
            path: "src/settings-menu.ts",
            source: `LAM2.RegisterAddonPanel(ADDON_NAME, panelData)`,
          },
        ],
      })
    ).toEqual([])
  })

  test("no registration calls at all yields no findings", () => {
    expect(
      names({
        addonName: "TemperQuiet",
        protectedGlobals: ["TemperQuiet"],
        files: [{ path: "src/main.ts", source: `globalThis.TemperQuiet = {}` }],
      })
    ).toEqual([])
  })

  test("an unrelated function call named like a control fn is matched only on the registration fns", () => {
    expect(
      names({
        addonName: "TemperX",
        protectedGlobals: ["TemperX"],
        files: [{ path: "src/x.ts", source: `SomeOther("TemperX", 1)` }],
      })
    ).toEqual([])
  })
})
describe("findControlNameGlobalCollisions — finding shape", () => {
  test("a finding carries addon, name, global, fn, and 1-based location", () => {
    const findings = collide({
      addonName: "TemperFoo",
      protectedGlobals: ["TemperFoo"],
      files: [{ path: "src/settings.ts", source: `LAM.RegisterAddonPanel("TemperFoo", p)` }],
    })
    expect(findings).toHaveLength(1)
    const f = findings[0]
    expect(f).toBeDefined()
    if (f === undefined) return
    expect(f.addonName).toBe("TemperFoo")
    expect(f.name).toBe("TemperFoo")
    expect(f.global).toBe("TemperFoo")
    expect(f.fn).toBe("RegisterAddonPanel")
    expect(f.file).toBe("src/settings.ts")
    expect(f.line).toBe(1)
    expect(f.column).toBeGreaterThan(0)
  })
})
