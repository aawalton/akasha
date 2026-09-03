import { akashaValuesAt } from "@akasha/pages-system/akasha-page-values"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import type { SeatTurnState } from "./seat-turn-state.ts"

/**
 * The color a seat's turn state is drawn in, read off that state's own akasha page.
 *
 * A state's page is named by the state, so `working` is `working.seat-turn-state.ts` and there is
 * no second table turning one name into the other. The four pages replace four `pages/domain`
 * markdown files ablated at `2e5588f7da`, which left every color here null and every seat and
 * work-tree row blank.
 *
 * The page is read off disk on every call rather than held, because the verb server answers this
 * from one long-lived process and a color rewritten under it is the color it must next answer.
 */

const PAGES_AT = "akasha/seat-system/seat-turn-states/pages"

const PAGE_SUFFIX = ".seat-turn-state.ts"

const COLOR_KEY = "color-slug"

export function pageOfState(state: SeatTurnState): string {
  return `${PAGES_AT}/${state}${PAGE_SUFFIX}`
}

export function colorStatedOn(akasha: string, state: SeatTurnState): string | null {
  let values: Readonly<Record<string, unknown>> | null
  try {
    values = akashaValuesAt(akasha, pageOfState(state))
  } catch {
    return null
  }
  if (values === null) return null
  const color = values[COLOR_KEY]
  return typeof color === "string" && color !== "" ? color : null
}

export function colorOfState(state: SeatTurnState, akasha?: string): string | null {
  return colorStatedOn(akasha ?? akashaRoot(), state)
}
