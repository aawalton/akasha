import { bitsNeeded } from "akasha/code/type/narrowing/modules/bits-needed/bits-needed.module.code.ts"
import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { poisons } from "akasha/temper/catalog/alchemy/modules/poison-source/poison-source.module.code.ts"
import { potions } from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { races } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { armorSlots } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-slots/armor-slots.module.code.ts"
import { equipmentQualities } from "akasha/temper/catalog/gear/equipment/kind/modules/equipment-qualities/equipment-qualities.module.code.ts"
import { jewelrySlots } from "akasha/temper/catalog/gear/equipment/kind/modules/jewelry-slots/jewelry-slots.module.code.ts"
import { armorTraits } from "akasha/temper/catalog/gear/equipment/modules/armor-traits/armor-traits.module.code.ts"
import { jewelryTraits } from "akasha/temper/catalog/gear/equipment/modules/jewelry-traits/jewelry-traits.module.code.ts"
import { weaponTraits } from "akasha/temper/catalog/gear/equipment/modules/weapon-traits/weapon-traits.module.code.ts"

import { skillSlots } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import { armorEnchants } from "akasha/temper/player/character/characters-equipment/modules/armor-enchants/armor-enchants.module.code.ts"
import { standardArmorWeights } from "akasha/temper/player/character/characters-equipment/modules/armor-weights/armor-weights.module.code.ts"
import { jewelryEnchants } from "akasha/temper/player/character/characters-equipment/modules/jewelry-enchants/jewelry-enchants.module.code.ts"
import {
  type SetCatalog,
  setsAll,
} from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.code.ts"
import { weaponEnchantments } from "akasha/temper/player/character/characters-equipment/modules/weapon-enchants/weapon-enchants.module.code.ts"
import { weaponTypes } from "akasha/temper/player/character/characters-equipment/modules/weapon-types-data/weapon-types-data.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { getSkillLineCategory } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import { scribedSkills } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"

import { alliances } from "akasha/temper/player/character/source/modules/alliances/alliances.module.code.ts"
import { curses } from "akasha/temper/player/character/source/modules/curses/curses.module.code.ts"
import { esoPlus } from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import { foodOrDrink } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import { mundus } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { vampireStages } from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"

const classIds = classes.ids
const raceIds = races.ids
const allianceIds = alliances.ids
const vampireStageIds = vampireStages.ids
const curseIds = curses.ids



export const armorSlotIds = armorSlots.ids
const armorWeightIds = standardArmorWeights.ids
const armorTraitIds = armorTraits.ids
const armorEnchantIds = armorEnchants.ids

export const jewelrySlotIds = jewelrySlots.ids
const jewelryTraitIds = jewelryTraits.ids
const jewelryEnchantIds = jewelryEnchants.ids

const weaponTypeIds = weaponTypes.ids
const weaponTraitIds = weaponTraits.ids
const weaponEnchantIds = weaponEnchantments.ids
const poisonIds = poisons.ids

const qualityIds = equipmentQualities.ids


export const skillSlotIds = skillSlots.ids


const championPointIds = championPoints.ids

const foodOrDrinkIds = foodOrDrink.ids
const potionIds = potions.ids


export const CLASS_BITS = bitsNeeded(classIds.length)
export const RACE_BITS = bitsNeeded(raceIds.length)
export const ALLIANCE_BITS = bitsNeeded(allianceIds.length)
export const VAMPIRE_STAGE_BITS = bitsNeeded(vampireStageIds.length)
export const CURSE_BITS = bitsNeeded(curseIds.length)


export const ATTRIBUTE_BITS = 7

export const ARMOR_WEIGHT_BITS = bitsNeeded(armorWeightIds.length)
export const ARMOR_TRAIT_BITS = bitsNeeded(armorTraitIds.length)
export const ARMOR_ENCHANT_BITS = bitsNeeded(armorEnchantIds.length)
export const JEWELRY_TRAIT_BITS = bitsNeeded(jewelryTraitIds.length)
export const JEWELRY_ENCHANT_BITS = bitsNeeded(jewelryEnchantIds.length)
export const WEAPON_TYPE_BITS = bitsNeeded(weaponTypeIds.length)
export const WEAPON_TRAIT_BITS = bitsNeeded(weaponTraitIds.length)
export const WEAPON_ENCHANT_BITS = bitsNeeded(weaponEnchantIds.length)
export const POISON_BITS = bitsNeeded(poisonIds.length)
export const QUALITY_BITS = bitsNeeded(qualityIds.length)




