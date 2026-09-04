import { poisons } from "@akasha/temper-alchemy/poison-source"
import { potions } from "@akasha/temper-alchemy/potion-source"
import { championPoints } from "@akasha/temper-champion-points/champion-point-source"
import { skills } from "@akasha/temper-character-skills/character-skills"
import { getSkillLineCategory } from "@akasha/temper-character-skills/passive-queries"
import { type ScribedSkillId, scribedSkills } from "@akasha/temper-character-skills/scribed-skills"
import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { alliances } from "@akasha/temper-character-sources/alliances"
import { curses } from "@akasha/temper-character-sources/curses"
import { esoPlus } from "@akasha/temper-character-sources/eso-plus-source"
import { foodOrDrink } from "@akasha/temper-character-sources/food-or-drink-source"
import { mundus } from "@akasha/temper-character-sources/mundus-source"
import { vampireStages } from "@akasha/temper-character-sources/vampire-stages"
import { armorEnchants } from "@akasha/temper-characters-equipment/armor-enchants"
import { standardArmorWeights } from "@akasha/temper-characters-equipment/armor-weights"
import { jewelryEnchants } from "@akasha/temper-characters-equipment/jewelry-enchants"
import { setsAll } from "@akasha/temper-characters-equipment/sets-all"
import { weaponEnchantments } from "@akasha/temper-characters-equipment/weapon-enchants"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { classes } from "@akasha/temper-classes/character-class"
import { armorTraits } from "@akasha/temper-equipment/armor-traits"
import { jewelryTraits } from "@akasha/temper-equipment/jewelry-traits"
import { weaponTraits } from "@akasha/temper-equipment/weapon-traits"
import { armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import { equipmentQualities } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import { races } from "@akasha/temper-races/races"
import { affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { signatureScripts } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import { skillSlots } from "@akasha/temper-skill-kinds/skill-slots"
import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import { requireFirst } from "@akasha/utils-narrow/require-first"

const classIds = classes.ids
const raceIds = races.ids
const allianceIds = alliances.ids
const vampireStageIds = vampireStages.ids
const curseIds = curses.ids
const mundusIds = mundus.ids
export const skillLineIds = skillLines.ids.filter(
  (id) => skillLines.data[id].subcategoryId !== "companion"
)

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

const setIds = setsAll.ids

const skillIds = skills.ids
export const skillSlotIds = skillSlots.ids

export const passiveSkillIds = skills.ids.filter((id) => {
  const skill = skills.data[id]
  if (!skill) return false
  return skill.skillType === "passive" && getSkillLineCategory(skill.skillLineId) !== "companion"
})
export const PASSIVE_SKILL_COUNT = passiveSkillIds.length

const grimoireIds = grimoires.ids
const focusScriptIds = focusScripts.ids
const signatureScriptIds = signatureScripts.ids
const affixScriptIds = affixScripts.ids

const championPointIds = championPoints.ids

const foodOrDrinkIds = foodOrDrink.ids
const potionIds = potions.ids

const esoPlusIds = esoPlus.ids

function bitsNeeded(count: number): number {
  if (count <= 1) return 1
  return Math.ceil(Math.log2(count))
}

export const CLASS_BITS = bitsNeeded(classIds.length)
export const RACE_BITS = bitsNeeded(raceIds.length)
export const ALLIANCE_BITS = bitsNeeded(allianceIds.length)
export const VAMPIRE_STAGE_BITS = bitsNeeded(vampireStageIds.length)
export const CURSE_BITS = bitsNeeded(curseIds.length)
export const MUNDUS_BITS = bitsNeeded(mundusIds.length)
export const SKILL_LINE_BITS = bitsNeeded(skillLineIds.length)
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
export const SET_BITS = bitsNeeded(setIds.length)

export const SKILL_BITS = bitsNeeded(skillIds.length)

export const GRIMOIRE_BITS = bitsNeeded(grimoireIds.length)
export const FOCUS_SCRIPT_BITS = bitsNeeded(focusScriptIds.length)
export const SIGNATURE_SCRIPT_BITS = bitsNeeded(signatureScriptIds.length)
export const AFFIX_SCRIPT_BITS = bitsNeeded(affixScriptIds.length)

export const CHAMPION_POINT_BITS = bitsNeeded(championPointIds.length)

export const FOOD_OR_DRINK_BITS = bitsNeeded(foodOrDrinkIds.length)
export const POTION_BITS = bitsNeeded(potionIds.length)

export const ESO_PLUS_BITS = bitsNeeded(esoPlusIds.length)

function createIndexMap(ids: readonly string[]): Map<string, number> {
  const map = new Map<string, number>()
  for (const [i, id] of ids.entries()) {
    map.set(id, i)
  }
  return map
}

const classIndexMap = createIndexMap(classIds)
const raceIndexMap = createIndexMap(raceIds)
const allianceIndexMap = createIndexMap(allianceIds)
const vampireStageIndexMap = createIndexMap(vampireStageIds)
const curseIndexMap = createIndexMap(curseIds)
const mundusIndexMap = createIndexMap(mundusIds)
const skillLineIndexMap = createIndexMap(skillLineIds)

const armorWeightIndexMap = createIndexMap(armorWeightIds)
const armorTraitIndexMap = createIndexMap(armorTraitIds)
const armorEnchantIndexMap = createIndexMap(armorEnchantIds)
const jewelryTraitIndexMap = createIndexMap(jewelryTraitIds)
const jewelryEnchantIndexMap = createIndexMap(jewelryEnchantIds)
const weaponTypeIndexMap = createIndexMap(weaponTypeIds)
const weaponTraitIndexMap = createIndexMap(weaponTraitIds)
const weaponEnchantIndexMap = createIndexMap(weaponEnchantIds)
const poisonIndexMap = createIndexMap(poisonIds)
const qualityIndexMap = createIndexMap(qualityIds)
const setIndexMap = createIndexMap(setIds)

const skillIndexMap = createIndexMap(skillIds)

const grimoireIndexMap = createIndexMap(grimoireIds)
const focusScriptIndexMap = createIndexMap(focusScriptIds)
const signatureScriptIndexMap = createIndexMap(signatureScriptIds)
const affixScriptIndexMap = createIndexMap(affixScriptIds)

const championPointIndexMap = createIndexMap(championPointIds)

const foodOrDrinkIndexMap = createIndexMap(foodOrDrinkIds)
const potionIndexMap = createIndexMap(potionIds)

const esoPlusIndexMap = createIndexMap(esoPlusIds)

export function getClassIndex(id: string): number {
  return classIndexMap.get(id) ?? 0
}

export function getRaceIndex(id: string): number {
  return raceIndexMap.get(id) ?? 0
}

export function getAllianceIndex(id: string): number {
  return allianceIndexMap.get(id) ?? 0
}

export function getVampireStageIndex(id: string): number {
  return vampireStageIndexMap.get(id) ?? 0
}

export function getCurseIndex(id: string): number {
  return curseIndexMap.get(id) ?? 0
}

export function getMundusIndex(id: string): number {
  return mundusIndexMap.get(id) ?? 0
}

export function getSkillLineIndex(id: string): number {
  return skillLineIndexMap.get(id) ?? 0
}

export function getArmorWeightIndex(id: string): number {
  return armorWeightIndexMap.get(id) ?? 0
}

export function getArmorTraitIndex(id: string): number {
  return armorTraitIndexMap.get(id) ?? 0
}

export function getArmorEnchantIndex(id: string): number {
  return armorEnchantIndexMap.get(id) ?? 0
}

export function getJewelryTraitIndex(id: string): number {
  return jewelryTraitIndexMap.get(id) ?? 0
}

export function getJewelryEnchantIndex(id: string): number {
  return jewelryEnchantIndexMap.get(id) ?? 0
}

export function getWeaponTypeIndex(id: string): number {
  return weaponTypeIndexMap.get(id) ?? 0
}

export function getWeaponTraitIndex(id: string): number {
  return weaponTraitIndexMap.get(id) ?? 0
}

export function getWeaponEnchantIndex(id: string): number {
  return weaponEnchantIndexMap.get(id) ?? 0
}

export function getPoisonIndex(id: string): number {
  return poisonIndexMap.get(id) ?? 0
}

export function getQualityIndex(id: string): number {
  return qualityIndexMap.get(id) ?? 0
}

export function getSetIndex(id: string): number {
  return setIndexMap.get(id) ?? 0
}

export function getSkillIndex(id: string): number {
  return skillIndexMap.get(id) ?? 0
}

export function getGrimoireIndex(id: string): number {
  return grimoireIndexMap.get(id) ?? 0
}

export function getFocusScriptIndex(id: string): number {
  return focusScriptIndexMap.get(id) ?? 0
}

export function getSignatureScriptIndex(id: string): number {
  return signatureScriptIndexMap.get(id) ?? 0
}

export function getAffixScriptIndex(id: string): number {
  return affixScriptIndexMap.get(id) ?? 0
}

export function getChampionPointIndex(id: string): number {
  return championPointIndexMap.get(id) ?? 0
}

export function getFoodOrDrinkIndex(id: string): number {
  return foodOrDrinkIndexMap.get(id) ?? 0
}

export function getPotionIndex(id: string): number {
  return potionIndexMap.get(id) ?? 0
}

export function getEsoPlusIndex(id: string): number {
  return esoPlusIndexMap.get(id) ?? 0
}

export function getClassId(index: number): (typeof classIds)[number] {
  return classIds[index] ?? requireFirst(classIds)
}

export function getRaceId(index: number): (typeof raceIds)[number] {
  return raceIds[index] ?? requireFirst(raceIds)
}

export function getAllianceId(index: number): (typeof allianceIds)[number] {
  return allianceIds[index] ?? requireFirst(allianceIds)
}

export function getVampireStageId(index: number): (typeof vampireStageIds)[number] {
  return vampireStageIds[index] ?? requireFirst(vampireStageIds)
}

export function getCurseId(index: number): (typeof curseIds)[number] {
  return curseIds[index] ?? requireFirst(curseIds)
}

export function getMundusId(index: number): (typeof mundusIds)[number] {
  return mundusIds[index] ?? requireFirst(mundusIds)
}

export function getSkillLineId(index: number): (typeof skillLineIds)[number] {
  return skillLineIds[index] ?? requireFirst(skillLineIds)
}

export function getArmorWeightId(index: number): (typeof armorWeightIds)[number] {
  return armorWeightIds[index] ?? requireFirst(armorWeightIds)
}

export function getArmorTraitId(index: number): (typeof armorTraitIds)[number] {
  return armorTraitIds[index] ?? requireFirst(armorTraitIds)
}

export function getArmorEnchantId(index: number): (typeof armorEnchantIds)[number] {
  return armorEnchantIds[index] ?? requireFirst(armorEnchantIds)
}

export function getJewelryTraitId(index: number): (typeof jewelryTraitIds)[number] {
  return jewelryTraitIds[index] ?? requireFirst(jewelryTraitIds)
}

export function getJewelryEnchantId(index: number): (typeof jewelryEnchantIds)[number] {
  return jewelryEnchantIds[index] ?? requireFirst(jewelryEnchantIds)
}

export function getWeaponTypeId(index: number): (typeof weaponTypeIds)[number] {
  return weaponTypeIds[index] ?? requireFirst(weaponTypeIds)
}

export function getWeaponTraitId(index: number): (typeof weaponTraitIds)[number] {
  return weaponTraitIds[index] ?? requireFirst(weaponTraitIds)
}

export function getWeaponEnchantId(index: number): (typeof weaponEnchantIds)[number] {
  return weaponEnchantIds[index] ?? requireFirst(weaponEnchantIds)
}

export function getPoisonId(index: number): (typeof poisonIds)[number] {
  return poisonIds[index] ?? requireFirst(poisonIds)
}

export function getQualityId(index: number): (typeof qualityIds)[number] {
  return qualityIds[index] ?? requireFirst(qualityIds)
}

export function getSetId(index: number): (typeof setIds)[number] {
  return setIds[index] ?? requireFirst(setIds)
}

export function getSkillId(index: number): (typeof skillIds)[number] {
  return skillIds[index] ?? requireFirst(skillIds)
}

export function getPassiveSkillId(index: number): (typeof passiveSkillIds)[number] {
  return passiveSkillIds[index] ?? requireFirst(passiveSkillIds)
}

export function getGrimoireId(index: number): (typeof grimoireIds)[number] {
  return grimoireIds[index] ?? requireFirst(grimoireIds)
}

export function getFocusScriptId(index: number): (typeof focusScriptIds)[number] {
  return focusScriptIds[index] ?? requireFirst(focusScriptIds)
}

export function getSignatureScriptId(index: number): (typeof signatureScriptIds)[number] {
  return signatureScriptIds[index] ?? requireFirst(signatureScriptIds)
}

export function getAffixScriptId(index: number): (typeof affixScriptIds)[number] {
  return affixScriptIds[index] ?? requireFirst(affixScriptIds)
}

export function getChampionPointId(index: number): (typeof championPointIds)[number] {
  return championPointIds[index] ?? requireFirst(championPointIds)
}

export function getFoodOrDrinkId(index: number): (typeof foodOrDrinkIds)[number] {
  return foodOrDrinkIds[index] ?? requireFirst(foodOrDrinkIds)
}

export function getPotionId(index: number): (typeof potionIds)[number] {
  return potionIds[index] ?? requireFirst(potionIds)
}

export function getEsoPlusId(index: number): (typeof esoPlusIds)[number] {
  return esoPlusIds[index] ?? requireFirst(esoPlusIds)
}

const scribedSkillIds = scribedSkills.ids
const scribedSkillIndexMap = createIndexMap(scribedSkillIds)

export const SCRIBED_SKILL_BITS = bitsNeeded(scribedSkillIds.length)

export function getScribedSkillIndex(id: string): number {
  return scribedSkillIndexMap.get(id) ?? 0
}

export function getScribedSkillId(index: number): ScribedSkillId {
  return scribedSkillIds[index] ?? requireFirst(scribedSkillIds)
}
