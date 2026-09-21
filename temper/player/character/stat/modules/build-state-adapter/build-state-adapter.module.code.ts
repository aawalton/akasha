import type { EffectSource } from "akasha/temper/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { extractAccount } from "akasha/temper/player/character/stat/modules/extract-account/extract-account.module.code.ts"
import { extractArmor } from "akasha/temper/player/character/stat/modules/extract-armor/extract-armor.module.code.ts"
import { extractAttributes } from "akasha/temper/player/character/stat/modules/extract-attributes/extract-attributes.module.code.ts"
import { extractChampionPoints } from "akasha/temper/player/character/stat/modules/extract-champion-points/extract-champion-points.module.code.ts"
import { extractConsumables } from "akasha/temper/player/character/stat/modules/extract-consumables/extract-consumables.module.code.ts"
import { extractCurse } from "akasha/temper/player/character/stat/modules/extract-curse/extract-curse.module.code.ts"
import { extractJewelry } from "akasha/temper/player/character/stat/modules/extract-jewelry/extract-jewelry.module.code.ts"
import { extractMundus } from "akasha/temper/player/character/stat/modules/extract-mundus/extract-mundus.module.code.ts"
import { extractPassives } from "akasha/temper/player/character/stat/modules/extract-passives/extract-passives.module.code.ts"
import { extractSets } from "akasha/temper/player/character/stat/modules/extract-sets/extract-sets.module.code.ts"
import { extractSkills } from "akasha/temper/player/character/stat/modules/extract-skills/extract-skills.module.code.ts"
import { extractTarget } from "akasha/temper/player/character/stat/modules/extract-target/extract-target.module.code.ts"
import { extractWeapons } from "akasha/temper/player/character/stat/modules/extract-weapons/extract-weapons.module.code.ts"
import type { TranslationContext } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

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
