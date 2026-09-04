import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Cooldown = number

export const cooldown = {
  id: "01a05fd1-d438-747e-827d-b5c526eef556",
  pageTypeSlug: "number-property",
  slug: "cooldown",
  propertySlug: "cooldown",
  definition: "how many seconds fall between one firing of an effect and the next",
  max: null,
} as const satisfies NumberProperty
