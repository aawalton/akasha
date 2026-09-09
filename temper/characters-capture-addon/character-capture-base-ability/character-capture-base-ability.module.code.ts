import "akasha/temper/temper-eso-types/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/temper-eso-types/eso-functions-04/eso-functions-04.type-declaration.d.ts"
export function getBaseAbilityId(abilityId: number): number {
  if (abilityId === 0) return 0

  const [skillType, skillLineIndex, skillIndex] = GetSpecificSkillAbilityKeysByAbilityId(abilityId)
  if (skillType === 0) return abilityId

  const progressionIndex = GetProgressionSkillProgressionIndex(
    skillType,
    skillLineIndex,
    skillIndex
  )
  if (progressionIndex === undefined) {
    return GetSkillAbilityId(skillType, skillLineIndex, skillIndex, false)
  }

  return GetProgressionSkillMorphSlotAbilityId(progressionIndex, MORPH_SLOT_BASE)
}
