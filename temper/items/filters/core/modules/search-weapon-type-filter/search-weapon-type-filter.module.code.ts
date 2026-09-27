import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items/filters/core/modules/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type WeaponTypeRow = Pick<TemperWeaponType, "title" | "esoWeaponTypeNumber">

const WEAPON_TYPE_OPTIONS = numberedOptions(
  $pagesOfType<WeaponTypeRow>(temperWeaponType),
  (row) => row.esoWeaponTypeNumber
)

export const WEAPON_TYPE_FILTER = defineFilter<readonly string[]>({
  id: "weapon-type",
  label: "Weapon Type",
  group: "type",
  editor: { kind: "multiselect", options: WEAPON_TYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.weaponType === undefined) return false
    return selected.includes(String(facts.weaponType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("weapon-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
