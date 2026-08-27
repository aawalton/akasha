import { describe, expect, test } from "bun:test"
import { collectColonMethodNames, scanBundle } from "./tstl-colon-dot-self-shift"
import { isReservationSource } from "./tstl-colon-dot-self-shift.manifest"

const decl = (text: string) => [{ file: "x.d.ts", text }]
const CORE = "temper/addons/types/eso/ui.d.ts"

describe("collectColonMethodNames (derivation)", () => {
  test("collects `.d.ts` method-shorthand members (colon)", () => {
    const set = collectColonMethodNames(
      decl(`interface Control { SetColor(r: number, g: number, b: number): void }`)
    )
    expect(set.has("SetColor")).toBe(true)
  })

  test("collects `this:`-typed property-arrow members (colon)", () => {
    const set = collectColonMethodNames(
      decl(`interface FilterPool { ReleaseAllObjects: (this: FilterPool) => void }`)
    )
    expect(set.has("ReleaseAllObjects")).toBe(true)
  })

  test("excludes `this: void` property-arrows (legit dot callbacks)", () => {
    const set = collectColonMethodNames(
      decl(`interface Sortable { sortFn: (this: void, a: number, b: number) => number }`)
    )
    expect(set.has("sortFn")).toBe(false)
  })

  test("excludes plain function-typed properties (no `this`, dot under noImplicitSelf)", () => {
    const set = collectColonMethodNames(decl(`interface Cb { onTick: (dt: number) => void }`))
    expect(set.has("onTick")).toBe(false)
  })

  test("excludes top-level `declare function` statics", () => {
    const set = collectColonMethodNames(decl(`declare function GetString(id: number): string`))
    expect(set.has("GetString")).toBe(false)
  })

  test("excludes the `New` / `Subclass` constructor pair", () => {
    const set = collectColonMethodNames(
      decl(
        `interface ZO_Object { New(this: void, ...args: unknown[]): ZO_Object; Subclass(): ZO_Object }`
      )
    )
    expect(set.has("New")).toBe(false)
    expect(set.has("Subclass")).toBe(false)
  })

  test("excludes a `this: void` method-signature (dot, not colon)", () => {
    const set = collectColonMethodNames(
      decl(`interface FCOIS { IsMarked(this: void, ...args: unknown[]): boolean }`)
    )
    expect(set.has("IsMarked")).toBe(false)
  })

  test("excludes a name declared in BOTH colon and `this: void` property forms", () => {
    const set = collectColonMethodNames(
      decl(
        `interface Logger { Debug(this: Logger, ...a: unknown[]): void }
         interface Util { Debug: (this: void, ...a: unknown[]) => void }`
      )
    )
    expect(set.has("Debug")).toBe(false)
  })

  test("excludes a name that is also a free `function` declaration", () => {
    const set = collectColonMethodNames(
      decl(
        `interface Lib { dm(this: Lib, ...a: unknown[]): void }
         declare function dm(logType: string, ...a: unknown[]): void`
      )
    )
    expect(set.has("dm")).toBe(false)
  })

  test("keeps a colon-only name (no competing dot declaration)", () => {
    const set = collectColonMethodNames(
      decl(`interface Control { SetHidden(hidden: boolean): void }`)
    )
    expect(set.has("SetHidden")).toBe(true)
  })
})

