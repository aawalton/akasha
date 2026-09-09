import { bytesToBase64url } from "@akasha/temper-bit-codec/base64url"
import {
  type BitWriterState,
  bitWriterToBytes,
  makeBitWriter,
  writeBits,
} from "@akasha/temper-bit-codec/bit-writer"
import {
  CHARACTER_AFFIX_SCRIPT_BITS,
  CHARACTER_ALLIANCE_BITS,
  CHARACTER_ARMOR_ENCHANT_BITS,
  CHARACTER_ARMOR_TRAIT_BITS,
  CHARACTER_ARMOR_WEIGHT_BITS,
  CHARACTER_ATTRIBUTE_BITS,
  CHARACTER_BUILD_TYPE,
  CHARACTER_CHAMPION_POINT_BITS,
  CHARACTER_CLASS_BITS,
  CHARACTER_CODEC_MINOR_VERSION,
  CHARACTER_CP_PASSIVE_COUNT_BITS,
  CHARACTER_CURSE_BITS,
  CHARACTER_ESO_PLUS_BITS,
  CHARACTER_FOCUS_SCRIPT_BITS,
  CHARACTER_FOOD_OR_DRINK_BITS,
  CHARACTER_GRIMOIRE_BITS,
  CHARACTER_JEWELRY_ENCHANT_BITS,
  CHARACTER_JEWELRY_TRAIT_BITS,
  CHARACTER_MUNDUS_BITS,
  CHARACTER_POISON_BITS,
  CHARACTER_POTION_BITS,
  CHARACTER_QUALITY_BITS,
  CHARACTER_RACE_BITS,
  CHARACTER_SCRIBED_SKILL_BITS,
  CHARACTER_SCRIBING_COUNT_BITS,
  CHARACTER_SET_BITS,
  CHARACTER_SIGNATURE_SCRIPT_BITS,
  CHARACTER_SKILL_BITS,
  CHARACTER_SKILL_LINE_BITS,
  CHARACTER_SKILL_LINE_COUNT_BITS,
  CHARACTER_TARGET_ARMOR_BITS,
  CHARACTER_TARGET_HEALTH_BITS,
  CHARACTER_VAMPIRE_STAGE_BITS,
  CHARACTER_WEAPON_ENCHANT_BITS,
  CHARACTER_WEAPON_TRAIT_BITS,
  CHARACTER_WEAPON_TYPE_BITS,
  ESO_VERSION,
} from "../character-capture-codec-constants/character-capture-codec-constants.module.code.ts"
import type {
  CharacterBuildData,
  CharacterWeaponSlotData,
} from "../character-capture-codec-types/character-capture-codec-types.module.code.ts"

