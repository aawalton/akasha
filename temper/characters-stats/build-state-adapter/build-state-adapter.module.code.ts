import type { CharacterState } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import { extractAccount } from "akasha/temper/characters-stats/extract-account/extract-account.module.code.ts"
import { extractArmor } from "akasha/temper/characters-stats/extract-armor/extract-armor.module.code.ts"
import { extractAttributes } from "akasha/temper/characters-stats/extract-attributes/extract-attributes.module.code.ts"
import { extractChampionPoints } from "akasha/temper/characters-stats/extract-champion-points/extract-champion-points.module.code.ts"
import { extractConsumables } from "akasha/temper/characters-stats/extract-consumables/extract-consumables.module.code.ts"
import { extractCurse } from "akasha/temper/characters-stats/extract-curse/extract-curse.module.code.ts"
import { extractJewelry } from "akasha/temper/characters-stats/extract-jewelry/extract-jewelry.module.code.ts"
import { extractMundus } from "akasha/temper/characters-stats/extract-mundus/extract-mundus.module.code.ts"
import { extractPassives } from "akasha/temper/characters-stats/extract-passives/extract-passives.module.code.ts"
import { extractSets } from "akasha/temper/characters-stats/extract-sets/extract-sets.module.code.ts"
import { extractSkills } from "akasha/temper/characters-stats/extract-skills/extract-skills.module.code.ts"
import { extractTarget } from "akasha/temper/characters-stats/extract-target/extract-target.module.code.ts"
import { extractWeapons } from "akasha/temper/characters-stats/extract-weapons/extract-weapons.module.code.ts"
import type { TranslationContext } from "akasha/temper/characters-stats/pipeline-types/pipeline-types.module.code.ts"
import type { EffectSource } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"

export function buildStateToEffectSources(
  build: CharacterState,
  bar?: "primary-weapon-bar" | "backup-weapon-bar"
): readonly EffectSource[] {
  const context: TranslationContext = { bar }
  const sources: EffectSource[] = []

  sources.push(...extractTarget(build, context))

  sources.push(...extractAttributes(build, context))

  sources.push(...extractArmor(build, context))

  sources.push(...extractJewelry(build, context))

  sources.push(...extractWeapons(build, context))

  sources.push(...extractSets(build, context))

  sources.push(...extractMundus(build, context))

  sources.push(...extractConsumables(build, context))

  sources.push(...extractSkills(build, context))

  sources.push(...extractPassives(build, context))

  sources.push(...extractChampionPoints(build, context))

  sources.push(...extractAccount(build, context))

  sources.push(...extractCurse(build, context))

  return sources
}
