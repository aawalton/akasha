import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type ActivationEffects = "jsonl"

export const activationEffects = {
  id: "01a05fcd-f548-76d2-9bca-20e59187c7a2",
  pageTypeSlug: "page-property-entry",
  slug: "activation-effects",
  propertySlug: "activation-effects",
  definition: "what firing a skill does, one effect to a line",
  properties: [
    { pagePropertySlug: "text-property/activation-effect-type", required: true, many: false },
    { pagePropertySlug: "text-property/damage-type", required: false, many: false },
    { pagePropertySlug: "text-property/scaling-stat", required: true, many: false },
    { pagePropertySlug: "text-property/scaling-kind", required: true, many: false },
    { pagePropertySlug: "number-property/coefficient", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
