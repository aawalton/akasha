import { beforeAll, describe, expect, it } from "bun:test"
import { base64urlToBytes } from "@temper/game-codec/binary-utils"
import { decodeCompanion, encodeCompanion } from "@temper/game-codec/companions/companion-codec"
import {
  createEmptyCompanion,
  createEquipmentForBaseRoles,
} from "@temper/game-companions-core/companion-factory"
import type { CompanionState } from "@temper/game-companions-core/companion-types"
import { BuildHash } from "@temper/shared-formula-framework/branded"

const ESO_ENUM_GLOBALS = [
  "EQUIP_SLOT_HEAD",
  "EQUIP_SLOT_SHOULDERS",
  "EQUIP_SLOT_CHEST",
  "EQUIP_SLOT_HAND",
  "EQUIP_SLOT_WAIST",
  "EQUIP_SLOT_LEGS",
  "EQUIP_SLOT_FEET",
  "EQUIP_SLOT_NECK",
  "EQUIP_SLOT_RING1",
  "EQUIP_SLOT_RING2",
  "EQUIP_SLOT_MAIN_HAND",
  "EQUIP_SLOT_OFF_HAND",
  "BAG_COMPANION_WORN",
  "LINK_STYLE_DEFAULT",
  "HOTBAR_CATEGORY_COMPANION",
  "ARMORTYPE_NONE",
  "ARMORTYPE_LIGHT",
  "ARMORTYPE_MEDIUM",
  "ARMORTYPE_HEAVY",
  "ITEM_DISPLAY_QUALITY_TRASH",
  "ITEM_DISPLAY_QUALITY_NORMAL",
  "ITEM_DISPLAY_QUALITY_MAGIC",
  "ITEM_DISPLAY_QUALITY_ARCANE",
  "ITEM_DISPLAY_QUALITY_ARTIFACT",
  "ITEM_DISPLAY_QUALITY_LEGENDARY",
  "ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE",
  "ITEM_TRAIT_TYPE_NONE",
  "ITEM_TRAIT_TYPE_ARMOR_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_ARMOR_AUGMENTED",
  "ITEM_TRAIT_TYPE_ARMOR_BOLSTERED",
  "ITEM_TRAIT_TYPE_ARMOR_FOCUSED",
  "ITEM_TRAIT_TYPE_ARMOR_PROLIFIC",
  "ITEM_TRAIT_TYPE_ARMOR_QUICKENED",
  "ITEM_TRAIT_TYPE_ARMOR_SHATTERING",
  "ITEM_TRAIT_TYPE_ARMOR_SOOTHING",
  "ITEM_TRAIT_TYPE_ARMOR_VIGOROUS",
  "ITEM_TRAIT_TYPE_JEWELRY_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_JEWELRY_AUGMENTED",
  "ITEM_TRAIT_TYPE_JEWELRY_BOLSTERED",
  "ITEM_TRAIT_TYPE_JEWELRY_FOCUSED",
  "ITEM_TRAIT_TYPE_JEWELRY_PROLIFIC",
  "ITEM_TRAIT_TYPE_JEWELRY_QUICKENED",
  "ITEM_TRAIT_TYPE_JEWELRY_SHATTERING",
  "ITEM_TRAIT_TYPE_JEWELRY_SOOTHING",
  "ITEM_TRAIT_TYPE_JEWELRY_VIGOROUS",
  "ITEM_TRAIT_TYPE_WEAPON_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_WEAPON_AUGMENTED",
  "ITEM_TRAIT_TYPE_WEAPON_BOLSTERED",
  "ITEM_TRAIT_TYPE_WEAPON_FOCUSED",
  "ITEM_TRAIT_TYPE_WEAPON_PROLIFIC",
  "ITEM_TRAIT_TYPE_WEAPON_QUICKENED",
  "ITEM_TRAIT_TYPE_WEAPON_SHATTERING",
  "ITEM_TRAIT_TYPE_WEAPON_SOOTHING",
  "ITEM_TRAIT_TYPE_WEAPON_VIGOROUS",
  "WEAPONTYPE_NONE",
  "WEAPONTYPE_AXE",
  "WEAPONTYPE_HAMMER",
  "WEAPONTYPE_SWORD",
  "WEAPONTYPE_DAGGER",
  "WEAPONTYPE_TWO_HANDED_SWORD",
  "WEAPONTYPE_TWO_HANDED_AXE",
  "WEAPONTYPE_TWO_HANDED_HAMMER",
  "WEAPONTYPE_BOW",
  "WEAPONTYPE_FIRE_STAFF",
  "WEAPONTYPE_FROST_STAFF",
  "WEAPONTYPE_LIGHTNING_STAFF",
  "WEAPONTYPE_HEALING_STAFF",
  "WEAPONTYPE_SHIELD",
] as const

