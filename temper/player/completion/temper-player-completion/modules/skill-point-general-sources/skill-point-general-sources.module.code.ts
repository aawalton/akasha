import type { SkillPointGeneralSource } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-source-types/skill-point-source-types.module.code.ts"
import { skillPointSources } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

export function skillPointGeneralSources(): readonly SkillPointGeneralSource[] {
  return skillPointSources().general
}
