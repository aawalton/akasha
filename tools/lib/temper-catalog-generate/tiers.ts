
import type { Tier } from "./harness.ts"
import { tier as achievement } from "./tiers/achievement.ts"
import { tier as antiquity } from "./tiers/antiquity.ts"
import { tier as cadwell } from "./tiers/cadwell.ts"
import { tier as collectibles } from "./tiers/collectibles.ts"
import { tier as loreLibrary } from "./tiers/lore-library.ts"
import { tier as poi } from "./tiers/poi.ts"
import { tier as quest } from "./tiers/quest.ts"
import { tier as recipe } from "./tiers/recipe.ts"
import { tier as traitResearch } from "./tiers/trait-research.ts"
import { tier as tribute } from "./tiers/tribute.ts"
import { tier as zoneCompletion } from "./tiers/zone-completion.ts"

export const TIERS: readonly Tier[] = [
  achievement,
  antiquity,
  cadwell,
  collectibles,
  loreLibrary,
  poi,
  quest,
  recipe,
  traitResearch,
  tribute,
  zoneCompletion,
]

export const TIER_SLUGS: readonly string[] = TIERS.map((tier) => tier.slug)

export function tierBySlug(slug: string): Tier | undefined {
  return TIERS.find((tier) => tier.slug === slug)
}