type Encode = typeof import("./companion-codec").encodeCompanionBuild
type Decode = typeof import("./companion-decoder").decodeCompanionBuild

let encodeCompanionBuild: Encode
let decodeCompanionBuild: Decode

beforeAll(async () => {
  Object.assign(globalThis, {
    BitAnd: (a: number, b: number) => (a & b) >>> 0,
    BitOr: (a: number, b: number) => (a | b) >>> 0,
    BitLShift: (a: number, b: number) => (a << b) >>> 0,
    BitRShift: (a: number, b: number) => a >>> b,
    string: { len: (s: string) => s.length },
  })
  Object.assign(globalThis, Object.fromEntries(ESO_ENUM_GLOBALS.map((name, i) => [name, i + 1])))
  encodeCompanionBuild = (await import("./companion-codec")).encodeCompanionBuild
  decodeCompanionBuild = (await import("./companion-decoder")).decodeCompanionBuild
})

function assertPayloadIdentical(a: string, b: string): undefined {
  const ba = base64urlToBytes(a)
  const bb = base64urlToBytes(b)
  expect(ba).not.toBeNull()
  expect(bb).not.toBeNull()
  if (!ba || !bb) return
  expect(ba.length).toBe(bb.length)
  for (let i = 0; i < ba.length; i++) {
    if (i === 1) continue
    expect(ba[i]).toBe(bb[i])
  }
}

function makeWebFixture(): CompanionState {
  const state = createEmptyCompanion()
  state.companion.id = "bastian"
  state.equipment = createEquipmentForBaseRoles(["dps"])
  state.target.armor = "dungeon"
  state.target.targetHealth = "execute"
  return state
}

describe("companion codec — cross-impl byte-round-trip (addon ↔ web)", () => {
  it("web-encode → addon-decode → addon-re-encode is byte-identical (web → addon)", () => {
    const webHash = encodeCompanion(makeWebFixture())

    const addonBuild = decodeCompanionBuild(webHash)
    expect(addonBuild).toBeDefined()
    if (!addonBuild) return

    const addonHash = encodeCompanionBuild(addonBuild)
    assertPayloadIdentical(addonHash, webHash)
  })

  it("addon-encode → web-decode succeeds and re-encodes to the web canonical (addon → web)", () => {
    const webFixture = makeWebFixture()
    const webHash = encodeCompanion(webFixture)

    const addonBuild = decodeCompanionBuild(webHash)
    expect(addonBuild).toBeDefined()
    if (!addonBuild) return
    const addonHash = encodeCompanionBuild(addonBuild)

    const webState = decodeCompanion(BuildHash(addonHash))
    expect(webState).not.toBeNull()
    if (!webState) return

    expect(webState.companion.id).toBe(webFixture.companion.id)
    expect(webState.target.armor).toBe("dungeon")
    expect(webState.target.targetHealth).toBe("execute")
    expect(webState.skills).toEqual(webFixture.skills)
    expect(webState.equipment.armor).toEqual(webFixture.equipment.armor)
    expect(webState.equipment.jewelry).toEqual(webFixture.equipment.jewelry)

    assertPayloadIdentical(encodeCompanion(webState), webHash)
  })

  it("both impls stamp minor version 8 (reconciled layout)", () => {
    const webHash = encodeCompanion(makeWebFixture())
    const webBytes = base64urlToBytes(webHash)
    expect(webBytes?.[2]).toBe(8)

    const addonBuild = decodeCompanionBuild(webHash)
    expect(addonBuild).toBeDefined()
    if (!addonBuild) return
    const addonBytes = base64urlToBytes(encodeCompanionBuild(addonBuild))
    expect(addonBytes?.[2]).toBe(8)
  })
})
