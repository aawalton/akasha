"use client"

import {
  type PotionId,
  type PotionSource,
  potionAt,
  potions,
} from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import { convertIconPathToUrl } from "akasha/temper/player/character/characters-equipment/modules/get-equipment-icon/get-equipment-icon.module.code.ts"
import { EquipmentIcon } from "akasha/temper/web/characters-equipment-ui/modules/equipment-icon/equipment-icon.module.code.tsx"
import {
  FilterableSelectDialog,
  type FilterableSelectDialogConfig,
} from "akasha/temper/web/modules/filterable-select-dialog/filterable-select-dialog.module.code.tsx"
import {
  phraseIn,
  useWebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { potionSelectDialogCrafted } from "akasha/temper/web/phrase/pages/potion-select-dialog-crafted.temper-web-phrase.ts"
import { potionSelectDialogCrown } from "akasha/temper/web/phrase/pages/potion-select-dialog-crown.temper-web-phrase.ts"
import { potionSelectDialogDropped } from "akasha/temper/web/phrase/pages/potion-select-dialog-dropped.temper-web-phrase.ts"
import { potionSelectDialogEmpty } from "akasha/temper/web/phrase/pages/potion-select-dialog-empty.temper-web-phrase.ts"
import { potionSelectDialogSearch } from "akasha/temper/web/phrase/pages/potion-select-dialog-search.temper-web-phrase.ts"
import { potionSelectDialogTitle } from "akasha/temper/web/phrase/pages/potion-select-dialog-title.temper-web-phrase.ts"
import { useMemo } from "react"

interface PotionSelectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPotionId: PotionId
  onSelect: (potionId: PotionId) => void
}

export function PotionSelectDialog({
  open,
  onOpenChange,
  selectedPotionId,
  onSelect,
}: PotionSelectDialogProps) {
  const held = potions()
  const noPotion = potionAt("no-potion")
  const phrases = useWebPhrases()
  const config: FilterableSelectDialogConfig<PotionSource> = useMemo(() => {
    const byName = held.list.toSorted((a, b) => a.name.localeCompare(b.name))
    const crown = byName.filter((one) => one.subcategoryId === "crown")
    const dropped = byName.filter((one) => one.subcategoryId === "dropped")
    const crafted = byName.filter((one) => one.subcategoryId === "crafted")
    return {
      title: phraseIn(phrases, potionSelectDialogTitle.slug),
      searchPlaceholder: phraseIn(phrases, potionSelectDialogSearch.slug),
      emptyMessage: phraseIn(phrases, potionSelectDialogEmpty.slug),
      categories: [
        {
          id: "crown" as const,
          label: phraseIn(phrases, potionSelectDialogCrown.slug),
          items: crown,
        },
        {
          id: "dropped" as const,
          label: phraseIn(phrases, potionSelectDialogDropped.slug),
          items: dropped,
        },
        {
          id: "crafted" as const,
          label: phraseIn(phrases, potionSelectDialogCrafted.slug),
          items: crafted,
        },
      ],
      allItems: [noPotion, ...crown, ...dropped, ...crafted],
      defaultItem: noPotion,
      filterItem: (item, searchTerm) => {
        const lower = searchTerm.toLowerCase()
        return (
          item.name.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower)
        )
      },
      renderIcon: (item) => {
        const iconUrl = convertIconPathToUrl(item.icon)
        return iconUrl != null ? (
          <EquipmentIcon primarySrc={iconUrl} alt={item.name} size={40} />
        ) : null
      },
    }
  }, [held, noPotion, phrases])

  const handleSelect = (itemId: PotionId) => {
    onSelect(itemId)
  }

  return (
    <FilterableSelectDialog<PotionSource>
      open={open}
      onOpenChange={onOpenChange}
      selectedItemId={selectedPotionId}
      onSelect={handleSelect}
      defaultItem={noPotion}
      config={config}
    />
  )
}