export const CHAMPION_POINT_BITS = bitsNeeded(championPointIds.length)

export const FOOD_OR_DRINK_BITS = bitsNeeded(foodOrDrinkIds.length)
export const POTION_BITS = bitsNeeded(potionIds.length)



function indexIn<Id extends string>(ids: readonly Id[]): (id: string) => number {
  const map = new Map<string, number>()
  for (const [i, id] of ids.entries()) {
    map.set(id, i)
  }
  return (id) => {
    const at = map.get(id)
    if (at === undefined) {
      throw new Error(
        `buildCodecIndices: \`${id}\` is no id these tables carry, and the first place in them ` +
          `is a real entry rather than a sentinel, so writing it would encode another thing`
      )
    }
    return at
  }
}

function idIn<Id extends string>(ids: readonly Id[]): (index: number) => Id {
  return (index) => ids[index] ?? requireFirst(ids)
}

type Places<Id extends string> = {
  readonly ids: readonly Id[]
  readonly bits: number
  readonly indexOf: (id: string) => number
  readonly idOf: (index: number) => Id
}

type HeldPlaces<Id extends string> = {
  readonly bits: () => number
  readonly indexOf: (id: string) => number
  readonly idOf: (index: number) => Id
}

function placesOver<Id extends string>(read: () => readonly Id[]): HeldPlaces<Id> {
  let held: Places<Id> | null = null
  const now = (): Places<Id> => {
    const ids = read()
    if (held?.ids !== ids) {
      held = { ids, bits: bitsNeeded(ids.length), indexOf: indexIn(ids), idOf: idIn(ids) }
    }
    return held
  }
  return {
    bits: () => now().bits,
    indexOf: (id) => now().indexOf(id),
    idOf: (index) => now().idOf(index),
  }
}

const focusScriptPlaces = placesOver(() => skillCatalog().focusScripts.ids)

const signatureScriptPlaces = placesOver(() => skillCatalog().signatureScripts.ids)

const affixScriptPlaces = placesOver(() => skillCatalog().affixScripts.ids)

const grimoirePlaces = placesOver(() => skillCatalog().grimoires.ids)

const esoPlusPlaces = placesOver(() => esoPlus().ids)

export const esoPlusBits = esoPlusPlaces.bits

const mundusPlaces = placesOver(() => mundus().ids)

export const mundusBits = mundusPlaces.bits

let characterLines: {
  readonly from: typeof skillLines.ids
  readonly ids: typeof skillLines.ids
} | null = null

function characterSkillLineIds(): typeof skillLines.ids {
  const from = skillLines.ids
  if (characterLines?.from !== from) {
    const ids = from.filter((id) => skillLines.data[id].subcategoryId !== "companion")
    characterLines = { from, ids }
  }
  return characterLines.ids
}

const skillLinePlaces = placesOver(characterSkillLineIds)

export const skillLineBits = skillLinePlaces.bits

export const grimoireBits = grimoirePlaces.bits
export const focusScriptBits = focusScriptPlaces.bits
export const signatureScriptBits = signatureScriptPlaces.bits
export const affixScriptBits = affixScriptPlaces.bits

type SetPlaces = {
  readonly catalog: SetCatalog
  readonly bits: number
  readonly indexOf: (id: string) => number
  readonly idOf: (index: number) => string
}

let setPlaces: SetPlaces | null = null

function setPlacesNow(): SetPlaces {
  const catalog = setsAll()
  if (setPlaces?.catalog !== catalog) {
    setPlaces = {
      catalog,
      bits: bitsNeeded(catalog.ids.length),
      indexOf: indexIn(catalog.ids),
      idOf: idIn(catalog.ids),
    }
  }
  return setPlaces
}

export function setBits(): number {
  return setPlacesNow().bits
}

export function getSetIndex(id: string): number {
  return setPlacesNow().indexOf(id)
}

export function getSetId(index: number): string {
  return setPlacesNow().idOf(index)
}

type SkillPlaces = {
  readonly ids: readonly string[]
  readonly scribedIds: readonly string[]
  readonly passiveIds: readonly string[]
  readonly indexOf: (id: string) => number
  readonly idOf: (index: number) => string
  readonly passiveOf: (index: number) => string
  readonly scribedIndexOf: (id: string) => number
  readonly scribedOf: (index: number) => string
}

let skillPlaces: SkillPlaces | null = null

function isCharacterPassive(id: string): boolean {
  const skill = skills.data[id]
  if (!skill) return false
  return skill.skillType === "passive" && getSkillLineCategory(skill.skillLineId) !== "companion"
}

