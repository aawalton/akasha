import type { EffectSource } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { skillCatalog } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

const PURE_CLASS_PASSIVES: Readonly<Record<string, EffectSource>> = {
  nightblade: {
    id: "passive-above-and-beyond",
    categoryId: "skills",
    effects: [
      { metricId: "critical-damage", effectType: "fractional-change", effectValue: 0.25 },
      { metricId: "healing-critical-bonus", effectType: "fractional-change", effectValue: 0.25 },
    ],
  },
}

export const extractPureClassPassives: PipelineStage = (build, _context) => {
  const classId = build.character.class
  const source = PURE_CLASS_PASSIVES[classId]
  if (source === undefined) return []

  const ownLines = skillCatalog()
    .skillLines.list.filter((line) => "class" in line && line.class === classId)
    .map((line) => line.id)
  const chosen = build.character.skillLineIds
  const pure = ownLines.length > 0 && ownLines.every((line) => chosen.includes(line))
  return pure ? [source] : []
}
