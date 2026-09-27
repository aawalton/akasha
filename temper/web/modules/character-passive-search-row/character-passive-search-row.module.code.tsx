import { BadgeToggleGroup } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import { FilterButton } from "akasha/design/interface/pattern/modules/filter-button/filter-button.module.code.tsx"
import { SearchButton } from "akasha/design/interface/pattern/modules/search-button/search-button.module.code.tsx"
import { SearchSortFilterRow } from "akasha/design/interface/pattern/modules/search-sort-filter-row/search-sort-filter-row.module.code.tsx"
import {
  PASSIVE_CATEGORY_FILTER_ITEMS,
  type usePassiveFilter,
} from "akasha/temper/web/modules/use-passive-filter/use-passive-filter.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { characterEditorContentCategory } from "akasha/temper/web/phrase/pages/character-editor-content-category.temper-web-phrase.ts"
import { characterEditorContentSearchPassives } from "akasha/temper/web/phrase/pages/character-editor-content-search-passives.temper-web-phrase.ts"

export interface CharacterPassiveSearchRowProps {
  filter: ReturnType<typeof usePassiveFilter>
}

export function CharacterPassiveSearchRow({ filter }: CharacterPassiveSearchRowProps) {
  const phrase = usePhrase()
  const { passiveCategory } = filter
  return (
    <SearchSortFilterRow
      hasActiveFilters={filter.hasActivePassiveFilters}
      onReset={filter.handlePassiveReset}
    >
      <SearchButton
        value={filter.passiveSearch}
        onChange={filter.setPassiveSearch}
        placeholder={phrase(characterEditorContentSearchPassives.slug)}
      />
      <FilterButton hasActiveFilters={passiveCategory !== null} popoverClassName="max-w-panel">
        <div className="flex flex-col gap-2">
          <div className="font-medium text-sm">{phrase(characterEditorContentCategory.slug)}</div>
          <BadgeToggleGroup
            items={PASSIVE_CATEGORY_FILTER_ITEMS}
            value={passiveCategory != null ? [{ value: passiveCategory, label: "" }] : []}
            onSelect={filter.handlePassiveCategorySelect}
            unselectedVariant="elevation-muted"
            wrap
          />
        </div>
      </FilterButton>
    </SearchSortFilterRow>
  )
}
