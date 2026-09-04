import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type ReadyAt = string

export const readyAt = {
  id: "01a0675a-f185-7db5-b69e-630dd06ad491",
  pageTypeSlug: "instant-property",
  slug: "ready-at",
  propertySlug: "ready-at",
  definition: "when a cooldown comes round again",
} as const satisfies InstantProperty
