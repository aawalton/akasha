import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { SkillId } from "@akasha/temper-character-skills/character-skills"
import type { BitReaderState } from "../binary-utils"
import { readBits } from "../binary-utils"
import { recordFromKeys } from "../record-from-keys"
import {
  getPassiveSkillId,
  getSkillId,
  PASSIVE_SKILL_COUNT,
  SKILL_BITS,
  skillSlotIds,
} from "./build-codec-indices"

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
