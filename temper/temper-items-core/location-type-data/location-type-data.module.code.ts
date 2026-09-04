import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface LocationTypeTemplate {
  id: string
  name: string
}

const LOCATION_TYPE_DATA = {
  "character": { id: "character" as const, name: "Characters" },
  "bank": { id: "bank" as const, name: "Bank" },
  "craftbag": { id: "craftbag" as const, name: "Crafting Bag" },
  "housing-storage": { id: "housing-storage" as const, name: "Housing Storage" },
  "house": { id: "house" as const, name: "Houses" },
  "companion": { id: "companion" as const, name: "Companions" },
  "guild": { id: "guild" as const, name: "Guild Banks" },
} satisfies Record<string, LocationTypeTemplate>

export const locationTypes = createDataFile<LocationTypeTemplate>()(LOCATION_TYPE_DATA)

export type LocationTypeId = (typeof locationTypes.ids)[number]
