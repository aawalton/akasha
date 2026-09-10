import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
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
