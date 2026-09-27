"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import {
  ACTIVITY_CATEGORIES,
  type ActivityCategoryId,
} from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { temperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"

interface CompletionCategoryBadgesProps {
  label: string
  categories: readonly ActivityCategoryId[]
}

export function CompletionCategoryBadges({ label, categories }: CompletionCategoryBadgesProps) {
  const titles = useKeyedTitles(temperActivityCategory.slug)
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <span>{label}</span>
      {categories.map((cat) => (
        <Badge
          key={cat}
          variant={ACTIVITY_CATEGORIES.data[cat].badgeVariant}
          className="text-[10px]"
        >
          {titleIn(titles, cat)}
        </Badge>
      ))}
    </span>
  )
}
