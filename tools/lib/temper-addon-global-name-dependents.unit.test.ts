import { describe, expect, test } from "bun:test"
import {
  type DependentKind,
  type DependentScanInput,
  enumerateGlobalDependents,
  type GlobalDependentReport,
} from "./temper-addon-global-name-dependents.ts"

function kinds(report: GlobalDependentReport): readonly DependentKind[] {
  return report.dependents.map((d) => d.kind)
}

function run(input: DependentScanInput): GlobalDependentReport {
  return enumerateGlobalDependents(input)
}

describe("enumerateGlobalDependents — the crafting worked example (saga fixture)", () => {
  const craftingCorpus: DependentScanInput = {
    global: "TemperCrafting",
    files: [
      {
        path: "temper/game-crafting-addon/src/state.ts",
        lang: "ts",
        source: `const state = { Name: "TemperCrafting", Title: "CraftStore" }\nexport { state }\n`,
      },
      {
        path: "temper/game-crafting-addon/src/settings/lam.ts",
        lang: "ts",
        source: [
          `import { state } from "../state"`,
          `declare const LAM: { RegisterAddonPanel: (n: string, d: unknown) => unknown }`,
          `export function RegisterSettings() {`,
          `  return LAM.RegisterAddonPanel(state.Name, {})`,
          `}`,
        ].join("\n"),
      },
      {
        path: "temper/game-crafting-addon/src/core/xml-handlers.ts",
        lang: "ts",
        source: [
          `declare const LibAddonMenu2: { OpenToPanel: (p: unknown) => void }`,
          `export function OpenSettings(): undefined {`,
          `  LibAddonMenu2.OpenToPanel(globalThis.TemperCrafting.LAM)`,
          `  return undefined`,
          `}`,
        ].join("\n"),
      },
      {
        path: "temper/game-crafting-addon/metadata/XML/UI/CraftStore.xml",
        lang: "xml",
        source: [
          `<Controls>`,
          `  <Button><OnClicked>TemperCrafting.ShowMain()</OnClicked></Button>`,
          `  <Button><OnClicked>TemperCrafting.OpenSettings()</OnClicked></Button>`,
          `</Controls>`,
        ].join("\n"),
      },
      {
        path: "temper/game-crafting-addon/metadata/Bindings.xml",
        lang: "xml",
        source: `<Bindings><Down>TemperCrafting.SetAllStyles()</Down></Bindings>\n`,
      },
    ],
  }

  test("surfaces all three dependent kinds and returns keep-name-required (rename-UNSAFE)", () => {
    const report = run(craftingCorpus)
    expect(report.verdict).toBe("keep-name-required")
    const seen = new Set(kinds(report))
    expect(seen.has("lam-topology-binding")).toBe(true)
    expect(seen.has("ts-global-read")).toBe(true)
    expect(seen.has("xml-handler-ref")).toBe(true)
  })

  test("surfaces the LAM-topology binding site (the render-risk fingerprint) on state.Name", () => {
    const report = run(craftingCorpus)
    const binding = report.dependents.find((d) => d.kind === "lam-topology-binding")
    expect(binding?.file).toBe("temper/game-crafting-addon/src/settings/lam.ts")
    expect(binding?.detail).toBe(`RegisterAddonPanel("TemperCrafting")`)
  })

  test("surfaces the globalThis.TemperCrafting.LAM render-path read", () => {
    const report = run(craftingCorpus)
    const read = report.dependents.find((d) => d.kind === "ts-global-read")
    expect(read?.file).toBe("temper/game-crafting-addon/src/core/xml-handlers.ts")
    expect(read?.detail).toBe("globalThis.TemperCrafting")
  })

  test("surfaces every XML handler/keybind ref keyed on the exact name", () => {
    const report = run(craftingCorpus)
    const xml = report.dependents.filter((d) => d.kind === "xml-handler-ref")
    expect(xml.length).toBe(3)
    expect(xml.every((d) => d.detail.startsWith("TemperCrafting."))).toBe(true)
  })
})

