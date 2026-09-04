import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"
import type { Available } from "./properties/available.boolean-property.ts"
import type { Effect } from "./properties/effect.text-property.ts"
import type { Effects } from "./properties/effects.page-property-entry.ts"
import type { EsoTraitConstantName } from "./properties/eso-trait-constant-name.text-property.ts"
import type { IsTwoHanded } from "./properties/is-two-handed.boolean-property.ts"
import type { ItemId } from "./properties/item-id.number-property.ts"
import type { Material } from "./properties/material.text-property.ts"
import type { QualityValues } from "./properties/quality-values.page-property-entry.ts"
import type { SkillLineId } from "./properties/skill-line-id.text-property.ts"
import type { SkillType } from "./properties/skill-type.text-property.ts"
import type { SubcategoryId } from "./properties/subcategory-id.text-property.ts"

export type TemperCatalogThing = TemperThing & {
  effect?: Effect
  material?: Material
  esoTraitConstantName?: EsoTraitConstantName
  effects?: Effects
  qualityValues?: QualityValues
  available?: Available
  isTwoHanded?: IsTwoHanded
  itemId?: ItemId
  skillLineId?: SkillLineId
  skillType?: SkillType
  subcategoryId?: SubcategoryId
}

export const temperCatalogThing = {
  id: "01a05fb0-3cea-7e62-9477-d1a11db7b2e5",
  pageTypeSlug: "page-type",
  slug: "temper-catalog-thing",
  definition: "anything the game itself holds that temper mirrors a page for",
  pluralSlug: "temper-catalog-things",
  extendsSlug: ["page-type/temper-thing"],
  partSlugs: [
    "boolean-property/available",
    "boolean-property/is-two-handed",
    "boolean-property/per-weapon",
    "number-property/effect-seconds",
    "number-property/effect-value",
    "number-property/item-id",
    "number-property/quality-value",
    "number-property/value-per-ability",
    "number-property/value-per-piece",
    "page-property-entry/effects",
    "page-property-entry/quality-values",
    "text-property/achievement-name",
    "text-property/armor-weight",
    "text-property/effect",
    "text-property/effect-weapon-types",
    "text-property/eso-trait-constant-name",
    "text-property/material",
    "text-property/poi-name",
    "text-property/quality",
    "text-property/skill-line-id",
    "text-property/skill-type",
    "text-property/slotted-behavior",
    "text-property/subcategory-id",
    "text-property/value-type",
  ],
  properties: [
    { pagePropertySlug: "effect", required: false, many: false },
    { pagePropertySlug: "material", required: false, many: false },
    { pagePropertySlug: "eso-trait-constant-name", required: false, many: false },
    { pagePropertySlug: "effects", required: false, many: false },
    { pagePropertySlug: "quality-values", required: false, many: false },
    { pagePropertySlug: "available", required: false, many: false },
    { pagePropertySlug: "is-two-handed", required: false, many: false },
    { pagePropertySlug: "item-id", required: false, many: false },
    { pagePropertySlug: "skill-line-id", required: false, many: false },
    { pagePropertySlug: "skill-type", required: false, many: false },
    { pagePropertySlug: "subcategory-id", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a thing does is stated in one shape whatever kind of thing carries the effect.",
    },
  ],
} as const satisfies PageType
