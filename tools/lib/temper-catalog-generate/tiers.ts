
import { ACHIEVEMENT_TIER } from "@akasha/temper-catalog-generators/achievement-catalog-tier"
import { ANTIQUITY_TIER } from "@akasha/temper-catalog-generators/antiquity-catalog-tier"
import { CADWELL_TIER } from "@akasha/temper-catalog-generators/cadwell-catalog-tier"
import type { Tier } from "@akasha/temper-catalog-generators/catalog-tier"
import { COLLECTIBLES_TIER } from "@akasha/temper-catalog-generators/collectibles-catalog-tier"
import { LORE_LIBRARY_TIER } from "@akasha/temper-catalog-generators/lore-library-catalog-tier"
import { POI_TIER } from "@akasha/temper-catalog-generators/poi-catalog-tier"
import { QUEST_TIER } from "@akasha/temper-catalog-generators/quest-catalog-tier"
import { RECIPE_TIER } from "@akasha/temper-catalog-generators/recipe-catalog-tier"
import { TRAIT_RESEARCH_TIER } from "@akasha/temper-catalog-generators/trait-research-catalog-tier"
import { TRIBUTE_TIER } from "@akasha/temper-catalog-generators/tribute-catalog-tier"
import { ZONE_COMPLETION_TIER } from "@akasha/temper-catalog-generators/zone-completion-catalog-tier"

export const TIERS: readonly Tier[] = [
  ACHIEVEMENT_TIER,
  ANTIQUITY_TIER,
  CADWELL_TIER,
  COLLECTIBLES_TIER,
  LORE_LIBRARY_TIER,
  POI_TIER,
  QUEST_TIER,
  RECIPE_TIER,
  TRAIT_RESEARCH_TIER,
  TRIBUTE_TIER,
  ZONE_COMPLETION_TIER,
]

export const TIER_SLUGS: readonly string[] = TIERS.map((tier) => tier.slug)

export function tierBySlug(slug: string): Tier | undefined {
  return TIERS.find((tier) => tier.slug === slug)
}