describe("enumerateGlobalDependents — the rename-safe case (no dependents)", () => {
  test("a global written but read by no one, with no control binding, is rename-safe", () => {
    const report = run({
      global: "TemperExampleWidget",
      files: [
        {
          path: "temper/addons-example-widget/src/public-api.ts",
          lang: "ts",
          source: `const api = { isReady: () => true }\nglobalThis.TemperExampleWidget = api\n`,
        },
      ],
    })
    expect(report.verdict).toBe("rename-safe")
    expect(report.dependents.length).toBe(0)
  })
})

describe("enumerateGlobalDependents — per-kind isolation", () => {
  test("a lone ts-global-read yields keep-name-required", () => {
    const report = run({
      global: "TemperInventory",
      files: [
        {
          path: "a/reader.ts",
          lang: "ts",
          source: `export const slots = globalThis.TemperInventory?.getBackpackFreeSlots?.()\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["ts-global-read"])
    expect(report.verdict).toBe("keep-name-required")
  })

  test("a lone xml-handler-ref yields keep-name-required", () => {
    const report = run({
      global: "TemperLeads",
      files: [
        {
          path: "a.xml",
          lang: "xml",
          source: `<OnShow>TemperLeads.SetupDropdown(self)</OnShow>\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["xml-handler-ref"])
    expect(report.verdict).toBe("keep-name-required")
  })

  test("a lone lam-topology-binding yields keep-name-required", () => {
    const report = run({
      global: "TemperFoo",
      files: [
        {
          path: "a.ts",
          lang: "ts",
          source: `declare const LAM: any\nLAM.RegisterAddonPanel("TemperFoo", {})\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["lam-topology-binding"])
    expect(report.verdict).toBe("keep-name-required")
  })

  test("resolves a .call-shifted binding (name is arg[1])", () => {
    const report = run({
      global: "LibThing",
      files: [
        {
          path: "a.ts",
          lang: "ts",
          source: `declare const lam: any\nlam.RegisterAddonPanel.call(lam, "LibThing", {})\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["lam-topology-binding"])
  })

  test('element-access read `_G["name"]` is surfaced', () => {
    const report = run({
      global: "TemperFoo",
      files: [
        {
          path: "a.ts",
          lang: "ts",
          source: `declare const _G: any\nconst x = _G["TemperFoo"].run()\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["ts-global-read"])
  })
})

describe("enumerateGlobalDependents — residual boundaries (no false positives / silent drops)", () => {
  test("the write LHS `globalThis.G = …` is NOT a dependent read", () => {
    const report = run({
      global: "TemperFoo",
      files: [{ path: "a.ts", lang: "ts", source: `const api = {}\nglobalThis.TemperFoo = api\n` }],
    })
    expect(report.dependents.length).toBe(0)
    expect(report.verdict).toBe("rename-safe")
  })

  test("`globalThis.G.field = …` IS a read of G (only the leaf is written)", () => {
    const report = run({
      global: "TemperFoo",
      files: [
        {
          path: "a.ts",
          lang: "ts",
          source: `declare const p: unknown\nglobalThis.TemperFoo.LAM = p\n`,
        },
      ],
    })
    expect(kinds(report)).toEqual(["ts-global-read"])
  })

  test("a longer identifier sharing the prefix (TemperCraftingSettings) is NOT matched in XML", () => {
    const report = run({
      global: "TemperCrafting",
      files: [
        { path: "a.xml", lang: "xml", source: `<OnShow>TemperCraftingSettings.Open()</OnShow>\n` },
      ],
    })
    expect(report.dependents.length).toBe(0)
  })

  test("a name appearing only inside an XML comment is NOT matched", () => {
    const report = run({
      global: "TemperCrafting",
      files: [
        {
          path: "a.xml",
          lang: "xml",
          source: `<!-- TemperCrafting.ShowMain() was here -->\n<Controls/>\n`,
        },
      ],
    })
    expect(report.dependents.length).toBe(0)
  })

  test("a template/concatenated registration name does NOT resolve (out of deterministic envelope)", () => {
    const report = run({
      global: "TemperFooOptions",
      files: [
        {
          path: "a.ts",
          lang: "ts",
          source:
            'declare const LAM: any\nconst ADDON = "TemperFoo"\nLAM.RegisterAddonPanel(`${ADDON}Options`, {})\n',
        },
      ],
    })
    expect(report.dependents.length).toBe(0)
    expect(report.verdict).toBe("rename-safe")
  })
})