export function encodeCharacterBuild(build: CharacterBuildData): string {
  const writer = makeBitWriter()

  writeBits(writer, CHARACTER_BUILD_TYPE, 8)
  writeBits(writer, ESO_VERSION, 8)
  writeBits(writer, CHARACTER_CODEC_MINOR_VERSION, 8)

  writeBits(writer, build.classIndex, CHARACTER_CLASS_BITS)
  writeBits(writer, build.raceIndex, CHARACTER_RACE_BITS)
  writeBits(writer, build.allianceIndex, CHARACTER_ALLIANCE_BITS)
  writeBits(writer, build.vampireStageIndex, CHARACTER_VAMPIRE_STAGE_BITS)
  writeBits(writer, build.curseIndex, CHARACTER_CURSE_BITS)
  writeBits(writer, build.mundusIndex, CHARACTER_MUNDUS_BITS)
  writeBits(writer, build.magicka, CHARACTER_ATTRIBUTE_BITS)
  writeBits(writer, build.health, CHARACTER_ATTRIBUTE_BITS)
  writeBits(writer, build.stamina, CHARACTER_ATTRIBUTE_BITS)

  writeBits(writer, build.skillLineIndices.length, CHARACTER_SKILL_LINE_COUNT_BITS)
  for (const slIndex of build.skillLineIndices) {
    writeBits(writer, slIndex, CHARACTER_SKILL_LINE_BITS)
  }

  for (const slot of build.armor) {
    if (slot.isEmpty) {
      writeBits(writer, 1, 1)
    } else {
      writeBits(writer, 0, 1)
      writeBits(writer, slot.weightIndex, CHARACTER_ARMOR_WEIGHT_BITS)
      writeBits(writer, slot.traitIndex, CHARACTER_ARMOR_TRAIT_BITS)
      writeBits(writer, slot.enchantIndex, CHARACTER_ARMOR_ENCHANT_BITS)
      writeBits(writer, slot.setIndex, CHARACTER_SET_BITS)
      writeBits(writer, slot.qualityIndex, CHARACTER_QUALITY_BITS)
      writeBits(writer, slot.enchantQualityIndex, CHARACTER_QUALITY_BITS)
    }
  }

  for (const slot of build.jewelry) {
    if (slot.isEmpty) {
      writeBits(writer, 1, 1)
    } else {
      writeBits(writer, 0, 1)
      writeBits(writer, slot.traitIndex, CHARACTER_JEWELRY_TRAIT_BITS)
      writeBits(writer, slot.enchantIndex, CHARACTER_JEWELRY_ENCHANT_BITS)
      writeBits(writer, slot.setIndex, CHARACTER_SET_BITS)
      writeBits(writer, slot.qualityIndex, CHARACTER_QUALITY_BITS)
      writeBits(writer, slot.enchantQualityIndex, CHARACTER_QUALITY_BITS)
    }
  }

  for (const bar of build.weaponBars) {
    encodeCharacterWeaponSlot(writer, bar.mainHand)
    encodeCharacterWeaponSlot(writer, bar.offHand)
  }

  for (const skillIndex of build.primarySkills) {
    writeBits(writer, skillIndex, CHARACTER_SKILL_BITS)
  }
  for (const skillIndex of build.backupSkills) {
    writeBits(writer, skillIndex, CHARACTER_SKILL_BITS)
  }

  for (const purchased of build.passiveBitmask) {
    writeBits(writer, purchased ? 1 : 0, 1)
  }

  for (const discipline of build.championPoints) {
    for (let i = 0; i < 4; i++) {
      writeBits(writer, discipline.slotted[i] ?? 0, CHARACTER_CHAMPION_POINT_BITS)
    }
    writeBits(writer, discipline.passive.length, CHARACTER_CP_PASSIVE_COUNT_BITS)
    for (const cpIndex of discipline.passive) {
      writeBits(writer, cpIndex, CHARACTER_CHAMPION_POINT_BITS)
    }
  }

  writeBits(writer, build.foodIndex, CHARACTER_FOOD_OR_DRINK_BITS)
  writeBits(writer, build.potionIndex, CHARACTER_POTION_BITS)
  writeBits(writer, build.potion2Index, CHARACTER_POTION_BITS)

  writeBits(writer, build.targetArmorBit, CHARACTER_TARGET_ARMOR_BITS)
  writeBits(writer, build.targetHealth, CHARACTER_TARGET_HEALTH_BITS)

  writeBits(writer, build.scribing.length, CHARACTER_SCRIBING_COUNT_BITS)
  for (const scribed of build.scribing) {
    writeBits(writer, scribed.scribedSkillIndex, CHARACTER_SCRIBED_SKILL_BITS)
    writeBits(writer, scribed.grimoireIndex, CHARACTER_GRIMOIRE_BITS)
    writeBits(writer, scribed.focusIndex, CHARACTER_FOCUS_SCRIPT_BITS)
    writeBits(writer, scribed.signatureIndex, CHARACTER_SIGNATURE_SCRIPT_BITS)
    writeBits(writer, scribed.affixIndex, CHARACTER_AFFIX_SCRIPT_BITS)
  }

  writeBits(writer, build.esoPlusBit, CHARACTER_ESO_PLUS_BITS)

  return bytesToBase64url(bitWriterToBytes(writer))
}

export function encodeCharacterWeaponSlot(
  writer: BitWriterState,
  slot: CharacterWeaponSlotData
): undefined {
  if (slot.isEmpty) {
    writeBits(writer, 1, 1)
    return
  }

  writeBits(writer, 0, 1)

  if (slot.isShield) {
    writeBits(writer, 1, 1)
    writeBits(writer, slot.shieldTraitIndex, CHARACTER_ARMOR_TRAIT_BITS)
    writeBits(writer, slot.shieldEnchantIndex, CHARACTER_ARMOR_ENCHANT_BITS)
    writeBits(writer, slot.setIndex, CHARACTER_SET_BITS)
    writeBits(writer, slot.qualityIndex, CHARACTER_QUALITY_BITS)
    writeBits(writer, slot.enchantQualityIndex, CHARACTER_QUALITY_BITS)
  } else {
    writeBits(writer, 0, 1)
    writeBits(writer, slot.typeIndex, CHARACTER_WEAPON_TYPE_BITS)
    writeBits(writer, slot.traitIndex, CHARACTER_WEAPON_TRAIT_BITS)
    writeBits(writer, slot.enchantIndex, CHARACTER_WEAPON_ENCHANT_BITS)
    writeBits(writer, slot.poisonIndex, CHARACTER_POISON_BITS)
    writeBits(writer, slot.setIndex, CHARACTER_SET_BITS)
    writeBits(writer, slot.qualityIndex, CHARACTER_QUALITY_BITS)
    writeBits(writer, slot.enchantQualityIndex, CHARACTER_QUALITY_BITS)
  }
}
