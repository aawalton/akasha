import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export function classMasteriesOf(classPassives: unknown): readonly string[] {
  const held: readonly unknown[] = Array.isArray(classPassives)
    ? classPassives
    : isRecord(classPassives)
      ? Object.values(classPassives)
      : []
  const abilities = new Set(held.map((one) => (isRecord(one) ? one["abilityId"] : null)))
  return skillCatalog()
    .classMasteries.list.filter((mastery) => abilities.has(mastery.esoSkillId))
    .map((mastery) => mastery.id)
}