function skillPlacesNow(): SkillPlaces {
  const ids = skills.ids
  const scribedIds = scribedSkills.ids
  if (skillPlaces?.ids !== ids || skillPlaces.scribedIds !== scribedIds) {
    const passiveIds = ids.filter(isCharacterPassive)
    skillPlaces = {
      ids,
      scribedIds,
      passiveIds,
      indexOf: indexIn(ids),
      idOf: idIn(ids),
      passiveOf: idIn(passiveIds),
      scribedIndexOf: indexIn(scribedIds),
      scribedOf: idIn(scribedIds),
    }
  }
  return skillPlaces
}

export function skillBits(): number {
  return bitsNeeded(skillPlacesNow().ids.length)
}

export function scribedSkillBits(): number {
  return bitsNeeded(skillPlacesNow().scribedIds.length)
}

export function passiveSkillIds(): readonly string[] {
  return skillPlacesNow().passiveIds
}

export function getSkillIndex(id: string): number {
  return skillPlacesNow().indexOf(id)
}

export function getSkillId(index: number): string {
  return skillPlacesNow().idOf(index)
}

export function getPassiveSkillId(index: number): string {
  return skillPlacesNow().passiveOf(index)
}

export function getScribedSkillIndex(id: string): number {
  return skillPlacesNow().scribedIndexOf(id)
}

export function getScribedSkillId(index: number): string {
  return skillPlacesNow().scribedOf(index)
}

export const getClassIndex = indexIn(classIds)
export const getRaceIndex = indexIn(raceIds)
export const getAllianceIndex = indexIn(allianceIds)
export const getVampireStageIndex = indexIn(vampireStageIds)
export const getCurseIndex = indexIn(curseIds)
export const getMundusIndex = mundusPlaces.indexOf
export const getSkillLineIndex = skillLinePlaces.indexOf
export const getArmorWeightIndex = indexIn(armorWeightIds)
export const getArmorTraitIndex = indexIn(armorTraitIds)
export const getArmorEnchantIndex = indexIn(armorEnchantIds)
export const getJewelryTraitIndex = indexIn(jewelryTraitIds)
export const getJewelryEnchantIndex = indexIn(jewelryEnchantIds)
export const getWeaponTypeIndex = indexIn(weaponTypeIds)
export const getWeaponTraitIndex = indexIn(weaponTraitIds)
export const getWeaponEnchantIndex = indexIn(weaponEnchantIds)
export const getPoisonIndex = indexIn(poisonIds)
export const getQualityIndex = indexIn(qualityIds)


export const getGrimoireIndex = grimoirePlaces.indexOf
export const getFocusScriptIndex = focusScriptPlaces.indexOf
export const getSignatureScriptIndex = signatureScriptPlaces.indexOf
export const getAffixScriptIndex = affixScriptPlaces.indexOf

export const getChampionPointIndex = indexIn(championPointIds)
export const getFoodOrDrinkIndex = indexIn(foodOrDrinkIds)
export const getPotionIndex = indexIn(potionIds)
export const getEsoPlusIndex = esoPlusPlaces.indexOf

export const getClassId = idIn(classIds)
export const getRaceId = idIn(raceIds)
export const getAllianceId = idIn(allianceIds)
export const getVampireStageId = idIn(vampireStageIds)
export const getCurseId = idIn(curseIds)
export const getMundusId = mundusPlaces.idOf
export const getSkillLineId = skillLinePlaces.idOf
export const getArmorWeightId = idIn(armorWeightIds)
export const getArmorTraitId = idIn(armorTraitIds)
export const getArmorEnchantId = idIn(armorEnchantIds)
export const getJewelryTraitId = idIn(jewelryTraitIds)
export const getJewelryEnchantId = idIn(jewelryEnchantIds)
export const getWeaponTypeId = idIn(weaponTypeIds)
export const getWeaponTraitId = idIn(weaponTraitIds)
export const getWeaponEnchantId = idIn(weaponEnchantIds)
export const getPoisonId = idIn(poisonIds)
export const getQualityId = idIn(qualityIds)


export const getGrimoireId = grimoirePlaces.idOf
export const getFocusScriptId = focusScriptPlaces.idOf
export const getSignatureScriptId = signatureScriptPlaces.idOf
export const getAffixScriptId = affixScriptPlaces.idOf

export const getChampionPointId = idIn(championPointIds)
export const getFoodOrDrinkId = idIn(foodOrDrinkIds)
export const getPotionId = idIn(potionIds)
export const getEsoPlusId = esoPlusPlaces.idOf
