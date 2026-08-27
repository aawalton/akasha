import { locationTypes } from "./generated/temper-location-type.generated"

export interface LocationTypeTemplate {
  id: string
  name: string
}

export { locationTypes }

export type LocationTypeId = (typeof locationTypes.ids)[number]
