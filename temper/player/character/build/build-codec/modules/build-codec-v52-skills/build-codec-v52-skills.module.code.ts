import { skillSlots } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import {
  getPassiveSkillId,
  getSkillId,
  getSkillIndex,
  passiveSkillIds,
  skillBits,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import type { BitReaderState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import { readBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-reader/build-hash-bit-reader.module.code.ts"
import type { BitWriterState } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { writeBits } from "akasha/temper/player/character/build/build-hash/modules/build-hash-bit-writer/build-hash-bit-writer.module.code.ts"
import { recordFromKeys } from "akasha/temper/player/character/build/build-hash/modules/record-from-keys/record-from-keys.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { SkillId } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"

export function encodeSkills(writer: BitWriterState, build: CharacterState): undefined {
  const bits = skillBits()
  const slotIds = skillSlots().ids
  for (const slotId of slotIds) {
    const skillId = build.skills["primary-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }

  for (const slotId of slotIds) {
    const skillId = build.skills["backup-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }
}

const FIRST_MINOR_WITH_PASSIVE_RANKS = 9

const PASSIVE_RANK_BITS = 4

const NO_RANK = 0

const HIGHEST_RANK = (1 << PASSIVE_RANK_BITS) - 1

export function encodePassives(writer: BitWriterState, build: CharacterState): undefined {
  const purchased = new Set(build.passives)
  const ids = passiveSkillIds()
  for (const passiveId of ids) {
    writeBits(writer, purchased.has(passiveId) ? 1 : 0, 1)
  }
  for (const passiveId of ids) {
    if (!purchased.has(passiveId)) continue
    const rank = build.passiveRanks?.[passiveId] ?? NO_RANK
    writeBits(writer, Math.min(Math.max(rank, NO_RANK), HIGHEST_RANK), PASSIVE_RANK_BITS)
  }
}

export function decodeSkills(reader: BitReaderState): CharacterState["skills"] {
  const bits = skillBits()
  const slotIds = skillSlots().ids
  const primarySkillBar = recordFromKeys(slotIds, () => getSkillId(readBits(reader, bits)))
  const backupSkillBar = recordFromKeys(slotIds, () => getSkillId(readBits(reader, bits)))

  return {
    "primary-skill-bar": primarySkillBar,
    "backup-skill-bar": backupSkillBar,
  }
}

type DecodedPassives = Pick<CharacterState, "passives" | "passiveRanks">

export function decodePassives(reader: BitReaderState, minorVersion: number): DecodedPassives {
  const passives: SkillId[] = []
  const count = passiveSkillIds().length
  for (let i = 0; i < count; i++) {
    if (readBits(reader, 1) === 1) {
      passives.push(getPassiveSkillId(i))
    }
  }
  if (minorVersion < FIRST_MINOR_WITH_PASSIVE_RANKS) return { passives }
  const passiveRanks: Partial<Record<SkillId, number>> = {}
  for (const passiveId of passives) {
    const rank = readBits(reader, PASSIVE_RANK_BITS)
    if (rank !== NO_RANK) passiveRanks[passiveId] = rank
  }
  return Object.keys(passiveRanks).length === 0 ? { passives } : { passives, passiveRanks }
}
