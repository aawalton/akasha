import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { MajorDebuff } from "akasha/temper/catalog/effect/temper-debuff-major/properties/major-debuff.relation-property.types.ts"
import type { MinorDebuff } from "akasha/temper/catalog/effect/temper-debuff-minor/properties/minor-debuff.relation-property.types.ts"

export type AppliedDebuffs = List<MajorDebuff | MinorDebuff>
