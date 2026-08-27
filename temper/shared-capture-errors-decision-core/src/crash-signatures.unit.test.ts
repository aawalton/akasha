import { describe, expect, it } from "bun:test"
import { crashSignatureKey, inferCulpritAddon } from "./crash-signatures"

const LIVE_CRAFTSTORE_MESSAGES: readonly string[] = [
  "CraftStoreFixed_ButtonFrameButton_MouseExit:2: function expected instead of nil",
  "CraftStoreFixed_CookCategoryButton14_Clicked:2: function expected instead of nil",
  "CraftStoreFixed_CookCategoryButton3_Clicked:2: function expected instead of nil",
  "CraftStoreFixed_CookCategoryButton4_Clicked:2: function expected instead of nil",
  "CraftStoreFixed_CookCategoryButton5_Clicked:2: function expected instead of nil",
  "CraftStoreFixed_CookCategoryButton7_Clicked:2: function expected instead of nil",
  "CraftStoreFixed_CookSpaceButton_MouseEnter:2: function expected instead of nil",
]

describe("inferCulpritAddon", () => {
  for (const message of LIVE_CRAFTSTORE_MESSAGES) {
    it(`maps the live CraftStoreFixed family to TemperCrafting: ${message.slice(0, 40)}…`, () => {
      expect(inferCulpritAddon(message, undefined)).toBe("TemperCrafting")
    })
  }

  it("maps the renamed TemperCrafting_* handler epoch to TemperCrafting", () => {
    expect(
      inferCulpritAddon(
        "TemperCrafting_CookCategoryButton14_Clicked:2: function expected instead of nil",
        undefined
      )
    ).toBe("TemperCrafting")
  })

  it("matches when the signature is only in the traceback, not the message", () => {
    expect(
      inferCulpritAddon(
        "some wrapped message",
        "stack traceback:\n\tCraftStoreFixed_CookSpaceButton_MouseEnter:2: function expected instead of nil"
      )
    ).toBe("TemperCrafting")
  })

  it("requires BOTH the handler token and the nil-function phrase (no over-match)", () => {
    expect(
      inferCulpritAddon("CraftStoreFixed_X:2: attempt to index a nil value", undefined)
    ).toBeUndefined()
    expect(
      inferCulpritAddon("SomeOtherHandler:2: function expected instead of nil", undefined)
    ).toBeUndefined()
  })

  it("returns undefined for an unrelated attributable error", () => {
    expect(
      inferCulpritAddon(
        "user:/AddOns/IIfA/IIfA.lua:5226: attempt to index a nil value",
        "stack traceback:\n\tuser:/AddOns/IIfA/IIfA.lua:5226: in function 'foo'"
      )
    ).toBeUndefined()
  })

  it("returns undefined for a null/empty traceback with an empty message", () => {
    expect(inferCulpritAddon("", null)).toBeUndefined()
  })
})

interface CrashSite {
  readonly name: string
  readonly message: string
  readonly traceback: string
}

const COOK_BUTTON_14: CrashSite = {
  name: "craftstore-cook",
  message: "CraftStoreFixed_CookCategoryButton14_Clicked:2: function expected instead of nil",
  traceback:
    'stack traceback:\n\tCraftStoreFixed_CookCategoryButton14_Clicked:2: in function "(main chunk)"',
}
const COOK_BUTTON_3: CrashSite = {
  name: "craftstore-cook-other-index",
  message: "CraftStoreFixed_CookCategoryButton3_Clicked:2: function expected instead of nil",
  traceback:
    'stack traceback:\n\tCraftStoreFixed_CookCategoryButton3_Clicked:2: in function "(main chunk)"',
}

const IIFA_HOUSING: CrashSite = {
  name: "iifa-housing",
  message:
    "user:/AddOns/LibAsync/LibAsync.lua:865: /EsoUI/Ingame/HousingEditor/HousingEditorHud.lua:126: attempt to index a nil value",
  traceback:
    "stack traceback:\n\tuser:/AddOns/LibAsync/LibAsync.lua:865: in function 'p'\n\tuser:/AddOns/IIfA/IIfA.lua:5226: in function '____exports.IsFurnitureVaultUnavailable'",
}

