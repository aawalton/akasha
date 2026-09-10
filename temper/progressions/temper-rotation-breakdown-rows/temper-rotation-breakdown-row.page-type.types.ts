import type { Description } from "../../../pages/properties/description.text-property.ts"
import type { Key } from "../../things/properties/key.text-property.ts"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { FullName } from "./properties/full-name.text-property.ts"

export type TemperRotationBreakdownRow = TemperProgressThing & {
  key: Key
  description: Description
  fullName: FullName
}
