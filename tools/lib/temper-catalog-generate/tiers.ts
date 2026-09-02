
import type { Tier } from "@akasha/temper-catalog-generators/catalog-tier"
import { LORE_LIBRARY_TIER } from "@akasha/temper-catalog-generators/lore-library-catalog-tier"
import { RECIPE_TIER } from "@akasha/temper-catalog-generators/recipe-catalog-tier"

export const TIERS: readonly Tier[] = [LORE_LIBRARY_TIER, RECIPE_TIER]

export const TIER_SLUGS: readonly string[] = TIERS.map((tier) => tier.slug)

export function tierBySlug(slug: string): Tier | undefined {
  return TIERS.find((tier) => tier.slug === slug)
}
