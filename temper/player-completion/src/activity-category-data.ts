import type { BadgeVariant } from "@shared/utils-narrow/badge-variant"
import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_ACTIVITY_CATEGORIES } from "./generated/temper-activity-category.generated"

export interface ActivityCategoryTemplate {
  id: string
  name: string
  badgeVariant: NonNullable<BadgeVariant>
}

export const activityCategories = createDataFile<ActivityCategoryTemplate>()(
  TEMPER_ACTIVITY_CATEGORIES
)

export type ActivityCategoryId = (typeof activityCategories.ids)[number]
