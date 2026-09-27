import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.ts"
import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items/filters/core/modules/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type EquipTypeRow = Pick<TemperEquipType, "title" | "equipType">

const EQUIP_SLOT_OPTIONS = numberedOptions(
  $pagesOfType<EquipTypeRow>(temperEquipType),
  (row) => row.equipType
)

export const EQUIP_SLOT_FILTER = defineFilter<readonly string[]>({
  id: "equip-slot",
  label: "Equip Slot",
  group: "type",
  editor: { kind: "multiselect", options: EQUIP_SLOT_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.equipType === undefined) return false
    return selected.includes(String(facts.equipType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("equip-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
