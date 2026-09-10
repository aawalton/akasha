import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { EsoCraftTypeId } from "./properties/eso-craft-type-id.number-property.ts"

export type TemperCraftType = TemperPursuitThing & {
  esoCraftTypeId: EsoCraftTypeId
}