describe("collectColonMethodNames (reserved core-colon-set)", () => {
  test("reserves a core colon-method against an addon `this: void` method-signature shim", () => {
    const set = collectColonMethodNames([
      { file: CORE, text: `interface Control { SetHidden(hidden: boolean): void }`, core: true },
      {
        file: "no-thank-you/src/eso-extra-api.d.ts",
        text: `interface StyleItem { SetHidden(this: void, hidden: boolean): void }`,
        core: false,
      },
    ])
    expect(set.has("SetHidden")).toBe(true)
  })

  test("reserves a core colon-method against an addon `this: void` property-arrow shim", () => {
    const set = collectColonMethodNames([
      {
        file: CORE,
        text: `interface ComboBox { SetSortsItems(sortsItems: boolean): void }`,
        core: true,
      },
      {
        file: "housing/src/ptf/comboboxes.ts",
        text: `interface PtfComboBox { SetSortsItems: (this: void, sortsItems: boolean) => void }`,
        core: false,
      },
    ])
    expect(set.has("SetSortsItems")).toBe(true)
  })

  test("a genuine free-function static still subtracts a reserved core name", () => {
    const set = collectColonMethodNames([
      { file: CORE, text: `interface Control { GetId(): number }`, core: true },
      {
        file: "some-addon/src/util.ts",
        text: `declare function GetId(x: number): number`,
        core: false,
      },
    ])
    expect(set.has("GetId")).toBe(false)
  })

  test("a `this: void` shim of a NON-core name still subtracts (unchanged)", () => {
    const set = collectColonMethodNames([
      {
        file: "a/src/logger.d.ts",
        text: `interface Logger { Trace(this: Logger): void }`,
        core: false,
      },
      {
        file: "b/src/util.d.ts",
        text: `interface Util { Trace: (this: void) => void }`,
        core: false,
      },
    ])
    expect(set.has("Trace")).toBe(false)
  })

  test("a reserved core colon-method survives an addon `: AnyTableMember` wildcard property", () => {
    const set = collectColonMethodNames([
      {
        file: CORE,
        text: `interface SceneFragment { SetConditional(fn: (this: void) => boolean): void }`,
        core: true,
      },
      {
        file: "votans-minimap/src/types/eso-local.d.ts",
        text: `interface AnyTableMember { (this: void, ...args: unknown[]): AnyTableMember }\ninterface AnyTableMembers { SetConditional: AnyTableMember }`,
        core: false,
      },
    ])
    expect(set.has("SetConditional")).toBe(true)
  })

  test("a reserved pan-zoom colon-method survives an explicit `this: void` property shim", () => {
    const set = collectColonMethodNames([
      {
        file: CORE,
        text: `interface PanAndZoom { ClearJumpToPinWhenAvailable(): void }`,
        core: true,
      },
      {
        file: "votans-minimap/src/types/eso-local.d.ts",
        text: `interface Shim { ClearJumpToPinWhenAvailable: (this: void) => void }`,
        core: false,
      },
    ])
    expect(set.has("ClearJumpToPinWhenAvailable")).toBe(true)
  })

  test("reserves a core crafting result-link accessor against addon `this: void` brands", () => {
    const set = collectColonMethodNames([
      {
        file: "temper/addons/types/eso/reserved-colon-methods.d.ts",
        text: `interface Crafting { GetResultItemLink(): string | undefined }`,
        core: true,
      },
      {
        file: "tamriel-trade-centre/src/types/eso-gaps.d.ts",
        text: `interface AlchemyShim { GetResultItemLink(this: void): string | undefined }`,
        core: false,
      },
      {
        file: "tamriel-trade-centre/src/price-hooks.ts",
        text: `interface ResultLinkSource { GetResultItemLink: (this: void) => string | undefined }`,
        core: false,
      },
    ])
    expect(set.has("GetResultItemLink")).toBe(true)
  })

  test("defaults to non-core when the `core` flag is omitted", () => {
    const set = collectColonMethodNames([
      { file: "x.d.ts", text: `interface Control { SetHidden(hidden: boolean): void }` },
      { file: "y.d.ts", text: `interface Shim { SetHidden: (this: void, h: boolean) => void }` },
    ])
    expect(set.has("SetHidden")).toBe(false)
  })
})

