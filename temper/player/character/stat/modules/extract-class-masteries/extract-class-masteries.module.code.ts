import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

export const extractClassMasteries: PipelineStage = (build, _context) => {
  const masteries = skillCatalog().classMasteries
  return (build.masteries ?? []).flatMap((id): EffectSource[] => {
    const mastery = masteries.data[id]
    if (mastery === undefined || mastery.effects.length === 0) return []
    return [{ id: `mastery-${mastery.id}`, categoryId: "skills", effects: mastery.effects }]
  })
}
