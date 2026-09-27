import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperSkillSlot } from "akasha/temper/catalog/skill/slot/temper-skill-slot.page-type.ts"
import type { TemperSkillSlot } from "akasha/temper/catalog/skill/slot/temper-skill-slot.page-type.types.ts"
import { temperSkillBar } from "akasha/temper/player/character/temper-skill-bar/temper-skill-bar.page-type.ts"
import type { TemperSkillBar } from "akasha/temper/player/character/temper-skill-bar/temper-skill-bar.page-type.types.ts"
import { temperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.ts"
import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export function addonMorphRankMost(this: void): number {
  for (const one of $pagesOfType<Pick<TemperCompletionCategory, "morphRankMost">>(
    temperCompletionCategory
  )) {
    if (one.morphRankMost !== undefined) return one.morphRankMost
  }
  throw new Error("no completion page states a morph rank cap")
}

export function addonFreeSlotMost(this: void): number {
  for (const one of $pagesOfType<Pick<TemperCompletionCategory, "freeSlotMost">>(
    temperCompletionCategory
  )) {
    if (one.freeSlotMost !== undefined) return one.freeSlotMost
  }
  throw new Error("no completion page states a free slot budget")
}

export function addonSlotTotals(this: void): { active: number; ultimate: number } {
  let bars = 0
  for (const bar of $pagesOfType<Pick<TemperSkillBar, "displayOrder">>(temperSkillBar)) {
    if (bar.displayOrder !== undefined) bars++
  }
  let active = 0
  let ultimate = 0
  for (const slot of $pagesOfType<Pick<TemperSkillSlot, "holdsUltimate">>(temperSkillSlot)) {
    if (slot.holdsUltimate === true) ultimate++
    else active++
  }
  return { active: active * bars, ultimate: ultimate * bars }
}
