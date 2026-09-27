import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import { temperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.ts"
import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"
import {
  defineFilter,
  type FilterEditorOption,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items/filters/core/modules/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

type QualityRow = Pick<TemperQuality, "available" | "esoDisplayQuality" | "gameName">

function qualityOptionsOf(this: void, rows: readonly QualityRow[]): readonly FilterEditorOption[] {
  const offered: { readonly quality: number; readonly name: string }[] = []
  for (const row of rows) {
    if (row.available && row.gameName !== undefined) {
      offered.push({ quality: row.esoDisplayQuality, name: row.gameName })
    }
  }
  offered.sort((one, other) => one.quality - other.quality)
  return offered.map((one) => ({ value: String(one.quality), label: one.name }))
}

const QUALITY_OPTIONS = qualityOptionsOf($pagesOfType<QualityRow>(temperQuality))

export const QUALITY_FILTER = defineFilter<readonly string[]>({
  id: "quality",
  label: "Quality",
  group: "quality",
  editor: { kind: "multiselect", options: QUALITY_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.quality === undefined) return false
    return selected.includes(String(facts.quality))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("quality", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
