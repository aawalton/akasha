import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

const SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT = 101

export const SURVEY_FILTER = defineFilter<FilterToggleValue>({
  id: "survey",
  label: "Survey",
  group: "type",
  editor: { kind: "toggle" },
  matches(facts, value) {
    if (facts.specializedItemType === undefined) return false
    const isSurvey = facts.specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT
    return value === "include" ? isSurvey : !isSurvey
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
