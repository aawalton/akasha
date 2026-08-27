import type { TaskData } from "../../../player-completion-addon/src/saved-variables"
import { getSkillMorphEnrichment, isSkillMorphTaskComplete } from "./task-hud-skill-morphs"

export { isSkillMorphTaskComplete }

export function countEnrichmentSlots(task: TaskData): { equipped: number; available: number } {
  const enrichment = getSkillMorphEnrichment(task)
  if (enrichment === undefined) return { equipped: 0, available: 0 }
  const names = new LuaSet<string>()
  for (const entry of enrichment) {
    names.add(entry.skillName)
  }
  let count = 0
  for (const hotbar of [HOTBAR_CATEGORY_PRIMARY, HOTBAR_CATEGORY_BACKUP]) {
    for (let slot = 3; slot <= 8; slot++) {
      if (names.has(GetSlotName(slot, hotbar))) count++
    }
  }
  return { equipped: count, available: enrichment.length }
}
