import {
  PASSIVE_SKILL_COUNT,
  passiveSkillIds,
} from "@akasha/temper-build-codec/build-codec-indices"
import { skills } from "@akasha/temper-character-skills/character-skills"
export function generatePassiveSkillMappings(): string {
  const entries: string[] = []
  for (const [i, id] of passiveSkillIds.entries()) {
    const skill = skills.data[id]
    if (skill === undefined || skill.esoSkillId === 0) continue
    entries.push(`  [${skill.esoSkillId}]: ${i}, // ${skill.name}`)
  }

  return `\
/**
 * Passive Skill Mappings (Generated)
 *
 * Maps ESO passive skill base ability IDs to bitmask indices for the character codec.
 * Source: engine/character/codec/build-codec-indices.ts (passiveSkillIds)
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CHARACTER_PASSIVE_SKILL_COUNT = ${PASSIVE_SKILL_COUNT}

export const PASSIVE_ESO_ID_TO_BITMASK_INDEX: Record<number, number> = {
${entries.join("\n")}
}

export function getPassiveBitmaskIndex(esoSkillId: number): number | undefined {
  return PASSIVE_ESO_ID_TO_BITMASK_INDEX[esoSkillId]
}
`
}
