import {
  getPassiveSkillId,
  getSkillId,
  getSkillIndex,
  passiveSkillIds,
  skillBits,
  skillSlotIds,
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
  for (const slotId of skillSlotIds) {
    const skillId = build.skills["primary-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }

  for (const slotId of skillSlotIds) {
    const skillId = build.skills["backup-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), bits)
  }
}

export function encodePassives(writer: BitWriterState, build: CharacterState): undefined {
  const purchased = new Set(build.passives)
  for (const passiveId of passiveSkillIds()) {
    writeBits(writer, purchased.has(passiveId) ? 1 : 0, 1)
  }
}

export function decodeSkills(reader: BitReaderState): CharacterState["skills"] {
  const bits = skillBits()
  const primarySkillBar = recordFromKeys(skillSlotIds, () => getSkillId(readBits(reader, bits)))
  const backupSkillBar = recordFromKeys(skillSlotIds, () => getSkillId(readBits(reader, bits)))

  return {
    "primary-skill-bar": primarySkillBar,
    "backup-skill-bar": backupSkillBar,
  }
}

export function decodePassives(reader: BitReaderState): readonly SkillId[] {
  const passives: SkillId[] = []
  const count = passiveSkillIds().length
  for (let i = 0; i < count; i++) {
    if (readBits(reader, 1) === 1) {
      passives.push(getPassiveSkillId(i))
    }
  }
  return passives
}
