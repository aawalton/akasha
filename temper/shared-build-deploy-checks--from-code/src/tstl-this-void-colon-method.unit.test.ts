import { describe, expect, test } from "bun:test"
import { scanThisVoidColonMethodsText } from "./tstl-this-void-colon-method"
import { isBaseGameReceiverSurface } from "./tstl-this-void-colon-method.manifest"

const AUTH: ReadonlySet<string> = new Set([
  "GetDataSource",
  "FireCallbacks",
  "ResetAllSearchData",
  "Clear",
  "Commit",
  "UpdateAnchors",
  "Send",
  "RegisterCallback",
  "HasUnlockedFurnitureVault",
  "New",
])

const BASE_GAME: ReadonlySet<string> = new Set([
  "WORLD_MAP_SCENE",
  "HOUSING_EDITOR_STATE",
  "ZO_KeyboardOptions",
])

function methods(text: string): readonly string[] {
  return scanThisVoidColonMethodsText(text, "eso-gaps.d.ts", AUTH, BASE_GAME).map((f) => f.method)
}

describe("scanThisVoidColonMethods — positives (the self-drop bug shape)", () => {
  test("flags a `this: void` method signature whose name is a base-game colon method", () => {
    expect(methods("interface Row { GetDataSource(this: void): Src }")).toEqual(["GetDataSource"])
  })

  test("flags a `this: void` method on a `declare const` type-literal (direct member)", () => {
    expect(
      methods("declare const TRADING_HOUSE_SEARCH: { ResetAllSearchData(this: void): void }")
    ).toEqual(["ResetAllSearchData"])
  })

  test("flags every distinct anchor name when each is a direct interface member", () => {
    const src = `interface MailList {
      Clear(this: void): void
      Commit(this: void): void
      UpdateAnchors(this: void, ...args: unknown[]): void
    }`
    expect(new Set(methods(src))).toEqual(new Set(["Clear", "Commit", "UpdateAnchors"]))
  })
})

describe("scanThisVoidColonMethods — property-arrow shape on a base-game global (#13325)", () => {
  test("flags a `this: void` property-arrow with named params on a base-game `declare const` receiver", () => {
    expect(
      methods(
        "declare const WORLD_MAP_SCENE: { RegisterCallback: (this: void, event: string) => void }"
      )
    ).toEqual(["RegisterCallback"])
  })

  test("flags a `this: void` property-arrow with ZERO params on a base-game receiver (#13321)", () => {
    expect(
      methods(
        "declare const HOUSING_EDITOR_STATE: { HasUnlockedFurnitureVault: (this: void) => boolean }"
      )
    ).toEqual(["HasUnlockedFurnitureVault"])
  })

  test("Layer 1 still applies to the property shape: explicit `self` receiver is the factory idiom", () => {
    expect(
      methods("declare const WORLD_MAP_SCENE: { New: (this: void, self: object) => object }")
    ).toEqual([])
  })

  test("a `this: <non-void>` property-arrow on a base-game receiver is the correct colon form", () => {
    expect(
      methods(
        "declare const WORLD_MAP_SCENE: { RegisterCallback: (this: object, event: string) => void }"
      )
    ).toEqual([])
  })
})

describe("scanThisVoidColonMethods — negatives by layer", () => {
  test("Layer 1: explicit `self`-named receiver param is the factory idiom (not flagged)", () => {
    expect(methods("interface ZO_Object { New(this: void, self: object): ZO_Object }")).toEqual([])
  })

  test("Layer 1: explicit `object`-typed first param is the factory idiom (not flagged)", () => {
    expect(methods("interface Mgr { New(this: void, base: object): Mgr }")).toEqual([])
  })

  test("Layer 4 (property provenance): a property-arrow on a NON-base-game receiver is excluded", () => {
    expect(methods("interface Frag { GetDataSource: (this: void) => Src }")).toEqual([])
  })

  test("Layer 4 (property provenance): a third-party `declare const` receiver is excluded", () => {
    expect(methods("declare const LibFoo: { GetDataSource: (this: void) => Src }")).toEqual([])
  })

  test("Layer 3 (property forward-hook): a single `...args` rest after `this` is a pass-through wrapper", () => {
    expect(
      methods(
        "declare const ZO_KeyboardOptions: { UpdateAnchors: (this: void, ...args: unknown[]) => void }"
      )
    ).toEqual([])
  })

  test("Layer 4 (method-sig): a `this: void` method nested in a property's util-namespace literal is excluded", () => {
    expect(methods("interface FurC { Utils: { GetDataSource(this: void): Src } }")).toEqual([])
  })

  test("authority miss: a `this: void` method whose name is not a base-game colon method is ignored", () => {
    expect(methods("interface Own { RefreshLocalState(this: void): void }")).toEqual([])
  })

  test("a `this: <non-void>` self is the correct colon form (not flagged)", () => {
    expect(methods("interface Row { GetDataSource(this: Row): Src }")).toEqual([])
  })

  test("a method with no `this` param (colon method-shorthand) is the correct form (not flagged)", () => {
    expect(methods("interface Row { GetDataSource(): Src }")).toEqual([])
  })
})

describe("isBaseGameReceiverSurface — Layer 2 file selection", () => {
  test.each([
    "packages/temper/addons/x/src/types/eso/ui.d.ts",
    "packages/temper/addons/x/src/types/eso-gaps.d.ts",
    "packages/temper/addons/x/src/types/eso-mail-ext.d.ts",
    "packages/temper/addons/x/src/types/eso-keybindings.d.ts",
    "packages/temper/addons/x/src/globals.d.ts",
    "types/eso/globals.d.ts",
  ])("base-game receiver surface: %s", (p) => {
    expect(isBaseGameReceiverSurface(p)).toBe(true)
  })

  test.each([
    "packages/temper/addons/x/src/postmaster-api.d.ts",
    "packages/temper/addons/x/src/types/domain.d.ts",
    "packages/temper/addons/x/src/index.ts",
    "packages/temper/addons/x/src/types/lib-eso.d.ts",
  ])("not a base-game receiver surface: %s", (p) => {
    expect(isBaseGameReceiverSurface(p)).toBe(false)
  })
})
