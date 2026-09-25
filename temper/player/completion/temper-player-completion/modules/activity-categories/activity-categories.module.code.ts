import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { BadgeVariant } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import type { TemperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.types.ts"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

export type ActivityCategoryId =
  | "arenas"
  | "characters"
  | "companions"
  | "crafting"
  | "events"
  | "exploration"
  | "group-dungeons"
  | "housing"
  | "other"
  | "pvp"
  | "quests"
  | "trials"

export interface ActivityCategoryTemplate {
  id: string
  name: string
  badgeVariant: NonNullable<BadgeVariant>
}

type ActivityCategory = ActivityCategoryTemplate & { id: ActivityCategoryId }

type Paged = Readonly<Record<string, TemperActivityCategory>>

const FOUND = import.meta.glob<Paged>(
  "../../../../progress/temper-activity-category/**/*.temper-activity-category.ts",
  { eager: true }
)

function bySlug(one: TemperActivityCategory, two: TemperActivityCategory): number {
  if (one.slug === two.slug) return 0
  return one.slug < two.slug ? -1 : 1
}

function categoryOf(page: TemperActivityCategory): ActivityCategory {
  return {
    id: page.key as ActivityCategoryId,
    name: page.title ?? page.key,
    badgeVariant: page.badgeVariant as NonNullable<BadgeVariant>,
  }
}

const PAGES = Object.values(FOUND)
  .flatMap((paged) => Object.values(paged))
  .sort(bySlug)

export const ACTIVITY_CATEGORIES = createDataFile<ActivityCategoryTemplate>()(
  Object.fromEntries(PAGES.map((page) => [page.key, categoryOf(page)])) as Record<
    ActivityCategoryId,
    ActivityCategory
  >
)
