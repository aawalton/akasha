import { expect, test } from "bun:test"
import { heavy } from "akasha/temper/catalog/gear/temper-armor-weight/pages/heavy/heavy.temper-armor-weight.ts"
import { light } from "akasha/temper/catalog/gear/temper-armor-weight/pages/light/light.temper-armor-weight.ts"
import { medium } from "akasha/temper/catalog/gear/temper-armor-weight/pages/medium/medium.temper-armor-weight.ts"
import { noWeight } from "akasha/temper/catalog/gear/temper-armor-weight/pages/no-weight/no-weight.temper-armor-weight.ts"
import { shield } from "akasha/temper/catalog/gear/temper-armor-weight/pages/shield/shield.temper-armor-weight.ts"
import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"
import { chest } from "akasha/temper/catalog/gear/temper-equip-type/pages/chest.temper-equip-type.ts"
import { feet } from "akasha/temper/catalog/gear/temper-equip-type/pages/feet.temper-equip-type.ts"
import { hands } from "akasha/temper/catalog/gear/temper-equip-type/pages/hands.temper-equip-type.ts"
import { head } from "akasha/temper/catalog/gear/temper-equip-type/pages/head.temper-equip-type.ts"
import { legs } from "akasha/temper/catalog/gear/temper-equip-type/pages/legs.temper-equip-type.ts"
import { mainHand } from "akasha/temper/catalog/gear/temper-equip-type/pages/main-hand.temper-equip-type.ts"
import { neck } from "akasha/temper/catalog/gear/temper-equip-type/pages/neck.temper-equip-type.ts"
import { offHand } from "akasha/temper/catalog/gear/temper-equip-type/pages/off-hand.temper-equip-type.ts"
import { oneHand } from "akasha/temper/catalog/gear/temper-equip-type/pages/one-hand.temper-equip-type.ts"
import { poison } from "akasha/temper/catalog/gear/temper-equip-type/pages/poison.temper-equip-type.ts"
import { ring } from "akasha/temper/catalog/gear/temper-equip-type/pages/ring.temper-equip-type.ts"
import { shoulders } from "akasha/temper/catalog/gear/temper-equip-type/pages/shoulders.temper-equip-type.ts"
import { twoHand } from "akasha/temper/catalog/gear/temper-equip-type/pages/two-hand.temper-equip-type.ts"
import { waist } from "akasha/temper/catalog/gear/temper-equip-type/pages/waist.temper-equip-type.ts"
import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"
import { epic } from "akasha/temper/catalog/gear/temper-quality/pages/epic.temper-quality.ts"
import { fine } from "akasha/temper/catalog/gear/temper-quality/pages/fine.temper-quality.ts"
import { legendary } from "akasha/temper/catalog/gear/temper-quality/pages/legendary.temper-quality.ts"
import { mythic } from "akasha/temper/catalog/gear/temper-quality/pages/mythic.temper-quality.ts"
import { noQuality } from "akasha/temper/catalog/gear/temper-quality/pages/no-quality.temper-quality.ts"
import { normal } from "akasha/temper/catalog/gear/temper-quality/pages/normal.temper-quality.ts"
import { superior } from "akasha/temper/catalog/gear/temper-quality/pages/superior.temper-quality.ts"
import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"
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
import {
  gameNamedOptions,
  numberedOptions,
} from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"

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
    { value: "5", label: "Battle Axe" },
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

const EQUIP_TYPES: readonly TemperEquipType[] = [
  chest,
  feet,
  hands,
  head,
  legs,
  mainHand,
  neck,
  offHand,
  oneHand,
  poison,
  ring,
  shoulders,
  twoHand,
  waist,
]

test("the equip type pages offer the slots the filter offered by hand, with Hands and Poison as the game names them", () => {
  expect(numberedOptions(EQUIP_TYPES, (row) => row.equipType)).toEqual([
    { value: "1", label: "Head" },
    { value: "2", label: "Neck" },
    { value: "3", label: "Chest" },
    { value: "4", label: "Shoulders" },
    { value: "5", label: "One Hand" },
    { value: "6", label: "Two Hand" },
    { value: "7", label: "Off Hand" },
    { value: "8", label: "Waist" },
    { value: "9", label: "Legs" },
    { value: "10", label: "Feet" },
    { value: "12", label: "Ring" },
    { value: "13", label: "Hands" },
    { value: "14", label: "Main Hand" },
    { value: "15", label: "Poison" },
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

test("the quality pages offer the six qualities the filter offered by hand, and Mythic after them", () => {
  const qualities: readonly TemperQuality[] = [
    epic,
    fine,
    legendary,
    mythic,
    noQuality,
    normal,
    superior,
  ]
  expect(
    gameNamedOptions(
      qualities,
      (row) => row.esoDisplayQuality,
      (row) => row.gameName
    )
  ).toEqual([
    { value: "0", label: "Trash" },
    { value: "1", label: "Normal" },
    { value: "2", label: "Fine" },
    { value: "3", label: "Superior" },
    { value: "4", label: "Epic" },
    { value: "5", label: "Legendary" },
    { value: "6", label: "Mythic" },
  ])
})

test("a game-named option may be numbered 0, and a row naming no number or no name is no option", () => {
  expect(
    gameNamedOptions(
      [
        { name: "One", number: 1 },
        { name: "Zero", number: 0 },
        { name: "Unnumbered", number: undefined },
        { number: 2 },
      ],
      (row) => row.number,
      (row) => row.name
    )
  ).toEqual([
    { value: "0", label: "Zero" },
    { value: "1", label: "One" },
  ])
})
