import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import {
  heldKeyedTitles,
  titleOf,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"

function titled(pageTypeSlug: string, key: string): string {
  const titles = heldKeyedTitles(pageTypeSlug)
  return titles === null ? key : titleOf(titles, key)
}

export function formatDestination(destination: string): string {
  if (destination === "bank") return titled(temperVenue.slug, "bank")
  if (destination === "house-storage") return titled(temperLocationType.slug, "housing-storage")
  if (destination === "guild-bank") return titled(temperVenue.slug, "guild-bank")
  if (destination === "character-worn:by-priority") return "By Priority"
  if (destination === "companion-worn:by-priority") return "By Priority"
  if (destination.startsWith("character:")) return titled(temperLocationType.slug, "character")
  if (destination.startsWith("companion-worn:")) return titled(temperLocationType.slug, "companion")
  if (destination.startsWith("guild-bank:")) return destination.slice("guild-bank:".length)
  if (destination.startsWith("house-storage:")) return destination.slice("house-storage:".length)
  return destination
}
