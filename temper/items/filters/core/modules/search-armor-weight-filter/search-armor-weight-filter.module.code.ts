import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items/filters/core/modules/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type ArmorWeightRow = Pick<TemperArmorWeight, "title" | "armorType">

const ARMOR_WEIGHT_OPTIONS = numberedOptions(
  $pagesOfType<ArmorWeightRow>(temperArmorWeight),
  (row) => row.armorType
)

export const ARMOR_WEIGHT_FILTER = defineFilter<readonly string[]>({
  id: "armor-weight",
  label: "Armor Weight",
  group: "type",
  editor: { kind: "multiselect", options: ARMOR_WEIGHT_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.armorType === undefined) return false
    return selected.includes(String(facts.armorType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("armor-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
