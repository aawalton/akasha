import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
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
