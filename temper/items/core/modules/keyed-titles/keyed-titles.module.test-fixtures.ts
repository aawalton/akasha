import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdKeyedTitles,
  KEYED_TITLE_FIELDS,
  type KeyedTitles,
  keyedTitlesFrom,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"

export function holdKeyedTitlesFromCheckout(pageTypeSlug: string): KeyedTitles {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys: KEYED_TITLE_FIELDS } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return holdKeyedTitles(keyedTitlesFrom(pageTypeSlug, asked.rows as readonly Value[]))
}
