import { accountFiltersActivity } from "akasha/temper/web/phrase/pages/account-filters-activity.temper-web-phrase.ts"
import { accountFiltersStatus } from "akasha/temper/web/phrase/pages/account-filters-status.temper-web-phrase.ts"

export type FilterId = "status" | "activity"

const FILTER_IDS: ReadonlySet<string> = new Set<FilterId>(["status", "activity"])

export function isFilterId(id: string): id is FilterId {
  return FILTER_IDS.has(id)
}

interface AccountFilterDef {
  id: FilterId
  labelPhrase: string
}

export const ACCOUNT_FILTERS: AccountFilterDef[] = [
  { id: "status", labelPhrase: accountFiltersStatus.slug },
  { id: "activity", labelPhrase: accountFiltersActivity.slug },
]
