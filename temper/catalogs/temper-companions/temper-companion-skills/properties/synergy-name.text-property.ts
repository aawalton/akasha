import type { TextProperty } from "@akasha/pages/text-property"

export type SynergyName = string

export const synergyName = {
  id: "01a06193-6ca2-72d1-ab8b-4089e6bc8c55",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "synergy-name",
  propertySlug: "name",
  definition: "what the game calls the synergy a skill offers",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
