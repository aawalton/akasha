import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { ConstantFamily } from "../properties/constant-family.text-property.ts"
import type { ConstantId } from "../properties/constant-id.text-property.ts"
import type { EsoNum } from "../properties/eso-num.number-property.ts"

export type TemperEsoPlayerEquipmentConstant = TemperCatalogThing & {
  constantFamily: ConstantFamily
  constantId: ConstantId
  esoNum: EsoNum
}

export const temperEsoPlayerEquipmentConstant = {
  id: "01a05fd1-d431-793b-8b9a-9cc4a07e31be",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-eso-player-equipment-constant",
  definition: "the number the game has for one gear value",
  pluralSlug: "temper-eso-player-equipment-constants",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-num", "text-property/constant-family", "text-property/constant-id"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/constant-family", required: true, many: false },
    { pageProperty: "text-property/constant-id", required: true, many: false },
    { pageProperty: "number-property/eso-num", required: true, many: false },
  ],
} as const satisfies PageType
