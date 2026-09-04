import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import { base64urlToBytes } from "@akasha/temper-bit-codec/base64url"
import { makeBitReader, readBits } from "@akasha/temper-bit-codec/bit-reader"
import type { CompanionBuildData } from "../companions-codec/companions-codec.module.code.ts"
import {
  ARMOR_WEIGHT_BITS,
  COMPANION_BITS,
  COMPANION_BUILD_TYPE,
  QUALITY_BITS,
  ROLE_BITS,
  SKILL_BITS,
  TARGET_ARMOR_BITS,
  TARGET_HEALTH_BITS,
  TRAIT_BITS,
  WEAPON_TYPE_BITS,
} from "../companions-codec-constants/companions-codec-constants.module.code.ts"

export function decodeCompanionBuild(hash: string): CompanionBuildData | undefined {
  const bytes = base64urlToBytes(hash)
  if (bytes.length === 0) return undefined

  const reader = makeBitReader(bytes)

  const buildType = readBits(reader, 8)
  if (buildType !== COMPANION_BUILD_TYPE) return undefined

  readBits(reader, 8)
  const minorVersion = readBits(reader, 8)

  const companionIndex = readBits(reader, COMPANION_BITS)
  if (minorVersion < 8) {
    const roleBits =
      minorVersion >= 4 ? ROLE_BITS : minorVersion >= 3 ? 4 : minorVersion >= 1 ? ROLE_BITS : 3
    readBits(reader, roleBits)
  }

  const armor: CompanionBuildData["armor"] = []
  for (let i = 0; i < 7; i++) {
    const isEmpty = readBits(reader, 1) === 1
    if (isEmpty) {
      armor.push({ isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 })
    } else {
      const weightIndex = readBits(reader, ARMOR_WEIGHT_BITS)
      const traitIndex = readBits(reader, TRAIT_BITS)
      const qualityIndex = readBits(reader, QUALITY_BITS)
      armor.push({ isEmpty: false, weightIndex, traitIndex, qualityIndex })
    }
  }

  const jewelry: CompanionBuildData["jewelry"] = []
  for (let i = 0; i < 3; i++) {
    const isEmpty = readBits(reader, 1) === 1
    if (isEmpty) {
      jewelry.push({ isEmpty: true, traitIndex: 0, qualityIndex: 0 })
    } else {
      const traitIndex = readBits(reader, TRAIT_BITS)
      const qualityIndex = readBits(reader, QUALITY_BITS)
      jewelry.push({ isEmpty: false, traitIndex, qualityIndex })
    }
  }

  const weapons: CompanionBuildData["weapons"] = []
  for (let i = 0; i < 2; i++) {
    const isEmpty = readBits(reader, 1) === 1
    if (isEmpty) {
      weapons.push({ isEmpty: true, typeIndex: 0, traitIndex: 0, qualityIndex: 0 })
    } else {
      const typeIndex = readBits(reader, WEAPON_TYPE_BITS)
      const traitIndex = readBits(reader, TRAIT_BITS)
      const qualityIndex = readBits(reader, QUALITY_BITS)
      weapons.push({ isEmpty: false, typeIndex, traitIndex, qualityIndex })
    }
  }

  const skills: number[] = []
  for (let i = 0; i < 6; i++) {
    skills.push(readBits(reader, SKILL_BITS))
  }

  const targetArmorIndex = readBits(reader, TARGET_ARMOR_BITS)
  const targetHealthIndex = minorVersion >= 8 ? readBits(reader, TARGET_HEALTH_BITS) : 0

  return {
    companionIndex,
    armor,
    jewelry,
    weapons,
    skills,
    targetArmorIndex,
    targetHealthIndex,
  }
}
