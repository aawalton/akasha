import { expect, test } from "bun:test"
import type { WeaponSlot } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  weaponAttackOf,
  weaponStyleOf,
} from "akasha/temper/player/character/stat/modules/weapon-attacks/weapon-attacks.module.code.ts"

const EMPTY = { itemType: "empty", data: null } as const

function held(type: string): WeaponSlot["main-hand"] {
  return {
    itemType: "weapon",
    data: {
      type,
      set: "no-set",
      trait: "no-trait",
      enchantment: "no-enchant",
      poison: "no-poison",
    },
  } as WeaponSlot["main-hand"]
}

const SHIELD = { itemType: "shield", data: { type: "shield" } } as WeaponSlot["off-hand"]

const ERIN = { magickaMaximum: 14657, staminaMaximum: 16697, powerWeapon: 4021, powerSpell: 4021 }

test("a one-handed weapon with a shield is that style, and two one-handed weapons are dual wield", () => {
  expect(weaponStyleOf({ "main-hand": held("sword"), "off-hand": SHIELD })).toBe("one-hand")
  expect(weaponStyleOf({ "main-hand": held("axe"), "off-hand": held("dagger") })).toBe("dual-wield")
  expect(weaponStyleOf({ "main-hand": held("maul"), "off-hand": EMPTY })).toBe("two-handed")
  expect(weaponStyleOf({ "main-hand": held("ice-staff"), "off-hand": EMPTY })).toBe("ice-staff")
})

test("a bar with no weapon in the main hand has no style and its attacks deal nothing", () => {
  const style = weaponStyleOf({ "main-hand": EMPTY, "off-hand": SHIELD })
  expect(style).toBeUndefined()
  expect(weaponAttackOf(style, ERIN)).toEqual({ light: 0, heavy: 0 })
})

test("an attack scales off the higher max stat and the higher power", () => {
  const attack = weaponAttackOf("one-hand", ERIN)
  expect(attack.light).toBeCloseTo(0.05 * 16697 + 0.525 * 4021)
  expect(attack.heavy).toBeCloseTo(0.0665825 * 16697 + 0.700291 * 4021 - 0.315486)
})

test("a heavy attack deals every damage line it has once", () => {
  const dual = weaponAttackOf("dual-wield", ERIN).heavy
  expect(dual).toBeCloseTo(2 * (0.0238667 * 16697 + 0.249732 * 4021 - 1.11937))
})
