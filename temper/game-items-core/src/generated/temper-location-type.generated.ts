/**
 * Temper Location Types (Generated)
 *
 * ESO inventory location categories sourced from the universal pages table
 * (page type: temper-location-type).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { LocationTypeTemplate } from "../location-type-data"

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
