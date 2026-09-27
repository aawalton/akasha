import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"

export function achievementNameToActivity(name: string): ActivityCategoryId | undefined {
  if (name.includes("Style Master")) return "crafting"
  if (name.includes("Skyshard")) return "exploration"
  if (name.endsWith("Angler")) return "exploration"
  if (name.includes("Larcenist")) return "other"
  if (name.includes("Quests")) return "quests"
  if (name.endsWith("Skill Master")) return "characters"
  if (name.endsWith("Skill Apprentice")) return "characters"
  if (name.includes("Skill Stylist")) return "characters"
  if (name.includes("Imperial City") && !name.includes("Imperial City Prison")) return "pvp"
  if (name.includes("Cyrodiil")) return "pvp"
  return undefined
}
