import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { SkillId } from "@temper/game-characters-skills/skills-data"
import type { BitReaderState, BitWriterState } from "../binary-utils"
import { readBits, writeBits } from "../binary-utils"
import { recordFromKeys } from "../record-from-keys"
import {
  getPassiveSkillId,
  getSkillId,
  getSkillIndex,
  PASSIVE_SKILL_COUNT,
  passiveSkillIds,
  SKILL_BITS,
  skillSlotIds,
} from "./build-codec-indices"

export function encodeSkills(writer: BitWriterState, build: CharacterState): undefined {
  for (const slotId of skillSlotIds) {
    const skillId = build.skills["primary-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), SKILL_BITS)
  }

  for (const slotId of skillSlotIds) {
    const skillId = build.skills["backup-skill-bar"][slotId]
    writeBits(writer, getSkillIndex(skillId), SKILL_BITS)
  }
}

export function encodePassives(writer: BitWriterState, build: CharacterState): undefined {
  const purchased = new Set(build.passives)
  for (const passiveId of passiveSkillIds) {
    writeBits(writer, purchased.has(passiveId) ? 1 : 0, 1)
  }
}

export function decodeSkills(reader: BitReaderState): CharacterState["skills"] {
  const primarySkillBar = recordFromKeys(skillSlotIds, () =>
    getSkillId(readBits(reader, SKILL_BITS))
  )
  const backupSkillBar = recordFromKeys(skillSlotIds, () =>
    getSkillId(readBits(reader, SKILL_BITS))
  )

  return {
    "primary-skill-bar": primarySkillBar,
    "backup-skill-bar": backupSkillBar,
  }
}

export function decodePassives(reader: BitReaderState): readonly SkillId[] {
  const passives: SkillId[] = []
  for (let i = 0; i < PASSIVE_SKILL_COUNT; i++) {
    if (readBits(reader, 1) === 1) {
      passives.push(getPassiveSkillId(i))
    }
  }
  return passives
}