describe("isReservationSource (reservation-source predicate)", () => {
  test("a core `types/eso/` declaration is a reservation source", () => {
    expect(isReservationSource("temper/addons/types/eso/ui.d.ts")).toBe(true)
    expect(
      isReservationSource("temper/addons/types/eso/reserved-colon-methods.d.ts")
    ).toBe(true)
  })

  test("every addon-local `eso-*.d.ts` is a reservation source at any depth (#12934)", () => {
    expect(isReservationSource("packages/temper/addons/iifa/src/types/eso-gaps.d.ts")).toBe(true)
    expect(isReservationSource("packages/temper/addons/craftstore/src/types/eso-gaps.d.ts")).toBe(
      true
    )
    expect(
      isReservationSource(
        "temper/game-navigation-addon/src/votans-minimap/types/eso-local.d.ts"
      )
    ).toBe(true)
    expect(isReservationSource("packages/temper/addons/lib-price/src/types/eso-ext.d.ts")).toBe(
      true
    )
    expect(isReservationSource("packages/temper/addons/x/src/types/eso-gaps-extra.d.ts")).toBe(true)
  })

  test("a non-`eso-*.d.ts` addon declaration is NOT a reservation source", () => {
    expect(isReservationSource("packages/temper/addons/iifa/src/measuring-label.ts")).toBe(false)
    expect(isReservationSource("packages/temper/addons/x/src/types/my-eso-gaps.d.ts")).toBe(false)
    expect(isReservationSource("packages/temper/addons/x/src/eso-helpers.ts")).toBe(false)
  })
})

describe("collectColonMethodNames (eso-gaps reservation seal)", () => {
  const IIFA_GAPS = "packages/temper/addons/iifa/src/types/eso-gaps.d.ts"
  const IIFA_SIBLING = "packages/temper/addons/iifa/src/measuring-label.ts"

  const wireGetStringWidth = () =>
    collectColonMethodNames([
      {
        file: IIFA_GAPS,
        text: `interface LabelControl { GetStringWidth(text?: string): number }`,
        core: isReservationSource(IIFA_GAPS),
      },
      {
        file: IIFA_SIBLING,
        text: `interface MeasuringLabel { GetStringWidth: (this: void, text?: string) => number }`,
        core: isReservationSource(IIFA_SIBLING),
      },
    ])

  test("an eso-gaps colon-method survives a sibling `this: void` cast-view shim", () => {
    expect(wireGetStringWidth().has("GetStringWidth")).toBe(true)
  })

  test("would-have-caught: the surviving name flags the IIfA-shape dot-call", () => {
    const issues = scanBundle(
      `local w = asMeasuringLabel(lbl).GetStringWidth("Inventory")`,
      "IIfA.lua",
      wireGetStringWidth(),
      []
    )
    expect(issues).toHaveLength(1)
    expect(issues[0]?.method).toBe("GetStringWidth")
  })

  test("pre-seal contrast: WITHOUT the eso-gaps reservation the shim subtracts it (the blind-spot)", () => {
    const blind = collectColonMethodNames([
      {
        file: IIFA_GAPS,
        text: `interface LabelControl { GetStringWidth(text?: string): number }`,
        core: false,
      },
      {
        file: IIFA_SIBLING,
        text: `interface MeasuringLabel { GetStringWidth: (this: void, text?: string) => number }`,
        core: false,
      },
    ])
    expect(blind.has("GetStringWidth")).toBe(false)
  })

  test("a genuine free-function static still subtracts an eso-gaps-reserved name", () => {
    const set = collectColonMethodNames([
      {
        file: IIFA_GAPS,
        text: `interface LabelControl { GetStringWidth(text?: string): number }`,
        core: isReservationSource(IIFA_GAPS),
      },
      {
        file: IIFA_SIBLING,
        text: `declare function GetStringWidth(text: string): number`,
        core: isReservationSource(IIFA_SIBLING),
      },
    ])
    expect(set.has("GetStringWidth")).toBe(false)
  })

  test("an eso-gaps `this: void` property-arrow does NOT enter the colon set; a method-signature does", () => {
    const GAPS = "packages/temper/addons/craftstore/src/types/eso-gaps.d.ts"
    const propertyArrowShim = collectColonMethodNames([
      {
        file: GAPS,
        text: `interface TamrielTradeCentrePriceApi { AppendPriceInfo: (this: void, t: unknown, i: unknown) => void }`,
        core: isReservationSource(GAPS),
      },
    ])
    expect(propertyArrowShim.has("AppendPriceInfo")).toBe(false)
    const methodSignature = collectColonMethodNames([
      {
        file: GAPS,
        text: `interface TamrielTradeCentrePriceApi { AppendPriceInfo(t: unknown, i: unknown): void }`,
        core: isReservationSource(GAPS),
      },
    ])
    expect(methodSignature.has("AppendPriceInfo")).toBe(true)
  })
})
