import { expect, test } from "bun:test"
import { heavy } from "akasha/temper/catalog/gear/temper-armor-weight/pages/heavy/heavy.temper-armor-weight.ts"
import { light } from "akasha/temper/catalog/gear/temper-armor-weight/pages/light/light.temper-armor-weight.ts"
import { medium } from "akasha/temper/catalog/gear/temper-armor-weight/pages/medium/medium.temper-armor-weight.ts"
import { noWeight } from "akasha/temper/catalog/gear/temper-armor-weight/pages/no-weight/no-weight.temper-armor-weight.ts"
import { shield } from "akasha/temper/catalog/gear/temper-armor-weight/pages/shield/shield.temper-armor-weight.ts"
import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"
import { axe } from "akasha/temper/catalog/gear/temper-weapon-type/pages/axe/axe.temper-weapon-type.ts"
import { battleaxe } from "akasha/temper/catalog/gear/temper-weapon-type/pages/battleaxe/battleaxe.temper-weapon-type.ts"
import { bow } from "akasha/temper/catalog/gear/temper-weapon-type/pages/bow/bow.temper-weapon-type.ts"
import { dagger } from "akasha/temper/catalog/gear/temper-weapon-type/pages/dagger/dagger.temper-weapon-type.ts"
import { greatsword } from "akasha/temper/catalog/gear/temper-weapon-type/pages/greatsword/greatsword.temper-weapon-type.ts"
import { iceStaff } from "akasha/temper/catalog/gear/temper-weapon-type/pages/ice-staff/ice-staff.temper-weapon-type.ts"
import { infernoStaff } from "akasha/temper/catalog/gear/temper-weapon-type/pages/inferno-staff/inferno-staff.temper-weapon-type.ts"
import { lightningStaff } from "akasha/temper/catalog/gear/temper-weapon-type/pages/lightning-staff/lightning-staff.temper-weapon-type.ts"
import { mace } from "akasha/temper/catalog/gear/temper-weapon-type/pages/mace/mace.temper-weapon-type.ts"
import { maul } from "akasha/temper/catalog/gear/temper-weapon-type/pages/maul/maul.temper-weapon-type.ts"
import { noType } from "akasha/temper/catalog/gear/temper-weapon-type/pages/no-type/no-type.temper-weapon-type.ts"
import { restorationStaff } from "akasha/temper/catalog/gear/temper-weapon-type/pages/restoration-staff/restoration-staff.temper-weapon-type.ts"
import { sword } from "akasha/temper/catalog/gear/temper-weapon-type/pages/sword/sword.temper-weapon-type.ts"
import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"

const WEAPON_TYPES: readonly TemperWeaponType[] = [
  axe,
  battleaxe,
  bow,
  dagger,
  greatsword,
  iceStaff,
  infernoStaff,
  lightningStaff,
  mace,
  maul,
  noType,
  restorationStaff,
  sword,
]

const ARMOR_WEIGHTS: readonly TemperArmorWeight[] = [heavy, light, medium, noWeight, shield]

test("the weapon type pages offer the twelve weapon types the search filter offered by hand", () => {
  expect(numberedOptions(WEAPON_TYPES, (row) => row.esoWeaponTypeNumber)).toEqual([
    { value: "1", label: "Axe" },
    { value: "2", label: "Mace" },
    { value: "3", label: "Sword" },
    { value: "4", label: "Greatsword" },
    { value: "5", label: "Battleaxe" },
    { value: "6", label: "Maul" },
    { value: "8", label: "Bow" },
    { value: "9", label: "Restoration Staff" },
    { value: "11", label: "Dagger" },
    { value: "12", label: "Inferno Staff" },
    { value: "13", label: "Ice Staff" },
    { value: "15", label: "Lightning Staff" },
  ])
})

test("the armor weight pages offer the three weights the search filter offered by hand", () => {
  expect(numberedOptions(ARMOR_WEIGHTS, (row) => row.armorType)).toEqual([
    { value: "1", label: "Light" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Heavy" },
  ])
})

test("a page numbered 0 or stating no number is no option, and the rest go by number", () => {
  expect(
    numberedOptions(
      [
        { title: "Two", number: 2 },
        { title: "None", number: 0 },
        { title: "Unnumbered", number: undefined },
        { number: 3 },
        { title: "One", number: 1 },
      ],
      (row) => row.number
    )
  ).toEqual([
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
  ])
})
