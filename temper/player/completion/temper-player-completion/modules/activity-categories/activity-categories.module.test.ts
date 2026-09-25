import { expect, test } from "bun:test"
import { badgeVariantSchema } from "akasha/page/core/schema/modules/color-rule-variant/color-rule-variant.module.code.ts"
import {
  ACTIVITY_CATEGORIES,
  type ActivityCategoryId,
} from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { TemperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.types.ts"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

const EVERY_ID: Record<ActivityCategoryId, true> = {
  "arenas": true,
  "characters": true,
  "companions": true,
  "crafting": true,
  "events": true,
  "exploration": true,
  "group-dungeons": true,
  "housing": true,
  "other": true,
  "pvp": true,
  "quests": true,
  "trials": true,
}

test("the id type names every activity-category page's key and no other", () => {
  const pages = import.meta.glob<Readonly<Record<string, TemperActivityCategory>>>(
    "../../../../progress/temper-activity-category/**/*.temper-activity-category.ts",
    { eager: true }
  )
  const keys = Object.values(pages).flatMap((paged) => Object.values(paged).map((page) => page.key))
  expect(Object.keys(EVERY_ID).sort()).toEqual(keys.sort())
})

test("the categories are in the order of their slugs", () => {
  expect(ACTIVITY_CATEGORIES.ids).toEqual([...ACTIVITY_CATEGORIES.ids].sort())
})

test("every category's badge is one a badge draws", () => {
  const drawn = ACTIVITY_CATEGORIES.list.filter(
    (category) => badgeVariantSchema.safeParse(category.badgeVariant).success
  )
  expect(drawn.length).toBe(ACTIVITY_CATEGORIES.list.length)
})
