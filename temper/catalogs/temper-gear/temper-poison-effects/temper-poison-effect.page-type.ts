import type { PageType } from "@akasha/pages/page-type"
import type { Cooldown } from "../properties/cooldown.number-property.ts"
import type { IsPositive } from "../properties/is-positive.boolean-property.ts"
import type { OppositeId } from "../properties/opposite-id.text-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.types.ts"

export type TemperPoisonEffect = TemperGearThing & {
  oppositeId: OppositeId
  isPositive?: IsPositive
  cooldown?: Cooldown
}

export const temperPoisonEffect = {
  id: "01a05fd1-d434-7ecc-bbf1-c13d68007b96",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-poison-effect",
  definition: "one effect a reagent lends what it is brewed into",
  pluralSlug: "temper-poison-effects",
  extends: ["page-type/temper-gear-thing"],
  parts: ["boolean-property/is-positive", "number-property/cooldown", "text-property/opposite-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/opposite-id", required: true, many: false },
    { pageProperty: "boolean-property/is-positive", required: false, many: false },
    { pageProperty: "number-property/cooldown", required: false, many: false },
  ],
} as const satisfies PageType
