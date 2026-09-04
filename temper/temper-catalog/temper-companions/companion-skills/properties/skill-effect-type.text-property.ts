import type { TextProperty } from "@akasha/pages-system/text-property"

export type SkillEffectType = string

export const skillEffectType = {
  id: "01a06193-6c9c-7634-848c-8d6bb62228f6",
  pageTypeSlug: "text-property",
  slug: "skill-effect-type",
  propertySlug: "type",
  definition: "what one thing a companion's skill does is a case of",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
