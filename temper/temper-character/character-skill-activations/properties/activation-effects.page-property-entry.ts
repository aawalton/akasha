import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type ActivationEffects = "jsonl"

export const activationEffects = {
  id: "01a05fcd-f548-76d2-9bca-20e59187c7a2",
  pageTypeSlug: "page-property-entry",
  slug: "activation-effects",
  propertySlug: "activation-effects",
  definition: "what firing a skill does, one effect to a line",
  properties: [
    { pagePropertySlug: "activation-effect-type", required: true, many: false },
    { pagePropertySlug: "damage-type", required: false, many: false },
    { pagePropertySlug: "scaling-stat", required: true, many: false },
    { pagePropertySlug: "scaling-kind", required: true, many: false },
    { pagePropertySlug: "coefficient", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
