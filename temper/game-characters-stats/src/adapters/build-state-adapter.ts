import type { CharacterState } from "@temper/game-characters-character/build-types"
import type { EffectSource } from "@temper/shared-formula-framework/effect-source"
import { extractAccount } from "./stages/extract-account"
import { extractArmor } from "./stages/extract-armor"
import { extractAttributes } from "./stages/extract-attributes"
import { extractChampionPoints } from "./stages/extract-champion-points"
import { extractConsumables } from "./stages/extract-consumables"
import { extractCurse } from "./stages/extract-curse"
import { extractJewelry } from "./stages/extract-jewelry"
import { extractMundus } from "./stages/extract-mundus"
import { extractPassives } from "./stages/extract-passives"
import { extractSets } from "./stages/extract-sets"
import { extractSkills } from "./stages/extract-skills"
import { extractTarget } from "./stages/extract-target"
import { extractWeapons } from "./stages/extract-weapons"
import type { TranslationContext } from "./stages/types"

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
