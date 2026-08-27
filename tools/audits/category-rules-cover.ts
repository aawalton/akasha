import { categorySubject } from "../lib/category-partition.ts"
import type { Check } from "../lib/check.ts"
import { coverCheck } from "../lib/rules-subject.ts"

export const categoryRulesCover: Check = coverCheck(
  "category-rules-cover",
  categorySubject,
  "no category rules stand, so there is nothing that has to be covered"
)
