import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { Effect } from "akasha/temper/catalog/thing/properties/effect.text-property.types.ts"
import type { Effects } from "akasha/temper/catalog/thing/properties/effects.page-property-entry.types.ts"
import type { EsoTraitConstantName } from "akasha/temper/catalog/thing/properties/eso-trait-constant-name.text-property.types.ts"
import type { IsTwoHanded } from "akasha/temper/catalog/thing/properties/is-two-handed.boolean-property.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { Material } from "akasha/temper/catalog/thing/properties/material.text-property.types.ts"
import type { QualityValues } from "akasha/temper/catalog/thing/properties/quality-values.page-property-entry.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/thing/properties/skill-line-id.text-property.types.ts"
import type { SkillType } from "akasha/temper/catalog/thing/properties/skill-type.relation-property.types.ts"
import type { SubcategoryId } from "akasha/temper/catalog/thing/properties/subcategory-id.text-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

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
