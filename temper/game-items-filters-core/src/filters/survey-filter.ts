import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

const SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT = 101

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const surveyFilter = defineFilter<FilterToggleValue>({
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
