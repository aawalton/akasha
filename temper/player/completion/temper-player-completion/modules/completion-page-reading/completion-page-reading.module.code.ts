import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperSkillPoint } from "akasha/temper/player/character/temper-skill-point/temper-skill-point.page-type.ts"
import {
  COMPLETION_CATEGORY_FIELDS,
  holdCompletionCategoryPages,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-category-tree/completion-category-tree.module.code.ts"
import {
  holdSkillPointPages,
  SKILL_POINT_FIELDS,
} from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"
import { temperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.ts"

export const COMPLETION_PAGE_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperSkillPoint.slug, SKILL_POINT_FIELDS],
  [temperCompletionCategory.slug, COMPLETION_CATEGORY_FIELDS],
]

export function holdCompletionPages(rowsOf: (pageTypeSlug: string) => Iterable<Value>): undefined {
  holdSkillPointPages([...rowsOf(temperSkillPoint.slug)])
  holdCompletionCategoryPages([...rowsOf(temperCompletionCategory.slug)])
  return undefined
}
