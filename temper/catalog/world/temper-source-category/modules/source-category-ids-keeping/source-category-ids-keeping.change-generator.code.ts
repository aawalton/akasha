import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { temperSourceCategory } from "akasha/temper/catalog/world/temper-source-category/temper-source-category.page-type.ts"
import {
  type Keeping,
  keepingTurns,
  slugUnionsKept,
  type Written,
} from "akasha/temper/modules/slug-union-keeping/slug-union-keeping.module.code.ts"

const KEEPING: Keeping = {
  at: "temper/catalog/world/temper-source-category/modules/source-category-ids/source-category-ids.data-table.code.ts",
  pageTypeSlug: temperSourceCategory.slug,
  from: "source category pages",
  unions: [{ name: "SourceCategoryId", holds: () => true }],
}

export function couldTurn(change: Change): boolean {
  return keepingTurns(KEEPING, change)
}

export function generateChange(change: Change): Written {
  return slugUnionsKept(KEEPING, change)
}