const INVENTORY_TAB_SWITCH: CrashSite = {
  name: "inventory-tab-switch",
  message: "/EsoUI/Ingame/Inventory/Inventory.lua:1596: attempt to index a nil value",
  traceback:
    "stack traceback:\n\t/EsoUI/Ingame/Inventory/Inventory.lua:1596: in function 'ZO_InventoryManager:GetTabFilterInfo'\n\tuser:/AddOns/Temper/TemperMasterWritInventoryMarker.lua:475: in function 'GetTabFilterInfo'\n\t/EsoUI/Ingame/Inventory/Inventory.lua:1634: in function 'ZO_InventoryManager:ChangeFilter'\n\tZO_MenuBar:305: in function 'MenuBarButton:Release'",
}
const INVENTORY_MAIN_MENU: CrashSite = {
  name: "inventory-main-menu",
  message: "/EsoUI/Ingame/Inventory/Inventory.lua:1596: attempt to index a nil value",
  traceback:
    "stack traceback:\n\t/EsoUI/Ingame/Inventory/Inventory.lua:1596: in function 'ZO_InventoryManager:GetTabFilterInfo'\n\tuser:/AddOns/Temper/TemperMasterWritInventoryMarker.lua:475: in function 'GetTabFilterInfo'\n\tZO_MainMenuCategoryBarButton1_MouseUp:3: in function \"(main chunk)\"",
}

const CRAFTSTORE_HOVER: CrashSite = {
  name: "craftstore-hover",
  message: "CraftStoreFixed_ButtonFrameButton_MouseEnter:2: function expected instead of nil",
  traceback:
    'stack traceback:\n\tCraftStoreFixed_ButtonFrameButton_MouseEnter:2: in function "(main chunk)"',
}

const POTION_MAKER: CrashSite = {
  name: "potion-maker",
  message:
    "/EsoUI/Libraries/ZO_KeybindStrip/ZO_KeybindStrip.lua:516: function expected instead of nil",
  traceback:
    "stack traceback:\n/EsoUI/Libraries/ZO_KeybindStrip/ZO_KeybindStrip.lua:516: in function 'ZO_KeybindStrip:HasKeybindButtonGroup'\nuser:/AddOns/TemperPotionMaker/TemperPotionMaker.lua:1260: in function '____exports.UpdateKeyStrip'\nuser:/AddOns/TemperPotionMaker/TemperPotionMaker.lua:2601: in function 'hookFunction'\n/EsoUI/Libraries/Utility/ZO_Hook.lua:18: in function 'SetClickedButton'\n/EsoUI/Libraries/ZO_MenuBar/ZO_MenuBar.lua:618: in function 'MenuBar:SelectDescriptor'\n(tail call): ?\n(tail call): ?\nuser:/AddOns/TemperPotionMaker/TemperPotionMaker.lua:1530: in function 'interactWithAlchemyStation'",
}
const POTION_MAKER_LINE_DRIFT: CrashSite = {
  name: "potion-maker-line-drift",
  message:
    "/EsoUI/Libraries/ZO_KeybindStrip/ZO_KeybindStrip.lua:516: function expected instead of nil",
  traceback:
    "stack traceback:\n/EsoUI/Libraries/ZO_KeybindStrip/ZO_KeybindStrip.lua:516: in function 'ZO_KeybindStrip:HasKeybindButtonGroup'\nuser:/AddOns/TemperPotionMaker/TemperPotionMaker.lua:1262: in function '____exports.UpdateKeyStrip'",
}

const FIVE_COLLIDING_SITES: readonly CrashSite[] = [
  COOK_BUTTON_14,
  IIFA_HOUSING,
  INVENTORY_TAB_SWITCH,
  CRAFTSTORE_HOVER,
  POTION_MAKER,
]

const keyOf = (site: CrashSite): string => crashSignatureKey(site.message, site.traceback)

describe("crashSignatureKey", () => {
  it("yields 5 DISTINCT keys for the 5 sites that all shared eventCode 65543", () => {
    const keys = FIVE_COLLIDING_SITES.map(keyOf)
    expect(new Set(keys).size).toBe(FIVE_COLLIDING_SITES.length)
  })

  it("collapses same-site recurrences: CraftStore Cook button index drift", () => {
    expect(keyOf(COOK_BUTTON_14)).toBe(keyOf(COOK_BUTTON_3))
  })

  it("collapses same-site recurrences: Inventory two entry paths, one site", () => {
    expect(keyOf(INVENTORY_TAB_SWITCH)).toBe(keyOf(INVENTORY_MAIN_MENU))
  })

  it("collapses same-site recurrences: TemperPotionMaker line-number drift", () => {
    expect(keyOf(POTION_MAKER)).toBe(keyOf(POTION_MAKER_LINE_DRIFT))
  })

  it("keeps the two CraftStoreFixed handlers (Cook vs hover) as distinct sites", () => {
    expect(keyOf(COOK_BUTTON_14)).not.toBe(keyOf(CRAFTSTORE_HOVER))
  })

  it("is stable for a null/empty traceback (falls back to the message alone)", () => {
    const a = crashSignatureKey("some lost-traceback error", null)
    const b = crashSignatureKey("some lost-traceback error", undefined)
    expect(a).toBe(b)
    expect(a).not.toBe(crashSignatureKey("a different error", null))
  })
})
