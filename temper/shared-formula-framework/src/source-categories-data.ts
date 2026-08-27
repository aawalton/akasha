import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SOURCE_CATEGORY_DATA } from "./generated/temper-source-category.generated"

interface SourceCategoryTemplate {
  id: string
  name: string
  displayOrder: number
}

export const sourceCategories = createDataFile<SourceCategoryTemplate>()(
  TEMPER_SOURCE_CATEGORY_DATA
)

export type SourceCategoryId = (typeof sourceCategories.ids)[number]
